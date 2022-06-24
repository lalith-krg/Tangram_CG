import { vec3, mat4 } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 0, 0, 1);

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);

		this.updateModelTransformMatrix();
	}

	updateModelTransformMatrix()
	{
		// @ToDO
		// 1. Reset the transformation matrix
		mat4.identity(this.modelTransformMatrix);

		// 2. Use the current transformations values to calculate the latest transformation matrix
		// TransformMatrix = 
		// [
		// 	s*cos(angle/180 * Math.PI), sin(angle/180 * Math.PI), 0, 0,
		// 	-sin(angle/180 * Math.PI), s*cos(angle/180 * Math.PI), 0, 0,
		// 	0, 0, 0, 0,
		// 	tx, ty, 0, 1
		// ];
	
		mat4.translate(this.modelTransformMatrix, this.modelTransformMatrix, this.translate);
		mat4.rotate(this.modelTransformMatrix, this.modelTransformMatrix, this.rotationAngle, this.rotationAxis);
		mat4.scale(this.modelTransformMatrix, this.modelTransformMatrix, this.scale);
		
	}
}