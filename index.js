import {Scene, Triangle, RightTriangle, Parallelogram, Rectangle, BgRectangle,
	WebGLRenderer, Shader } from './lib/threeD.js';
import {vertexShaderSrc} from './shaders/vertex.js';
import {fragmentShaderSrc} from './shaders/fragment.js';
import {vec3, vec4, mat4} from 'https://cdn.skypack.dev/gl-matrix';

// creating scenes
// Scene0: Background rectangles
// Scene1: The fixed square configuration
// Scene2: Playing with primitives

const scene0 = new Scene();
const scene1 = new Scene();
var scene2 = new Scene();

// defining all constants and variables required
var mode = 0;
var piece = -1;
const r0_center_x = -0.6;
const r0_center_y = 0.25;
const r1_center_x = 0.2;
const r1_center_y = 0.25;

const angle = 0.02;
const ninety = angle*78.5;
const disp = 0.01;
const scale = 0.02;

let xtemp = 0, ytemp = 0, ztemp = 0;

// defining fixed edge ratios
const edge1 = 0.15;
const edge2 = edge1*1.414;
const edge3 = edge1/1.414;
const edge4 = edge1*2.0;
const edge5 = edge4*1.414;

const renderer = new WebGLRenderer();
renderer.setSize(600, 600);
document.body.appendChild(renderer.domElement);

const shader = new Shader(renderer.glContext(), vertexShaderSrc, fragmentShaderSrc);
shader.use();

renderer.setAnimationLoop(animation);

var cent = scene2.centroid();

// returns random number between min and max
function getRandomPos(min, max){
	return min + Math.random()*(max-min);
}

// creating background rectangle

let r0 = new BgRectangle(r0_center_x, r0_center_y, 0.76, 1.4, [0, 0.8, 0, 1]);
let r1 = new BgRectangle(r1_center_x, r1_center_y, 0.76, 1.4, [0.8, 0, 0, 1]);

scene0.add(r0);
scene0.add(r1);

// creating primtives for R0

let rect1 = new Rectangle(0, 0, edge1, edge1, [0.8, 0, 0, 1]);
let para1 = new Parallelogram(0, 0, edge2, edge3, [0.5, 0, 0.5, 1]);
let right1 = new RightTriangle(0, 0, edge1, edge2, [0, 0.8, 0.8, 1]);
let right2 = new RightTriangle(0, 0, edge1, edge2, [0.8, 0.8, 0, 1]);
let right3 = new RightTriangle(0, 0, edge2, edge4, [0, 0.8, 0, 1]);
let right4 = new RightTriangle(0, 0, edge4, edge5, [0, 0.4, 0.8, 1]);
let right5 = new RightTriangle(0, 0, edge4, edge5, [0.8, 0.4, 0, 1]);

let original_pieces = [rect1, para1, right1, right2, right3, right4, right5];

// hardcode initial orientation in R0

origTranslateFun(original_pieces, 0, r0_center_x, r0_center_y-edge3);
origTranslateFun(original_pieces, 1, r0_center_x-edge3*3/2, r0_center_y+edge3/2);
origTranslateFun(original_pieces, 2, r0_center_x-edge3*2/3, r0_center_y);
origTranslateFun(original_pieces, 3, r0_center_x+edge3, r0_center_y-edge3*5/3);
origTranslateFun(original_pieces, 4, r0_center_x-edge2*2/3, r0_center_y-edge3-edge2/6);
origTranslateFun(original_pieces, 5, r0_center_x+edge2*2/3, r0_center_y);
origTranslateFun(original_pieces, 6, r0_center_x, r0_center_y+edge2*2/3);

origRotateFun(original_pieces, 0, ninety/2);
origRotateFun(original_pieces, 1, 0);
origRotateFun(original_pieces, 2, 0);
origRotateFun(original_pieces, 3, ninety);
origRotateFun(original_pieces, 4, -ninety*3/2);
origRotateFun(original_pieces, 5, ninety*2);
origRotateFun(original_pieces, 6, -ninety);

for (let i=0; i<original_pieces.length; i++){
	scene1.add(original_pieces[i]);
}

function origTranslateFun(original_pieces, piece, dispx, dispy){
	
	xtemp = original_pieces[piece].transform.translate[0];
	ytemp = original_pieces[piece].transform.translate[1];
	ztemp = original_pieces[piece].transform.translate[2];
	original_pieces[piece].transform.translate = 
		vec3.fromValues(xtemp+dispx, ytemp+dispy, 0);
	
	original_pieces[piece].updateCenter([dispx, dispy]);
}
function origRotateFun(original_pieces, piece, angle){
	original_pieces[piece].transform.rotationAngle = 
		original_pieces[piece].transform.rotationAngle + angle;
	original_pieces[piece].transform.rotationAxis = 
		vec3.fromValues(0, 0, 1);
}



// creating primitives for R1
var r1_pieces = [];

// call mode0 for setting random positions of primitives in R1
r1_pieces = mode0();

function mode0(){

	let newrect1p = new Rectangle(0, 0, edge1, edge1, [0.8, 0, 0, 1]);
	let newpara1p = new Parallelogram(0, 0, edge2, edge3, [0.5, 0, 0.5, 1]);
	let newright1p = new RightTriangle(0, 0, edge1, edge2, [0, 0.8, 0.8, 1]);
	let newright2p = new RightTriangle(0, 0, edge1, edge2, [0.8, 0.8, 0, 1]);
	let newright3p = new RightTriangle(0, 0, edge2, edge4, [0, 0.8, 0, 1]);
	let newright4p = new RightTriangle(0, 0, edge4, edge5, [0, 0.4, 0.8, 1]);
	let newright5p = new RightTriangle(0, 0, edge4, edge5, [0.8, 0.4, 0, 1]);

	r1_pieces = [newrect1p, newpara1p, newright1p, newright2p, newright3p, newright4p, newright5p];

	scene2 = new Scene();

	for (let i=0; i<r1_pieces.length; i++){
		scene2.add(r1_pieces[i]);
	}

	for (let i=0; i<r1_pieces.length; i++){
		let xpos = getRandomPos(r1_center_x-edge2, r1_center_x+edge2);
		let ypos = getRandomPos(r1_center_y-edge4*1.25, r1_center_y+edge4*1.25);

		// translate pieces to random position within bounds
		translateFun(i, xpos, ypos);
	}

	return r1_pieces;

}

// when mouse is clicked
function getMousePosition(canvas, event){

	// transforming canvas coordinates
	let rect = canvas.getBoundingClientRect();
	let x = ((event.clientX - rect.left)/(rect.right-rect.left) - 0.5)*2;
	let y = -((event.clientY - rect.top)/(rect.bottom-rect.top) - 0.5)*2;
	console.log("Coordinate x: " + x, "Coordinate y: " + y);
	
	// selecting nearest piece to clicked coordinates
	if (mode==1){
		let mindist = 4;

		for (let i=0; i<r1_pieces.length; i++){
			let piecex = r1_pieces[i].center[0];
			let piecey = r1_pieces[i].center[1];
			let dist = Math.sqrt((piecex-x)*(piecex-x) + (piecey-y)*(piecey-y));
			console.log(dist)

			if (dist<mindist){
				mindist = dist;
				piece = i;
			}
		}

		// select piece i
		console.log("Piece selected: " + piece);
	}
}
let canvasElem = document.querySelector("canvas");
canvasElem.addEventListener("mousedown", function(e){
	getMousePosition(canvasElem, e);
});

function translateFun(piece, dispx, dispy){
	xtemp = r1_pieces[piece].transform.translate[0];
	ytemp = r1_pieces[piece].transform.translate[1];
	ztemp = r1_pieces[piece].transform.translate[2];
	r1_pieces[piece].transform.translate = 
		vec3.fromValues(xtemp+dispx, ytemp+dispy, 0);
	
	r1_pieces[piece].updateCenter([dispx, dispy]);
}
function rotateFun(piece, angle){
	r1_pieces[piece].transform.rotationAngle = 
		r1_pieces[piece].transform.rotationAngle + angle;
	r1_pieces[piece].transform.rotationAxis = 
		vec3.fromValues(0, 0, 1);
}
function scaleFun(piece, scale){
	xtemp = r1_pieces[piece].transform.scale[0];
	ytemp = r1_pieces[piece].transform.scale[1];
	ztemp = r1_pieces[piece].transform.scale[2];
	r1_pieces[piece].transform.scale = 
		vec3.fromValues(xtemp+scale, ytemp+scale, ztemp+scale);
}

// event listener on keydown
document.addEventListener('keydown', (event) => {
	var name = event.key;
	var code = event.code;

	if (name == 'm' || name == 'M'){
		mode++;
		if (mode>3){
			mode = 0;
		}
		console.log("mode " + mode);
	
		if (mode==0){
			r1_pieces = mode0();
		}
	}


	// ****** MODE 1 ******

	if ((name == '+' || name == '=') && (mode==1 && piece>-1)){
		// scale up piece
		scaleFun(piece, scale);
	}

	else if ((name == '-' || name == '_') && (mode==1 && piece>-1)){
		// scale down piece
		scaleFun(piece, -scale);
	}

	else if ((name == '(' || name == '9') && (mode==1 && piece>-1)){
		// rotate acw
		rotateFun(piece, angle);
	}

	else if ((name == ')' || name == '0') && (mode==1 && piece>-1)){
		// rotate cw
		rotateFun(piece, -angle);
	}

	else if ((name == 'ArrowUp') && (mode==1 && piece>-1)){
		// move up
		translateFun(piece, 0, disp);
	}

	else if ((name == 'ArrowDown') && (mode==1 && piece>-1)){
		// move down
		translateFun(piece, 0, -disp);
	}

	else if ((name == 'ArrowLeft') && (mode==1 && piece>-1)){
		// move left
		translateFun(piece, -disp, 0);
	}

	else if ((name == 'ArrowRight') && (mode==1 && piece>-1)){
		// move right
		translateFun(piece, disp, 0);
	}


	// ****** MODE 2 ******

	else if ((name == '=' || name == '+') && (mode==2)){
		// scale up
		
		for (let i=0; i<r1_pieces.length; i++){
			let pcenter = r1_pieces[i].center;

			scaleFun(i, scale);
			
			let newtx = (pcenter[0]-cent[0])*scale;
			let newty = (pcenter[1]-cent[1])*scale;

			// translate piece to scaled position
			
			translateFun(i, newtx, newty);
		}
	}
	
	else if ((name == '-' || name == '_') && (mode==2)){
		// scale down

		for (let i=0; i<r1_pieces.length; i++){
			let pcenter = r1_pieces[i].center;
			
			scaleFun(i, -scale);

			let newtx = -(pcenter[0]-cent[0])*scale;
			let newty = -(pcenter[1]-cent[1])*scale;

			// translate piece to scaled position

			translateFun(i, newtx, newty);
		}
	}

	else if ((name == '(' || name == '9') && (mode==2)){
		// rotate acw

		for (let i=0; i<r1_pieces.length; i++){
			rotateFun(i, angle);

			let new_angle = angle;
			let pcenter = r1_pieces[i].center;
			let xpos = pcenter[0] - cent[0];
			let ypos = pcenter[1] - cent[1];

			let tx = Math.cos(new_angle)*xpos - Math.sin(new_angle)*ypos;
			let ty = Math.cos(new_angle)*ypos + Math.sin(new_angle)*xpos;

			// translate piece to new rotated position

			translateFun(i, -xpos+tx, -ypos+ty);
		}
	}

	else if ((name == ')' || name == '0') && (mode==2)){
		// rotate cw

		for (let i=0; i<r1_pieces.length; i++){
			rotateFun(i, -angle);

			let new_angle = -angle;
			let pcenter = r1_pieces[i].center;
			let xpos = pcenter[0] - cent[0];
			let ypos = pcenter[1] - cent[1];

			let tx = Math.cos(new_angle)*xpos - Math.sin(new_angle)*ypos;
			let ty = Math.cos(new_angle)*ypos + Math.sin(new_angle)*xpos;

			// translate piece to new rotated position

			translateFun(i, -xpos+tx, -ypos+ty);
		}
	}

	else if ((name == 'ArrowUp') && (mode==2)){
		// move up
		for (let i=0; i<r1_pieces.length; i++){
			translateFun(i, 0, disp);
		}
	}

	else if ((name == 'ArrowDown') && (mode==2)){
		// move down
		for (let i=0; i<r1_pieces.length; i++){
			translateFun(i, 0, -disp);
		}
	}

	else if ((name == 'ArrowLeft') && (mode==2)){
		// move left
		for (let i=0; i<r1_pieces.length; i++){
			translateFun(i, -disp, 0);
		}
	}

	else if ((name == 'ArrowRight') && (mode==2)){
		// move right
		for (let i=0; i<r1_pieces.length; i++){
			translateFun(i, disp, 0);
		}
	}

	// Alert the key name and key code on keydown
	console.log(`Key pressed ${name}`);
}, false);


//Draw loop
function animation()
{
	renderer.clear(0.9,0.9,0.9,1);

	renderer.renderbg(scene0, shader);
	renderer.render(scene1, shader);

	// do not render playable primitives if in mode 3
	if (mode<3){
		cent = renderer.render(scene2, shader);	
	}
}
