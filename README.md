# dintfw
A pure HTML/JS/CSS 2d game engine.

This README file is temporary and a better looking one will probably be made at some point in the future.
The following information is probably important:

- The engine is very young and, in its current state, is only meant to be **effective**, but not
neccesarily **efficient**.
- Currently, there is no documentation on how to use the engine. It will probably be made in the near future.
The code is now commentated, although I haven't had it reviewed, so I just assume it's readable.
- The engine uses HTML's elements as the game objects and sprites. It does not use *canvas*.
- The engine can only display 2D images, and they must be provided in a tileset or spritesheet. 
- The engine uses the HTML *audio* tag for audio capabilities.

Some terminology that is used in the code's comments:
- "Window", "Screen" and "Scene" refer to the where the graphics are displayed, but they are *not* interchangeable terms:
 *Window* is the whole window of the web browser. *Screen* is the part of the Window where graphics actually are displayed, so the black
 sidebars are not part of the screen. The *Scene* is defined by the game itself: whereas the size of the screen is set by the browser window, the
 size of the scene is set by the game's code, and is therefore scaled to fit into the Screen.
- "Actor" is an object that represents an element of the game. Most likey, anything that can be seen is an Actor, be it backgrounds, characters,
 game pieces, texts, etc.
- "Atlas" is similar in concept to a spritesheet. An Actor has an associated Atlas, which tells it which graphics to use and display.

The engine was originally made for a game design course I took in 2018. The engine worked as expected, but it was never used for anything beyond that.

The game that was made using the engine can be found here.
https://dintdt.itch.io/desert-rider
I apologize in advance for the underwhelming gameplay.
