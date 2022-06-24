import { vec3, vec4, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class WebGLRenderer
{
	constructor()
	{
		this.domElement = document.createElement("canvas");		

		this.gl = this.domElement.getContext("webgl") || this.domElement.getContext("experimental-webgl");
		if (!this.gl) throw new Error("WebGL is not supported");

		this.setSize(50,50);
		this.clear(1.0,1.0,1.0,1.0);
	}	

	setSize(width, height)
	{
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	clear(r,g,b,a)
	{
		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}

	setAnimationLoop(animation) 
	{
		function renderLoop()
		{
			animation();
			window.requestAnimationFrame(renderLoop);
		}	

		renderLoop();
		  
	}

	render(scene, shader) 
	{
		let cent = [0, 0];
		let minx = 2;
		let maxx = -2;
		let miny = 2;
		let maxy = -2;

		scene.primitives.forEach( function (primitive) {
			primitive.transform.updateModelTransformMatrix(primitive.center);

			shader.bindArrayBuffer(shader.vertexAttributesBuffer, primitive.vertexPositions);
			
			shader.fillAttributeData("aPosition", primitive.vertexPositions, 3,  3 * primitive.vertexPositions.BYTES_PER_ELEMENT, 0);		
					
			shader.setUniform4f("uColor", primitive.color);
			shader.setUniformMatrix4fv("transformMat", primitive.transform.modelTransformMatrix);
			
			// Draw
			shader.drawArrays(primitive.vertexPositions.length / 3);

			let pvp = primitive.vertexPositions;
			let t = primitive.transform.modelTransformMatrix;
			let vp = [];

			for (let i=0; i<primitive.vertexPositions.length; i+=3){
				let x = primitive.vertexPositions[i];
				let y = primitive.vertexPositions[i+1];
				let z = primitive.vertexPositions[i+2];

				for (let j=0; j<4; j++){
					let prod = t[j]*x + t[j+4]*y + t[j+8]*z + t[j+12]*1;
					vp.push(prod);
				}
			}

			for (let i=0; i<vp.length; i++){

				if (vp[i] > maxx)
					maxx = vp[i];
				if (vp[i] < minx)
					minx = vp[i];
				
				i++;
				
				if (vp[i] > maxy)
					maxy = vp[i];
				if (vp[i] < miny)
					miny = vp[i];
				
				i+=2;
			}
		});

		cent = [(maxx+minx)/2, (maxy+miny)/2];
		return cent;
	}

	renderbg(scene, shader) 
	{
		scene.primitives.forEach( function (primitive) {
			primitive.transform.updateModelTransformMatrix(primitive.center);

			shader.bindArrayBuffer(shader.vertexAttributesBuffer, primitive.vertexPositions);
			
			shader.fillAttributeData("aPosition", primitive.vertexPositions, 3,  3 * primitive.vertexPositions.BYTES_PER_ELEMENT, 0);		
					
			shader.setUniform4f("uColor", primitive.color);
			shader.setUniformMatrix4fv("transformMat", primitive.transform.modelTransformMatrix);
			
			// Draw
			shader.drawArraysLines(primitive.vertexPositions.length/3);
		});
	}

	glContext()
	{
		return this.gl;
	}

	mouseToClipCoord(mouseX,mouseY) {
		// @ToDo
		// Worked out in index.js
	}
}