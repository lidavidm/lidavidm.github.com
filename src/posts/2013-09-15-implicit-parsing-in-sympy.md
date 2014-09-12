---
title: Parsing & Implicit Parsing in SymPy
tags: SymPy Python parsing
---

*This is a work-in-progress and will be periodically revised to reflect
 changes in SymPy. Last updated: 2014-6-21*

One of the annoyances of entering mathematics on the computer is the
rigidity of the format the computer generally expects. In SymPy, `sympify()`
won’t accept any of the following, though a human would:

- `2x`
- `5 sin x`
- `6(9)`
- `sin x^3 + y`
- `ln sin x`
- `sin^2 x`
- `xyz`

SymPy’s implicit parsing aims to fix this. Implicit multiplication takes
care of statements like `2x`, symbol splitting allows for `xyz`, implicit
application enables `sin x`, and function exponentiation allows `sin^2 x`.

<!--more-->

But first, we have a problem: some of these statements are ambiguous. For
instance, should `sin x^3 + y` be interpreted as `sin(x^3) + y`, `sin(x^3 +
y)`, or `sin(x)^3 + y`? The last one, to a human, wouldn't make much sense,
but the other two are perfectly valid. For SymPy, we’ve arbitrarily chosen
the first interpretation.

That’s not all. Let’s look at the last case more: `xyz`. To a human, this
represents `x*y*z`, so naturally to handle this SymPy should simply split
the name into three. But we can’t split every token; consider these:

- `x_2`
- `alpha`

Splitting these names would not match user expectations at all.

So taking these considerations into account, how should we implement
implicit parsing? We have a few options:

- Transform the input string (regular expression).
  [This is what Sage does](https://github.com/sagemath/sage/blob/master/src/sage/misc/preparser.py).
- Transform the token stream.
  [This is what SymPy does](https://github.com/sympy/sympy/blob/master/sympy/parsing/sympy_parser.py).
- Use a custom parser.

(AST transforms aren’t an option because this syntax isn’t valid Python
syntax.)

Let’s look at the SymPy parser. If you just want to read about implicit
parsing, jump to the section about [token transformations](#transformations).

## The SymPy Parser

*Note: all data here is based on SymPy 0.7.3*

Overall, SymPy follows these steps. You can follow along in
[`sympy_parser.py`](https://github.com/sympy/sympy/blob/master/sympy/parsing/sympy_parser.py):

1. Tokenize the input (which is not necessarily valid Python) using a
   modified Python 2 tokenizer.
2. Run the tokens through a series of transformations.
3. Untokenize the tokens, generating valid Python code.
4. Evaluate the string.

Yes, we use `eval()`. It’s not safe. (SymPy Live and SymPy Gamma deal with
this by ignoring the problem: they run on Google App Engine, which is
sandboxed.)

### The SymPy Tokenizer

The tokenizer handles some syntax not in vanilla Python. In particular, we’d
like to be able to parse expressions like these:

- `x!` ($x$ factorial)
- `x!!` ($x$ double factorial)
- `0.[123]` ($0.\overline{123}$)

Note that the last example is valid Python—it’s equivalent to
`(0.)[123]`. But to make it easier to recognize and transform, we modified
the tokenizer to handle it as a special case:

```python
# Standard library
>>> tokenize.tokenize(StringIO('0.[123]').readline)
1,0-1,2:	NUMBER	'0.'
1,2-1,3:	OP	'['
1,3-1,6:	NUMBER	'123'
1,6-1,7:	OP	']'
2,0-2,0:	ENDMARKER	''

# SymPy
>>> sympy.parsing.sympy_tokenize.tokenize(StringIO('0.[123]').readline)
1,0-1,7:	NUMBER	'0.[123]'
2,0-2,0:	ENDMARKER	''
```

`!` and `!!` are simply operators now:

```python
>>> sympy.parsing.sympy_tokenize.tokenize(StringIO('x!!').readline)
1,0-1,1:	NAME	'x'
1,1-1,3:	OP	'!!'
2,0-2,0:	ENDMARKER	''
>>> sympy.parsing.sympy_tokenize.tokenize(StringIO('x!').readline)
1,0-1,1:	NAME	'x'
1,1-1,2:	OP	'!'
2,0-2,0:	ENDMARKER	''
```

Unfortunately, since this is based on an older tokenizer, it doesn’t support
Python 3 features, such as bytestrings, and it’ll
[incorrectly parse longs in Python 3](https://code.google.com/p/sympy/issues/detail?id=3986),
not to mention it
[doesn’t support Unicode](https://code.google.com/p/sympy/issues/detail?id=1763).

### Transformations

Say you’re making a SymPy calculator/grapher/what-have-you. The user inputs
this expression:

```python
sin(x) + 3
```

and your app spits out this error message:

```python
NameError: name 'x' is not defined
```

Not a very good calculator. SymPy handles this by transforming the token
stream; in this case, undefined variables are wrapped in `Symbol()` calls to
turn them into SymPy symbols. By default, parsing uses these
transformations:

1. Undefined variables become `Symbol`s.
2. Complex numbers become SymPy complex numbers (`3 + 4j` becomes `3 + 4*I`)
3. Repeating decimals become `Rational`s (`0.[123]` becomes `Rational(123,
   999)`).
4. Floating-point constants become `Float`s.
5. Integer constants become `Integer`s.
5. Factorial notation becomes calls to `factorial` or `factorial2` as
   appropriate.

SymPy also provides other useful transformations:

- XOR, `^`, becomes exponentiation.
- Floats become rational numbers.
- Implicit parsing.

Note that *SymPy’s transformations always produce valid Python code*, since
we’re not modifying the parser.

The API for this is a bit hidden. Here’s an example:

```python
>>> from sympy.parsing.sympy_parser import parse_expr
>>> parse_expr("1/2")
1/2
>>> type(_)
<class 'sympy.core.numbers.Half'>
>>> from sympy.parsing.sympy_parser import standard_transformations,\
... implicit_multiplication_application, convert_xor
>>> transformations = (standard_transformations +
...     (implicit_multiplication_application,))
>>> parse_expr("2x", transformations=transformations)
2*x
>>> transformations = (standard_transformations + (convert_xor,))
>>> parse_expr("x^3", transformations=transformations)
x**3
```

How do the implicit parsing transformations work? They’re split into four
transformations: symbol splitting, multiplication, application, and
exponentiation, which must be run in that order, though not all need to be
run.

Symbol splitting is quite simple: for each name in the token stream, the
transformation checks if it 1) is part of a `Symbol`, so that it doesn’t
split function names 2) is not a Greek letter, and 3) does not contain an
underscore. If so, it makes one `Symbol` for each letter in the original
name.

Implicit multiplication scans the tokens two at a time, looking for one of
these conditions:

- Closing parenthesis followed by opening parenthesis (`(x + 2)(x + 3)`)
- Closing parenthesis followed by variable name (`(x + 2) sin(x)`)
- Variable name followed by opening parenthesis (`pi (x + 3)`)
- Variable name followed by variable name (`pi E EulerGamma`)

Application (and multiplication, though it’s not necessary) depends on an
intermediate step that groups function calls into one token—`sin(x)`, while
represented with seven tokens normally
(`['sin', '(', 'Symbol', '(', "'x'", ')', ')']`), is first grouped into one
“token” (called `AppliedFunction` in the source). Then it follows these
steps:

1. Keep track of how many parentheses we have to insert and how many tokens
   to skip.
1. For each token,
    1. If it’s a function name not followed by an opening parenthesis, increment
       the counter and insert an opening parenthesis.
    1. Else, if the parenthesis counter is nonzero,
        1. If the next token is a multiplication or exponentiation, increment
           the skip counter.
        1. Else, if the skip counter is nonzero, decrement it.
        1. Else, insert a closing parenthesis after this token and decrement
           the counter.

This way, `sin x^2` gets parsed as `sin(x^2)`, not `sin(x)^2`. There’s some
more logic to make life easier for the function exponentiation
transformation as well.

To implement function exponentiation, think about how the token stream would
look at this point. All functions are applied, so for `sin**2 x`, we would
have something like this:

```python
['sin', '**', 'Integer', '(', '2', ')', '(', 'Symbol', '(', "'x'", ')', ')']
```

If you have implicit multiplication enabled, it’ll actually look like this
(note the extraneous multiplication):

```python
['sin', '**', 'Integer', '(', '2', ')', '*', '(', 'Symbol', '(', "'x'", ')', ')']
```

The transformation has to figure out what constitutes the exponent and what
constitutes the function call. The rule SymPy uses is, essentially, the
exponent is everything from and including the exponentiation operator to the
first closing parenthesis it sees (this rules out anything but simple
integer and symbolic exponents; `sin**(x+3)(x+5)` won’t be parsed
correctly). It then parses the following tokens, discarding the extraneous
multiplication if it exists, to find the closing parenthesis of the function
call (this correctly handles nested parentheses), and moves the tokens for
the exponent to the end. So what the parser ends up seeing is

```python
['sin', '(', 'Symbol', '(', "'x'", ')', ')', '**', 'Integer', '(', '2', ')']
```

which is equivalent to `sin(Symbol(x))**2`.

### Evaluation

One final note: SymPy uses a an evaluation trick for the final result. SymPy
defines `Symbol.__call__` so that this works:

```python
>>> spam = sympify('f(x)')
f(x)
>>> x = Symbol('x')
>>> eggs = Function('f')(x)
f(x)
>>> spam == eggs
True
```

However, it’s a
[point of contention](https://code.google.com/p/sympy/issues/detail?id=440)
whether this should be done at all.

So there you have it. SymPy’s parser.
