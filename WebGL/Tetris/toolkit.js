glArrayType=typeof Float32Array!='undefined'?Float32Array:typeof Array;

glIndexType=typeof Uint16Array!='undefined'?Uint16Array:typeof Array;

function toRadians(deegrees){
	return deegrees * Math.PI / 180;
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) {
		window.setTimeout(callback, 1000/60);
		};
})();

var mat4 = {};
mat4.identity = function(){
	var matrix = new glArrayType(16);
	for(var i = 0; i < matrix.length; i++){
		(i%5 == 0) ? matrix[i] = 1.0 : matrix[i] = 0.0;
	}
	return matrix;
};
mat4.setIdentity = function(matrix){
	matrix[0] = 1;
	matrix[1] = 0;
	matrix[2] = 0;
	matrix[3] = 0;
	matrix[4] = 0;
	matrix[5] = 1;
	matrix[6] = 0;
	matrix[7] = 0;
	matrix[8] = 0;
	matrix[9] = 0;
	matrix[10] = 1;
	matrix[11] = 0;
	matrix[12] = 0;
	matrix[13] = 0;
	matrix[14] = 0;
	matrix[15] = 1;
};
mat4.transpose = function(matrix){
	var a01 = matrix[1], a02 = matrix[2], a03 = matrix[3],
		a12 = matrix[6], a13 = matrix[7],
		a23 = matrix[11];

	matrix[1] = matrix[4];
	matrix[2] = matrix[8];
	matrix[3] = matrix[12];
	matrix[4] = a01;
	matrix[6] = matrix[9];
	matrix[7] = matrix[13];
	matrix[8] = a02;
	matrix[9] = a12;
	matrix[11] = matrix[14];
	matrix[12] = a03;
	matrix[13] = a13;
	matrix[14] = a23;
	return matrix;
};
mat4.scaleX = function(matrix, scale){
	matrix[0] *= scale;
};
mat4.scaleY = function(matrix, scale){
	matrix[5] *= scale;
};
mat4.scaleZ = function(matrix, scale){
	matrix[10] *= scale;
};
mat4.scale = function(matrix, scales){
	matrix[0] *= scale[0];
	matrix[5] *= scale[1];
	matrix[10] *= scale[2];
};
mat4.translateX = function(matrix, translation){
	matrix[12] += translation;
};
mat4.translateY = function(matrix, translation){
	matrix[13] += translation;
};
mat4.translateZ = function(matrix, translation){
	matrix[14] += translation;
};
mat4.position = function(matrix, position){
	matrix[12] = position[0];
	matrix[13] = position[1];
	matrix[14] = position[2];
};
mat4.perspective = function(FOV, aspectRatio, nearPlane, farPlane){
	var matrix = mat4.identity();
	var xyScale = 1.0 / Math.tan(toRadians(FOV)/2.0);
	var frustumLength = 1.0 / (nearPlane - farPlane);
	matrix[0] = xyScale / aspectRatio;
	matrix[5] = xyScale;
	matrix[10] = (farPlane + nearPlane) * frustumLength;
	matrix[11] = -1;
	matrix[14] = (2 * farPlane * nearPlane) * frustumLength;
	matrix[15] = 0;
	return matrix;
};
mat4.string = function(matrix){
	var output = "";
	for(var i = 0; i < 16; i++){
		if(i%4 != 3){
			output += matrix[i]+", ";
		}else{
			output += matrix[i]+"\n";
		}
	}
	return output;
};
mat4.rotateX = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a10 = matrix[4],
		a11 = matrix[5],
		a12 = matrix[6],
		a13 = matrix[7],
		a20 = matrix[8],
		a21 = matrix[9],
		a22 = matrix[10],
		a23 = matrix[11];

	matrix[4] = a10 * cos + a20 * sin;
	matrix[5] = a11 * cos + a21 * sin;
	matrix[6] = a12 * cos + a22 * sin;
	matrix[7] = a13 * cos + a23 * sin;
	matrix[8] = a20 * cos - a10 * sin;
	matrix[9] = a21 * cos - a11 * sin;
	matrix[10] = a22 * cos - a12 * sin;
	matrix[11] = a23 * cos - a13 * sin;
};
mat4.rotateY = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a00 = matrix[0],
		a01 = matrix[1],
		a02 = matrix[2],
		a03 = matrix[3],
		a20 = matrix[8],
		a21 = matrix[9],
		a22 = matrix[10],
		a23 = matrix[11];

	matrix[0] = a00 * cos - a20 * sin;
	matrix[1] = a01 * cos - a21 * sin;
	matrix[2] = a02 * cos - a22 * sin;
	matrix[3] = a03 * cos - a23 * sin;
	matrix[8] = a20 * cos + a00 * sin;
	matrix[9] = a21 * cos + a01 * sin;
	matrix[10] = a22 * cos + a02 * sin;
	matrix[11] = a23 * cos + a03 * sin;
};
mat4.rotateZ = function(matrix, angle){
	var cos = Math.cos(toRadians(angle)),
		sin = Math.sin(toRadians(angle)),
		a00 = matrix[0],
		a01 = matrix[1],
		a02 = matrix[2],
		a03 = matrix[3],
		a10 = matrix[4],
		a11 = matrix[5],
		a12 = matrix[6],
		a13 = matrix[7];

	matrix[0] = a00 * cos + a10 * sin;
	matrix[1] = a01 * cos + a11 * sin;
	matrix[2] = a02 * cos + a12 * sin;
	matrix[3] = a03 * cos + a13 * sin;
	matrix[4] = a10 * cos - a00 * sin;
	matrix[5] = a11 * cos - a01 * sin;
	matrix[6] = a12 * cos - a02 * sin;
	matrix[7] = a13 * cos - a03 * sin;
};
mat4.translateX = function(matrix, x){
	matrix[12] = matrix[0] * x + matrix[12];
	matrix[13] = matrix[1] * x + matrix[13];
	matrix[14] = matrix[2] * x + matrix[14];
	matrix[15] = matrix[3] * x + matrix[15];
};
mat4.translateY = function(matrix, y){
	matrix[12] = matrix[4] * y + matrix[12];
	matrix[13] = matrix[5] * y + matrix[13];
	matrix[14] = matrix[6] * y + matrix[14];
	matrix[15] = matrix[7] * y + matrix[15];
};
mat4.translateZ = function(matrix, z){
	matrix[12] = matrix[8] * z + matrix[12];
	matrix[13] = matrix[9] * z + matrix[13];
	matrix[14] = matrix[10] * z + matrix[14];
	matrix[15] = matrix[11] * z + matrix[15];
};
mat4.translateVector = function(matrix, vector){
	matrix[12] = matrix[0] * vector[0] + matrix[4] * vector[1] + matrix[8] * vector[2] + matrix[12];
	matrix[13] = matrix[1] * vector[0] + matrix[5] * vector[1] + matrix[9] * vector[2] + matrix[13];
	matrix[14] = matrix[2] * vector[0] + matrix[6] * vector[1] + matrix[10] * vector[2] + matrix[14];
	matrix[15] = matrix[3] * vector[0] + matrix[7] * vector[1] + matrix[11] * vector[2] + matrix[15];
};
