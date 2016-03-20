function Tetromino(type){
	this.type = type;
	this.cubes = new Array(Tetromino.prototype.NUM_CUBES);
	this.setArrangement();
}

Tetromino.prototype.setArrangement = function(){
	this.rotations = [];
	if(this.type === this.TYPE_I){
		this.rotations.push([0,0, 0,1, 0,-1, 0,-2]);
		this.rotations.push([0,0, -1,0, 1,0, 2,0]);
		this.color = [0,1,1];
	}else if(this.type === this.TYPE_J){
		this.rotations.push([0,0, -1,0, -1,1, 1,0]);
		this.rotations.push([0,0, 0,1, 1,1, 0,-1]);
		this.rotations.push([0,0, 1,0, 1,-1, -1,0]);
		this.rotations.push([0,0, 0,-1, -1,-1, 0,1]);
		this.color = [0,0,1];
	}else if(this.type === this.TYPE_L){
		this.rotations.push([0,0, 1,0, 1,1, -1,0]);
		this.rotations.push([0,0, 0,-1, 1,-1, 0,1]);
		this.rotations.push([0,0, -1,0, -1,-1, 1,0]);
		this.rotations.push([0,0, 0,1, -1,1, 0,-1]);
		this.color = [1, 0.5, 0];
	}else if(this.type === this.TYPE_O){
		this.rotations.push([0,0, 0,1, 1,0, 1,1]);
		this.color = [1,1,0];
	}else if(this.type === this.TYPE_S){
		this.rotations.push([0,0, 0,1, 1,1, -1,0]);
		this.rotations.push([0,0, 1,0, 1,-1, 0,1]);
		this.rotations.push([0,0, 0,-1, -1,-1, 1,0]);
		this.rotations.push([0,0, -1,0, -1,1, 0,-1]);
		this.color = [0,1,0];
	}else if(this.type === this.TYPE_T){
		this.rotations.push([0,0, -1,0, 0,1, 1,0]);
		this.rotations.push([0,0, 0,1, 1,0, 0,-1]);
		this.rotations.push([0,0, 1,0, 0,-1, -1,0]);
		this.rotations.push([0,0, 0,-1, -1,0, 0,1]);
		this.color = [1,0,1];
	}else if(this.type === this.TYPE_Z){
		this.rotations.push([0,0, 0,1, -1,1, 1,0]);
		this.rotations.push([0,0, 1,0, 1,1, 0,-1]);
		this.rotations.push([0,0, 0,-1, 1,-1, -1,0]);
		this.rotations.push([0,0, -1,0, -1,-1, 0,1]);
		this.color = [1,0,0];
	}else{
		alert("Error! Tetromino type "+this.type+" does not exist.");
	}
	var stride = Cube.prototype.SIZE;
	for(var i = 0; i < Tetromino.prototype.NUM_CUBES; i++){
		console.log("Aloha!"+this.rotations[0]);
		this.cubes[i] = new Cube(this.SCALES, this.ROTATIONS, [this.rotations[0][2*i]*stride, this.rotations[0][2*i+1]*stride, 0], this.color);
		console.log("Aloha!"+this.cubes[i].getTranslations());
	}
};

Tetromino.prototype.rotate = function(clockwise){
	if(clockwise){
		this.rotations.push(this.rotations.shift());
	}else{
		this.rotations.unshift(this.rotations.pop());
	}
	var stride = Cube.prototype.SIZE;
	for(var i = 0; i < Tetromino.prototype.NUM_CUBES; i++){
		console.log("Aloha!"+this.rotations[0]);
		this.cubes[i] = new Cube(this.SCALES, this.ROTATIONS, [this.rotations[0][2*i]*stride, this.rotations[0][2*i+1]*stride, 0], this.color);
		console.log("Aloha!"+this.cubes[i].getTranslations());
	}
};

Tetromino.prototype.SCALES = [1,1,1];
Tetromino.prototype.ROTATIONS = [0,0,0];

Tetromino.prototype.NUM_CUBES = 4;

Tetromino.prototype.TYPE_I = 0;
Tetromino.prototype.TYPE_J = 1;
Tetromino.prototype.TYPE_L = 2;
Tetromino.prototype.TYPE_O = 3;
Tetromino.prototype.TYPE_S = 4;
Tetromino.prototype.TYPE_T = 5;
Tetromino.prototype.TYPE_Z = 6;