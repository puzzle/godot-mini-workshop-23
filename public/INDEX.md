# Game Programming with Godot 4

---

## Scope

- Learn about Godot
- Make your first little physics game

![My first game](sandbox_game.png)

---

## Not Scope

- Sound
- Animation
- UI / Canvas
- Coding with C#

---

## Not Scope (2)

- Testing
- In depth 3D (materials, shaders, rendering pipelines, textures)
- Modeling using blender
- Networking / multiplayer / servers

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

## Part 3/3 - Scripting/Programming in Godot

- Introduction to GDScript

---

# What is Godot?

---

## What is Godot?

Godot is a Game Programming Engine - inspired by Unity and Unreal Engine.

---

## Godot is OSS!

Godot is free and Open Source (MIT).

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

# Installing Godot 4.x

---

## Installing Godot 4.x

Ubuntu/Debian:

```
sudo apt install snapd

sudo snap install core

sudo snap install godot-4 --edge
```

https://godotengine.org/download/linux/

---

# Exercise 1 - Create your first scene!

Learning by doing!

---

## Create a project

![Create a project](create_project.png)

---

## Create your first Scene

![img.png](create_first_scene.png)

---

## Name the root node

Name is something like `World`.

![img.png](rename_node.png)

---

## Create floor

Add a `CSGBox3D` node to your world.

![img.png](create_node.png)

Name it `Floor`.

---

## Change size of cube

Change the size of the cube to make a floor tile

![img.png](inspector_size.png)

---

## Add material to the floor

![img.png](change_material.png)

---

## Change the albedo of the floor

![img.png](change_albedo_color.png)

Trivia: Albedo is "Rückstrahlvermögen"

---

## Add a camera

Add a `Camera3D` node to your scene.

Use the handles to move the camera a bit upwards and rotate it downwards.

![img.png](handles.png)

---

## Tip: Use preview and other perspectives!

![img.png](views_perspective.png)

---

## Add a light

Add a `DirectionalLight3D` node to your scene.

1. Use the handles to control the direction of the light.
2. Make the light cast shadows

![img.png](light_and_shadow.png)

---

## Add a can

1. Add a `CSGCylinder3D` node to your scene.
2. Name it `Can`.
3. Resize it to 0.1m radius, 0.2m height
4. Change the material of your can
5. Press F5 to play your scene!

Congrats! You have your first scene!

---

# Physics in Godot

---

## Static body

Static bodies are not affected by other forces (gravity, other bodies).
Used for immovable objects, like walls, obstacles.

---

## Rigid body

Rigid bodies are affected by other bodies and constant forces (gravity).
Used for movable objects.

---

## Physics simulation using collision shapes

At least 1 collision shape has to be added as child nodes of static/rigid bodies.

![img.png](collision_shapes.png)

---

## Physics material

CONT

---


## CSG - Constructive Solid Geometry

### Materials


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