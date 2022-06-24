import {Transform} from './transform.js';

export class Triangle
{
	constructor(c1, c2, c3, centerX, centerY, color){
		this.center = [centerX, centerY];
		this.color = color;

		this.vertexPositions = new Float32Array([
			c1[0], c1[1], 0.0,
			c2[0], c2[1], 0.0,
			c3[0], c3[1], 0.0
		]);

		this.transform = new Transform();
	}

	updateCenter(newcenter){
		this.center = [this.center[0]+newcenter[0], this.center[1]+newcenter[1]];
	}
}

export class RightTriangle
{
	constructor(centerX, centerY, edge, hyp, color)
	{
		this.center = [centerX, centerY];
		this.color = color;

		this.vertexPositions = new Float32Array([
			centerX + (edge/1.414)*2/3.0, centerY, 0.0,
			centerX - (edge/1.414)/3.0, centerY - hyp/2.0, 0.0,
			centerX - (edge/1.414)/3.0, centerY + hyp/2.0, 0.0
		]);

		this.transform = new Transform();
	}

	updateCenter(newcenter){
		this.center = [this.center[0]+newcenter[0], this.center[1]+newcenter[1]];
	}
}
