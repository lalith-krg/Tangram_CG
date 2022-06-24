import {Transform} from './transform.js';
import {Triangle} from './triangle.js';

export class Rectangle
{
	constructor(centerX, centerY, length, breadth, color)
	{
		this.center = [centerX, centerY];
		this.color = color;

		const c1 = [centerX + length/2, centerY + breadth/2];
		const c2 = [centerX + length/2, centerY - breadth/2];
		const c3 = [centerX - length/2, centerY - breadth/2];
		const c4 = [centerX - length/2, centerY + breadth/2];
		let vertices = [c1, c2, c3, c4];

		this.triangles = [];

		for (let i=1; i<3; i++){
			this.triangles.push(new Triangle(vertices[0], vertices[i], vertices[i+1],
				c1[0]+c2[0]+c3[0], c1[1]+c2[1]+c3[1]));
		}

		this.vertexPositions = [];
		
		for (let i=0; i<this.triangles.length; i++){
			for (let j=0; j<this.triangles[i].vertexPositions.length; j++){
				this.vertexPositions.push(this.triangles[i].vertexPositions[j]);
			}
		}

		this.vertexPositions = new Float32Array(this.vertexPositions);

		this.transform = new Transform();
	}

	updateCenter(newcenter){
		this.center = [this.center[0]+newcenter[0], this.center[1]+newcenter[1]];
	}
}


export class BgRectangle
{
	constructor(centerX, centerY, length, breadth, color)
	{
		this.center = [centerX, centerY];
		this.color = color;

		const c1 = [centerX + length/2, centerY + breadth/2];
		const c2 = [centerX + length/2, centerY - breadth/2];
		const c3 = [centerX - length/2, centerY - breadth/2];
		const c4 = [centerX - length/2, centerY + breadth/2];
		let vertices = [c1, c2, c3, c4];

		this.triangles = [];

		for (let i=1; i<3; i++){
			this.triangles.push(new Triangle(vertices[0], vertices[i], vertices[i+1],
				c1[0]+c2[0]+c3[0], c1[1]+c2[1]+c3[1]));
		}

		this.vertexPositions = [];
		
		// for (let i=0; i<this.triangles.length; i++){
		// 	for (let j=0; j<this.triangles[i].vertexPositions.length; j++){
		// 		this.vertexPositions.push(this.triangles[i].vertexPositions[j]);
		// 	}
		// }
		
		this.vertexPositions.push(this.triangles[0].vertexPositions[0]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[1]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[2]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[3]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[4]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[5]);

		this.vertexPositions.push(this.triangles[0].vertexPositions[0]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[1]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[2]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[6]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[7]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[8]);

		this.vertexPositions.push(this.triangles[0].vertexPositions[3]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[4]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[5]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[6]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[7]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[8]);
		
		this.vertexPositions.push(this.triangles[0].vertexPositions[6]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[7]);
		this.vertexPositions.push(this.triangles[0].vertexPositions[8]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[6]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[7]);
		this.vertexPositions.push(this.triangles[1].vertexPositions[8]);

		this.vertexPositions = new Float32Array(this.vertexPositions);

		this.transform = new Transform();
	}

	updateCenter(newcenter){
		this.center = [this.center[0]+newcenter[0], this.center[1]+newcenter[1]];
	}
}