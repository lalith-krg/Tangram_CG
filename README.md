# Tangram in WebGL

## How to execute

For this, you need to serve the static files using any server. eg.

1. If you are using VS Code, you can use the 'live server' plugin. [https://www.freecodecamp.org/news/vscode-live-server-auto-refresh-browser/]

2. If you have Python installed locally : 

	1. If Python version 3.X is available :
	`python3 -m http.server`

	2. If Python version 2.X is available :
	`python -m SimpleHTTPServer`

3. If you have a node setup, you can do :
	1. `npm install --global http-server` 
	
	2. `http-server`


To use this application, you switch between 4 modes by pressing the key `m`.

### Mode 0

This mode displays the final configuration of the 7 primitives in R0 and a random configuration in R1.

### Mode 1

This mode allows you to transform the primitives individually. First select a piece by clicking near its centroid. To translate it, use the arrow keys. To rotate it, press `0` or `)` to rotate clockwise and `9` or `(` to rotate anticlockwise. To scale the pieces, press `-` or `_` to scale down and `+` or `=` to scale up.

### Mode 2

This mode allows you to transform the primtives as a whole. This also uses the same keys for similar operations. To rotate it, press `0` or `)` to rotate clockwise and `9` or `(` to rotate anticlockwise. To scale the pieces, press `-` or `_` to scale down and `+` or `=` to scale up.

### Mode 3

This mode clears the primitives in R1.

