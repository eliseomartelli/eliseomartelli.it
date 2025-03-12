---
title: "Introducing: Micromachine"
date: 2025-02-18 17:00
excerpt: Thread-safe, flexible, and generic state management for Go
tags:
  - Programming
  - Short
---

I'm pleased to announce the release of
[Micromachine](https://github.com/eliseomartelli/micromachine), a new
open-source library designed to simplify state management in Go applications.

## What is Micromachine?

Micromachine is a generic state machine implementation in Go that allows you to
define states and transitions between them. It supports any comparable type for
states and ensures thread safety, making it ideal for concurrent applications.
With Micromachine, you can define custom actions to be executed during state
transitions and check if a transition is valid before attempting it.

## Key Features

- **Generic State Management**: Supports any comparable type for states, providing flexibility in defining your state machine.
- **Thread Safety**: Ensures that concurrent access is handled correctly, making it suitable for multi-threaded applications.
- **Custom Actions**: Define custom actions to be executed during state transitions, allowing for complex state management logic.
- **Transition Validation**: Check if a transition is valid before attempting it, preventing runtime errors.

## Why Micromachine?

Micromachine was born out of the need for a simple yet powerful state
management solution in Go. As a developer, I often found myself implementing
state machines from scratch, which was time-consuming and error-prone.
Micromachine aims to solve this problem.

You can check out the
[Micromachine](https://github.com/eliseomartelli/micromachine) repository and
start using it today.
