---
layout: post
title: Extending Python’s Syntax for Fun and Profit (and SymPy)
tags: SymPy
---

In [my previous post]({% post_url 2013-09-15-implicit-parsing-in-sympy %}),
I discussed some ways SymPy makes math input easier on the user. Now I’ll
look various mechanisms Python offers to extend and redefine its syntax
for this purpose.

## AST Transformations

SymPy’s syntax for a matrix is pretty straightforward:

{% highlight python %}
>>> Matrix([[1,2], [3,4]]) + Matrix([[5,6],[7,8]])
Matrix([
[6, 8],
[10, 12]])
{% endhighlight %}

But it’s cumbersome to type, especially if you have to enter in a lot of
matrices—typing in `Matrix(…)` over and over eventually gets tiresome. And
if we’re building a calculator, perhaps, or
[some other tool](http://www.sympygamma.com) where the user may not know
SymPy well, or at all, then a simplified syntax may be useful. For instance,
what if the user could just enter the list and have Python/our parser
interpret it as a matrix?

{% highlight python %}
>>> [[1,2], [3,4]] + [[5,6], [7,8]]
Matrix([
[6, 8],
[10, 12]])
{% endhighlight %}

We can achieve this with an AST
([abstract syntax tree](http://en.wikipedia.org/wiki/Abstract_syntax_tree))
transformation.

>*What’s an AST?* When Python parses your code, it converts it into an
>internal representation that captures the structure of your code—a
>tree. For instance, `2*2` might be represented as `BinOp('*', Integer(2),
>Integer(2))`. ASTs are one level of abstraction up from tokens—the
>tokenizer generates a token stream or parse tree; the parser generates an
>abstract syntax tree.

Why not mess around with tokenization? Well, we’re not adding any new
syntax, just redefining existing syntax—no need for a hammer when all we
need is a flyswatter. The transformation lets us “change the code” after
it’s been parsed

## Tokenization
