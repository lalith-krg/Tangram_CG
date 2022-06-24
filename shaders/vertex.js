export const vertexShaderSrc = `      
	attribute vec3 aPosition;
	uniform mat4 transformMat;
	
	void main () { 
		gl_Position = transformMat * vec4(aPosition, 1.0); 
	}
`;