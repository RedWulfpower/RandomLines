var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var canvas = null;
var ctx    = null;
var dinges = new Array(100);

var maus = {
	x : 0,
	y : 0,
};


window.onload = function(){
	
	
	canvas = document.getElementById('canvas');
	
	canvas.setAttribute('height', window.innerHeight);
	canvas.setAttribute('width', window.innerWidth);
	
	ctx   = canvas.getContext('2d');

	
	for(var i=0;i<dinges.length;i++){
		dinges[i] = new ding();
	}
	
	
	
	canvas.addEventListener('mousemove', function(event){
		maus.x = event.clientX;
		maus.y = event.clientY;
		
	});
	
	newDings();
	
	loop();
}
window.onresize = function(){
	canvas.setAttribute('height', window.innerHeight);
	canvas.setAttribute('width', window.innerWidth);
	
	
	for(var i=0;i<dinges.length;i++){
		dinges[i] = new ding();
	}
}


function newDings(){

	dinges = new Array(Math.floor(Math.random()*100) );
	
	for(var i=0;i<dinges.length;i++){
		dinges[i] = new ding();
	}

	setTimeout(newDings, Math.floor(Math.random()*10000)+1000);
}



function loop(){

	//ctx.clearRect(maus.x -20, maus.y -20, 40, 40);
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	
	
	draw();
	
	requestAnimFrame(loop);
}

function draw(){

	for(var i=0;i<dinges.length;i++){
		dinges[i].draw();
	}
}







function ding(){
	var self = this;

	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	
	this.pos = Array(
		Array(((Math.random() * canvas.width) + 0), Math.floor((Math.random() * canvas.height) + 0)),
		Array(((Math.random() * canvas.width) + 0), Math.floor((Math.random() * canvas.height) + 0)),
	);
	
	
	var randanz = Math.floor(Math.random()*4);
	for(var i=0;i<randanz;i++){
	
		this.pos.push(Array(((Math.random() * canvas.width) + 0), Math.floor((Math.random() * canvas.height) + 0)));
		
	}
	
	this.x = ((Math.random() * canvas.width) + 0);
	this.y = Math.floor((Math.random() * canvas.height) + 0);
	
	this.xt = ((Math.random() * canvas.width) + 0);
	this.yt = Math.floor((Math.random() * canvas.height) + 0);
	
	this.draw = function(){
		
		ctx.fillStyle 	= self.color;
		ctx.strokeStyle = self.color;
		ctx.beginPath();
		
		
		for(var i=0; i< self.pos.length;i++){
			
			if(self.pos[i][0] > canvas.width){
				self.pos[i][0] -= canvas.width;
			}
			if(self.pos[i][0] < 0){
				self.pos[i][0] += canvas.width;
			}
			
			if(self.pos[i][1] > canvas.height){
				self.pos[i][1] -= canvas.height;
			}
			if(self.pos[i][1] < 0){
				self.pos[i][1] += canvas.height;
			}
		}
		
		
		
		self.pos[0][0] += ((Math.random()*4)-2);
		self.pos[0][1] += ((Math.random()*4)-2);
		ctx.moveTo(self.pos[0][0],self.pos[0][1]);
		
		for(var i=1; i< self.pos.length;i++){
			
			self.pos[i][0] += (Math.random()*4)-2;
			self.pos[i][1] += (Math.random()*4)-2;
			
			ctx.lineTo(self.pos[i][0],self.pos[i][1]);
		}
		ctx.stroke();
		
		
		//ctx.fillRect(
		//	Math.floor(self.pos[0][0]),
		//	Math.floor(self.pos[0][1]),
		//	Math.floor(self.pos[1][0]),
		//	Math.floor(self.pos[1][1]),
		//);
		
	}

}