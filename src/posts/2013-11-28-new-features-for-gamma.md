---
title: New Features for Gamma
layout: post
tags: SymPy Gamma
---

[SymPy Gamma](http://www.sympygamma.com) is essentially SymPy’s clone of
Wolfram|Alpha, at least in terms of math features. We just rolled out some
new features:

- Improved plotting, still based on [D3.js](http://www.d3js.org)

  - Multiple graphs on one plot:

      [![Multiple plots in Gamma](/assets/gamma-multiple-plots.svg)](http://www.sympygamma.com/input/?i=plot%28[x%2C+x^2%2C+x^3%2C+x^4]%29)

  - Polar and parametric equations:

      [![Polar and parametric plots in Gamma](/assets/gamma-multiple-plots-2.svg)](http://www.sympygamma.com/input/?i=plot%28x%3D7cos%28t%29%2C+y%3D10sin%28t%29%2Cr%3Dtheta%29)

- Diophantine equation solving:
  [`diophantine(3*x**2 + 4*y**2 - 5*z**2 + 4*x*y - 7*y*z + 7*z*x)`](http://www.sympygamma.com/input/?i=diophantine%283*x**2%20%2B%204*y**2%20-%205*z**2%20%2B%204*x*y%20-%207*y*z%20%2B%207*z*x%29)

    ![Gamma's Diophantine equation solution](/assets/gamma-diophantine.png)
- Recurrence relation solving:
  [`rsolve(y(n+2)-y(n+1)-y(n), y(n), {y(0): 0, y(1): 1})`](http://www.sympygamma.com/input/?i=rsolve%28y%28n%2B2%29-y%28n%2B1%29-y%28n%29%2C%20y%28n%29%2C%20{y%280%29%3A%200%2C%20y%281%29%3A%201}%29)

    ![Gamma's recurrence relation solution](/assets/gamma-recurrence.png)
- Boolean logic results:
- An updated version of SymPy, and various other improvements

Gamma's (and by extension, SymPy's) parsing still needs work, though, when
it comes to the implicit style. Consider, for instance, the input `y(x)`. Is
this

1. The function $\mathrm{y}(x)$, or
2. The product $yx$?

This makes inputs ambiguous, at least to the parser. For instance, it makes
sense that `expand(a(x + 1) + b(x + 2))` should be $ax + bx + a + b$ and not
$\mathrm{a}(x+1) + \mathrm{b}(x+2)$. Meanwhile, `rsolve(y(n+2) - y(n+1) -
y(n), y(n))` wouldn't make any sense as $\mathrm{rsolve}(ny + 2y - ny - y -
ny, ny)$.

How do we solve this problem? I see three, non-mutually-exclusive ways:

1. Provide an "interpret as" functionality, like Wolfram|Alpha. For
   functions, you can also explicitly specify a function symbol with
   `Function("f")(x)`, though this is rather tedious to type.
2. Give the parser a whitelist/blacklist of functions to use implicit
   function or implicit multiplication syntax.
3. Try it both ways and take the one that doesn't raise an exception.

So in the future, I'd like to improve SymPy's parser more -- and hopefully,
someday add natural language parsing to Gamma. Dealing with these
ambiguities is a first step towards that.
