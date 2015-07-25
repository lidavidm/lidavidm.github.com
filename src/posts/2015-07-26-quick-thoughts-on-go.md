---
title: Quick Thoughts on Go
tags: golang languages
---

So over the summer I've been interning at RetailMeNot in Austin, TX, working
on a (hopefully) soon-to-be open-sourced project written primarily in Go,
Google’s pet language. In sum, I find Go to be a *pragmatic* language: one
designed for getting things done quickly, but not a radical language that
pushes the envelope of language design.

<!--more-->

Quick things: Go is a statically typed language with a pared-down, C-like
syntax. It depends on a runtime and is garbage collected, and though it
syntactically has features reminiscent of object-oriented languages, it
lacks inheritance, and polymorphism is done purely through interfaces. The
standard hello world:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, world!")
}
```

Instead of objects, we have `struct`s, and can define functions that take
one as a special parameter.

```go
type Vec2 struct {
	x int
	y int
}

func (v Vec2) Add(other Vec2) Vec2 {
	return Vec2{
		x: v.x + other.x,
		y: v.y + other.y,
	}
}
```

Instead of polymorphism and inheritance, we can define
`interface`s. Interfaces in Go are *structurally typed*: if a `struct` has all
the necessary methods, it automatically satisfies the interface.

```go
type Vector interface {
	Mag2() float
}

func (v Vec2) Mag2() float {
	return v.x*v.x + v.y*v.y
}
// Vec2 now implements Vector
```

Types are declared differently from C, with the type following the
variable. The language does technically have semicolons, but the compiler
inserts them for you. There aren't private/public declarations like in C++
and Java—instead, a name is exported if and only if it begins with a capital
letter. There are no variant types/ADTs and no enumerations.

The community and tooling matter as much as the language design, and Go has
a strict set of style guidelines enforced by a tool called `gofmt`. So you
won’t be debating tabs or spaces (tabs) and you won’t wonder how to indent a
block (`gofmt` does that for you). This makes learning the language simpler,
as (along with `golint` and `govet`) `gofmt` helps enforce idioms and style.

## What I Like

__Easy Concurrency:__ Goroutines make it easy to run something in the
background and communicate with that task. Channels make it easy to
synchronize, communicate, and share data without having shared mutable
state. The built-in race checker tells you when you’re doing something
dangerous. How it works:

- `go func()` runs `func` on a goroutine. It won’t block your code.
- `chan T` is a channel of type `T`. `make(chan T)` will create such a
  channel. If `c` is a channel of type `T`, then `c <- t` will put the value
  `t` onto the channel (blocking[^2] if there is no space on the channel)
  and `v := <- c` will try to read a value from the channel and put it in
  `v` (blocking if there is no value). The blocking helps you synchronize
  different goroutines. There’s no need for locks or other synchronization
  primitives to use these, though they are available in package `sync`.

Goroutines don’t necessarily correspond to threads; as the name implies,
they’re more akin to goroutines. In Go 1.4 and below, by default all
goroutines share one thread.

__Consistency:__ `gofmt`, `golint`, and `govet` mean that all code is
consistent. The three tools warn about style guide violations and remind you
to document your code (in accordance with the style guide).

__Easy Deployment:__ The main Go compilers produce statically linked
binaries. Cross-compilation is as easy as setting a few environment
variables during the build.

__Resource Management:__ `defer` makes error handling simple by registering
a function to be executed when the current function returns. Open a file?
Just `defer file.Close()`. No need for try-catch-finally.

## What I Dislike

__No ADTs:__ Pattern matching and ADTs, or even just enumerations, would be
extremely useful, just to be able to express the concept of having one of a
finite set of mutually exclusive values.

__Error Handling:__ Error handling is done C-style: check the return
value. Multiple return values make this a bit less crufty, but the sad fact
is that 50% of your code[^1] is gonna look like this:

```go
thingIWant, err := doSomething()
if err != nil {
	return err
}
defer thingIWant.Close()
```

This gets extremely tedious, and leads into…

__Type System:__ The pattern above could easily be abstracted by something
like an `option` or `Either` monad (OCaml, Haskell), or with a `try!` macro
like in Rust. But it isn't. You're stuck writing all this repetitive
code. Go is halfway there, but lacks the abstraction to make error handling
less tedious.

__Default values:__ In Go, if you initialize a variable without an initial
value, they take on default zero values. This is true for any value,
including structs. This can be convenient, but I think the convenience is
outweighed by the fact that sometimes, you want to know when a value
actually was omitted. You can use pointers and `nil` for this, but then you
have to deal with `nil`. The default values are also somewhat inconsistent:
an empty map (hashtable) value, for instance, is `nil`, which isn’t usable
and will cause a runtime crash if you try to index it—which rather defeats
the purpose (I believe) of having default values in the first place (so you
don’t have to initialize everything).

## Conclusion

Go makes writing servers and other code that needs to be concurrent easier,
and the strict tooling and familiar syntax makes learning the language
easy. The design seems oriented towards speed of development and ease of
deployment. Overall, I’ve enjoyed working with Go, but it’s not a language
that I’ll continue to work with, like Python or Rust. It does fit the niche
of server and daemon applications quite well.

[^1]: No kidding, I checked with `go test -cover`. Most of where I lack
      coverage consists of the error branches.
[^2]: You can make a buffered channel with `make(chan T, n)` so that up to
    `n` items can be placed on the channel without blocking.
