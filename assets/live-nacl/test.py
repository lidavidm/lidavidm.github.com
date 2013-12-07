import sys
import ast
import new
import traceback
from cStringIO import StringIO
import tokenize
import contextlib
from sympy import latex
from sympy.interactive.session import int_to_Integer

@contextlib.contextmanager
def latex_output():
    def displayhook(x):
        if x is not None:
            print latex(x, mode="equation*")
    old_displayhook = sys.displayhook
    sys.displayhook = displayhook
    yield
    sys.displayhook = old_displayhook

@contextlib.contextmanager
def redirect(stream):
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    sys.stdout = stream
    sys.stderr = stream
    yield
    sys.stdout = old_stdout
    sys.stderr = old_stderr

def split(source):
    """Extract last logical line from multi-line source code. """
    string = StringIO(source).readline

    try:
        tokens = list(tokenize.generate_tokens(string))
    except (OverflowError, SyntaxError, ValueError, tokenize.TokenError):
        return None, source

    for tok, _, (n, _), _, _ in reversed(tokens):
        if tok == tokenize.NEWLINE:
            lines = source.split('\n')

            exec_source = '\n'.join(lines[:n])
            eval_source = '\n'.join(lines[n:])

            return exec_source, eval_source
    else:
        return None, source

def get_input(terminator="END_MESSAGE"):
    buf = []
    while True:
        line = raw_input()
        if line.strip() == terminator:
            break
        buf.append(line)
    return ''.join(buf)

PREEXEC = """\
from __future__ import division
from sympy import *
x, y, z, t = symbols('x y z t')
k, m, n = symbols('k m n', integer=True)
f, g, h = symbols('f g h', cls=Function)
"""

statement_module = new.module('__main__')
exec PREEXEC in statement_module.__dict__

print("READY")
while True:
    source = get_input()
    stream = StringIO()
    try:
        try:
            # check for a SyntaxError now; this way the user will see their
            # original statement and not the transformed one
            ast.parse(source)
        except SyntaxError:
            stream.write(traceback.format_exc())
            raise

        # convert int to Integer (1/2 -> Integer(1)/Integer(2))
        source = int_to_Integer(source)

        # split source code into 'exec' and 'eval' parts
        exec_source, eval_source = split(source)

        try:
            compile(eval_source, '<input>', 'eval')
        except (OverflowError, SyntaxError, ValueError):
            exec_source, eval_source = source, None

        if exec_source is not None:
            exec_source += '\n'
        if eval_source is not None:
            eval_source += '\n'

        with redirect(stream), latex_output():
            try:
                if exec_source is not None:
                    try:
                        exec_code = compile(exec_source, '<input>', 'exec')
                        eval(exec_code, statement_module.__dict__)
                    except (OverflowError, SyntaxError, ValueError):
                        stream.write(traceback.format_exc())

                if eval_source is not None:
                    result = eval(eval_source, statement_module.__dict__)
                    sys.displayhook(result)
                    statement_module._ = result
            except:
                stream.write(traceback.format_exc())
    finally:
        print('OUTPUT' + stream.getvalue())
        print('ENDOUTPUT')
