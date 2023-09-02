# Game Programming with Godot 4

---

## Scope

- Learn about Godot
- Make your first little physics game

---

## Not Scope

- Sound
- Animation
- UI / Canvas
- Coding with C#
- Testing
- In depth 3D (materials, shaders, rendering pipelines, textures)
- Modeling using blender (maybe a bit?)
- networking / multiplayer / servers

---

## Part 1/3 - Introduction

- What is Godot? (10 min)
- Introduction to the Godot UI (10 min)
- Installing Godot (10min?)
- Exercise 1 - Make your first scene (30min)

---

## Part 2/3 - Physics in Godot

- Staticbody, Rigidbody (5 min)
- Exercise 2 - Add physics to your scene (15min)

---

## Part 3/3 - Scripting in Godot

- Introduction to GDScript

---

## What is Godot?

Godot is a Game Programming Engine - inspired by Unity and Unreal Engine.

---

## What is Godot? (2)

Godot is Free and Open Source (MIT).

---

## What is Godot? (3)

Godot can target natively:

- Linux (X11)
- Windows (UWP / Desktop)
- MacOSX

- Android
- iOS

- Web (HTML5/Webasm)

---

## What is Godot? (4)

Main Programming languages:

- GDScript (inspired by python)
- C#

---

## Installing Godot 4.0

Ubuntu/Debian:

```
sudo apt install snapd

sudo snap install core

sudo snap install godot-4 --edge
```

https://godotengine.org/download/linux/

---

## Godot UI

---

## Controls


---

## Godot scenes & node-based system

---

## Adding nodes

---

## Scene elements

---

## Lights

---

## Cameras

---

## CSG - Constructive Solid Geometry

### Materials


---

## Exercise 1

* Create a floor
* Create a table
* Create a tin can

---

## Physics in Godot


---

## Static bodies

---

## Rigid bodies

---

## Car

---

## Exercise 2

* Make floor and table static body
* Make the tin can a rigid body
* Save the tin can into a scene
* Make more tin cans
* Make a ball
* Set physics properties

---

## GD Script

Python inspired.
`@onready`
`@export`
`class_name`
`@icon`
`extends`

https://docs.godotengine.org/en/stable/classes/class_%40gdscript.html#class-gdscript

---

## Scripts on nodes

* _ready()
* _process(delta)
* _input(event)

---

## Type hints

---

## Static variables

---

## Debugging

---

## Mouse look script

---

## Instancing scenes in a scene

---

## Exercise 3

* Add the mouse look script
* Mouse click: throws a ball
* reset scene
* (optional): Scores

---

## You're FREE