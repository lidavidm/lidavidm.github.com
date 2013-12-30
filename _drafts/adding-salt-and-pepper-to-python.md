---
title: Adding Salt to Python (Or, Python under Native Client)
layout: post
tags: [Python, Native Client, SymPy, Live]
---

Here’s the dream: open a browser tab, load a webpage, type in Python, have
it executed. Load it up with SymPy so students can use it as a computer
algebra system. Perhaps dress it up with LaTeX rendering, for that matter.

[Here’s reality](http://live.sympy.org), and at first it’s pretty close to
ideal: SymPy is imported automatically, it formats its output with MathJax,
and so on. But – well, try using the `random` module.

    >>> import random
    >>> value = random.random()
    >>> print value
    0.14691639629

So far so good. Let's turn that value into an integer:

    >>> print int(100*value)
    85

Wait…

    >>> print int(100*value)
    99
    >>> print int(100*value)
    76

What’s going on?

SymPy Live is implemented on Google App Engine. One of the limitations is
that we can’t have a persistent server – Google can start and stop servers
at any time, and can use whatever server it wants, even different servers
between requests[^2]. To get around this, Live executes each statement,
sends back the result, then pickles the interpreter state and saves it in
the database. So far, so good. But there are objects that can’t be pickled –
for instance, the module object, functions, and so on. Of course, there are
workarounds (for instance,
[pickling a function](http://stackoverflow.com/questions/1253528)), but to
be able to handle anything that comes our way, we’ve implemented a
workaround: the code that created an unpicklable object is stored, and each
time, before executing the statement, we unpickle everything we can, then
reevaluate these previous statements. Obviously this is quite inefficient –
and can lead to some strange behaviors.

*Okay, so get a different host. Give each user an interpreter.* But that
increases the costs. It lowers the number of users we can serve, because
each user needs their own Python process[^1]. And we still have to deal with
the fact that a user can’t run code that would take too long, because
otherwise they’d lock up other people’s requests. And what if a user closes
their tab? How long do we wait before killing their process? How do we
preserve their session? Services like [Wakiri](http://www.wakiri.io) provide
this – but they’re a business, and we’re a project.

One solution comes from Google itself: Native Client. This allows native
code (C, C++) to be compiled into a portable intermediate language[^3],
which Google Chrome will then compile and execute on the end-user’s machine.


[^1]: We could do something like make a module for each user, and just
      evaluate statements in that module. But then we’d still only be able
      to process a limited number of simultaneous requests.

[^2]: App Engine does have
      [backends](https://developers.google.com/appengine/docs/python/backends/),
      but these cost extra and don’t have guaranteed uptime.

[^3]: At least, for Portable Native Client (PNaCl). Normal Native Client
      requires separate builds for each architecture targeted.
