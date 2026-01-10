var controlLoop = []
var timeInterval = 1
var timescore = 0;
var keys = {};
var shakeX = 0;
var shakeY = 0;

const clockTick = new Event('clockTick');
Date.prototype.currentTime = function(){ };
function shake(mx, my){
	for(let i = 0; i < mx; i++){
		setTimeout(()=>{shakeX = (i%2 - 0.5)*i}, i*-10 + mx*10);
	};
	
	for(let i = 0; i < my; i++){
		setTimeout(()=>{shakeY = (i%2 - 0.5)*i}, i*-10 + my*10);
	};
};
class Program{
	constructor(a){
		this.a = a
		if(a = 1){
			this.shield = {};
			this.shield.sprite = document.getElementById("game1s1");
			this.shield.x = 200;
			this.shield.xv = 1;
			
			
		};
		if(a = 2){
			this.sun = {};
			this.halo = {};
			this.sun.sprite = document.getElementById("game1s2");
			this.halo.sprite = document.getElementById("game1s3");
			this.sun.sprites = [
			'sun0000.png',
			'sun0001.png',
			'sun0002.png',
			'sun0003.png'
			]
			this.halo.sprites = [
			'halo0000.png',
			'halo0001.png',
			'halo0002.png',
			'halo0003.png'
			]
			this.sun.x = 200;
			this.sun.xv = 0;
			this.sun.y = 10;
			this.sun.yv = 4;
			
			
		};
		this.audio = new Audio('bell.wav');
	};
	loop(){
		if(this.a=1){
			this.shield.sprite.position = "relative";
			$(this.shield.sprite).offset({ left: this.shield.x + shakeX, top: 1780 + shakeY });
			
			if((this.shield.x<120)){
				this.shield.x-=(this.shield.xv*timeInterval - 1)
			};
			if((this.shield.x>500)){
				this.shield.x-=(this.shield.xv*timeInterval + 1)
			};
			this.shield.x+=this.shield.xv*timeInterval
			this.shield.xv = this.shield.xv*0.8;
			if(keys[68]){
					this.shield.xv +=1
			};
			if(keys[65]){
				this.shield.xv -=1
			}
		};
		
		
		
		if(this.a=2){
			this.sun.sprite.position = "relative";
			this.halo.sprite.position = "relative";
			this.sun.sprite.src = this.sun.sprites[Math.floor(((timescore/5)%4))];
			this.halo.sprite.src = this.halo.sprites[Math.floor(((timescore/2)%4))];
			this.sun.sprite.style.zIndex = "30"
			this.halo.sprite.style.zIndex = "29"
			console.log(timescore);
			$(this.sun.sprite).offset({ left: this.sun.x+ shakeX, top: 1780 - this.sun.y+ shakeY });
			$(this.halo.sprite).offset({ left: this.sun.x-20+ shakeX, top: 1780-20-this.sun.y+ shakeY });
			
			if((this.sun.x<120)){
				this.sun.xv = this.sun.xv*-1
			};
			if((this.sun.x>630)){
				this.sun.xv =(this.sun.xv*-1)
			};
			
			if((this.sun.y<0)){
				this.sun.yv = this.sun.yv*-1
			};
			if((this.sun.y>450)){
				this.sun.yv =(this.sun.yv*-1)
			};
			if((this.sun.y<80)&&((Math.abs(this.sun.x - controlLoop[0].shield.x)<100)&&(this.sun.yv<0))){
				shake(Math.abs(this.sun.xv - controlLoop[0].shield.xv)  ,Math.abs(this.sun.yv*4));
				this.sun.xv = 0.5*(controlLoop[0].shield.xv + this.sun.xv) * 1
				this.sun.yv = this.sun.yv*-1
				this.audio.play();
			};
			this.sun.y+=this.sun.yv*timeInterval
			this.sun.x+=this.sun.xv*timeInterval
		};
	};
};
function run(a){
	controlLoop.push(new Program(a))
	var audio = new Audio('bell.wav');
	audio.play();
};
function stop(a){
	controlLoop.splice(a,1);
};

var lastTime;
function fireClock(){
	document.dispatchEvent(clockTick);
	if(!lastTime){lastTime = Date.now};
	for (const object in controlLoop) {
        if (controlLoop[object]) {
            controlLoop[object].loop()
        }
	}
	if(!!(Date.now() - lastTime)){timeInterval = (Date.now() - lastTime)/10};
	timescore += timeInterval;
	lastTime = Date.now();
	console.log(keys);
}
setInterval(fireClock, 10);