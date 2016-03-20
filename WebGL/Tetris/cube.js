function Cube(scales, rotations, translations, color){
	this.scales = scales;
	this.rotations = rotations;
	this.translations = translations;
	this.color = color;
	this.modelMatrix = mat4.getModelMatrix(scales, rotations, translations);
}

Cube.prototype.getTranslations = function(){
	return this.translations;
};

Cube.prototype.getModelMatrix = function(){
	this.modelMatrix = mat4.getModelMatrix(scales, rotations, translations);
	return this.modelMatrix;
};

Cube.prototype.SIZE = 2;

Cube.prototype.vertices = [-1,-1,-1, 1,-1,-1, 1, 1,-1, -1, 1,-1,
						-1,-1, 1, 1,-1, 1, 1, 1, 1, -1, 1, 1,
						-1,-1,-1, -1, 1,-1, -1, 1, 1, -1,-1, 1,
						1,-1,-1, 1, 1,-1, 1, 1, 1, 1,-1, 1,
						-1,-1,-1, -1,-1, 1, 1,-1, 1, 1,-1,-1,
						-1, 1,-1, -1, 1, 1, 1, 1, 1, 1, 1,-1
						];

Cube.prototype.verticesDim = 3;

Cube.prototype.indices = [0,1,2, 0,2,3, 4,5,6, 4,6,7,
						8,9,10, 8,10,11, 12,13,14, 12,14,15,
						16,17,18, 16,18,19, 20,21,22, 20,22,23 
						];

Cube.prototype.indicesLength = 36;