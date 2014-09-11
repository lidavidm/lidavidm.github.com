---
title: Refreshed Design
tags: design
---

I’ve updated the design of this blog, switching from
[Jekyll](http://jekyllrb.com/) to [Hakyll](http://jaspervdj.be/hakyll/) in
the process.

I also took the chance to use a free domain from Namecheap,
[http://lidavidm.me](http://lidavidm.me), and restructure this blog to be
hosted under `/blog` instead of at the root of the site.

## The New Design

This design is inspired by Google’s new
[Material Design](http://www.google.com/design/spec/material-design/introduction.html),
and in particular the
[Paper Elements](http://www.polymer-project.org/components/paper-elements/demo.html#core-toolbar)
demo. However, it’s not as elaborate as Google’s demos, nor is it
animated—I’ve simply taken the superficial look.

Personally I find that Material Design has too much whitespace—Google’s
designers know better than I do, but the neon colors and excessive padding
in the design guidelines bothered me in general. I have also opted for the
[Crimson](http://aldusleaf.org/0-crimson.html) and
[Open Sans](http://www.google.com/fonts/specimen/Open+Sans) fonts over
Google’s [Roboto](http://www.google.com/design/spec/style/typography.html).

Admittedly, the
[animations in Material Design are gorgeous](http://www.google.com/design/spec/animation/meaningful-transitions.html)—the
ink ripple effect is a nice touch, and the way the pages smoothly morph into
each other makes the UI feel responsive. I have not replicated them because
they’re overkill for this simple blog, but using
[Polymer](http://www.polymer-project.org/) to develop a web app with these
styles is definitely something I will be trying.

I find the use of shadows, paper, and other skeuomorphic effects in Material
Design interesting as well—the current trend has been towards completely
flat interfaces, which started with Microsoft’s Zune and continued with
Windows Phone 7, Metro, Google’s Holo, and Apple’s iOS 6. Material reverses
the trend away from skeuomorphism while still retaining the “flat” design
that is so popular.

My redesign here is still ongoing—I’d like to differentiate myself from
Material Design further and create my own look (though this design will
clearly be inspired by Material).

## About Hakyll

Github Pages has Jekyll built in, making it quite convenient to
use. However, depending on Github to run Jekyll on my repository was
frustrating; it took a while for the site to be rebuilt, and I had to wait
until then for error messages. There also isn’t a way to disable processing
for certain pages—everything gets run through Jekyll, whether I like it or
not. Running Jekyll locally would have solved these issues, of
course. Instead of Jekyll I decided to use Hakyll, a Haskell site generator.

Hakyll specifies configuration in Haskell code; instead of running “the”
Hakyll processor, your configuration is compiled into a site generator,
which you then run to output the actual site.

## Final Notes

I’ve been quite busy these past couple months and haven’t had a chance to
really work on SymPy or write posts. I promise more is coming soon, about a
TypeScript/Canvas project that I’ve been working on for a few months
now.
