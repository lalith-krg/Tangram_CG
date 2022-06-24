import {Transform} from './transform.js';
import {Triangle} from './triangle.js';

export class Parallelogram
{
	constructor(centerX, centerY, length, breadth, color)
	{
		this.center = [centerX, centerY];
		this.color = color;

		const c1 = [centerX + breadth/2, centerY + length/4];
		const c2 = [centerX + breadth/2, centerY - length*3/4];
		const c3 = [centerX - breadth/2, centerY - length/4];
		const c4 = [centerX - breadth/2, centerY + length*3/4];
		const vertices = [c1, c2, c3, c4];

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