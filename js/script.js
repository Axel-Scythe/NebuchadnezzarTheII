var canvas = document.getElementById('can');
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 50;

var x = canvas.width / 2;
var y = canvas.height / 2;

var musicPlay = false;
var isFinished = false;

var audio = document.getElementById('music');

var fail = false;
var failText = 'THOU HAST FAILED';
var failTextSize = 0;

var generate = true;
var peopleX = 0;
var peopleY = 0;
var hX = 30;
var hY = 30;
var hDX = 0;
var hDY = 0;
var r = 150;
var g = 150;
var b = 255;

var first = true;
var count = 0;

var furnaceX = 10;
var furnaceY = 40;
var furnaceW = 100;

var totalScore = 0;

var text = 'Score: ';
var totalString = '';
var collectedString = '';
var final = '';

var collected = 0;

var disX = x - peopleX;
var disY = y - peopleY;
var distance = Math.sqrt(disX * disX + disY * disY);

var heysoosDisX = x - hX;
var heysoosDisY = y - hY;
var heysoosDistance = Math.sqrt(heysoosDisX * heysoosDisX + heysoosDisY * heysoosDisY);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

var dx = 0;
var dy = 0;

var nebuchadnezzarR = 10;
var heysoosR = 10;
var peopleR = 5;

var started = false;

function nebuchadnezzar(){
	ctx.beginPath();
	ctx.arc(x, y, nebuchadnezzarR, 0, Math.PI*2);
	ctx.fillStyle = 'rgb(255, 228, 77)';
	ctx.fill();
	ctx.closePath();

	if(rightPressed) {
    	dx = 2;
	}else if(leftPressed) {
    	dx = -2;
	}else{
		dx = 0;
	}
	if(downPressed) {
    	dy = 2;
	}else if(upPressed) {
    	dy = -2;
	}else{
		dy = 0;
	}

	if(x + dx > canvas.width - nebuchadnezzarR || x + dx < nebuchadnezzarR) {
	    dx = 0;
	}
	if(y + dy > canvas.height - nebuchadnezzarR || y + dy < nebuchadnezzarR) {
		dy = 0;
	}

	x += dx;
	y += dy;
}

function heysoos(){
	if(count < 1000){
		count++;
	}else{
		hDX = Math.random() * (-2 - 2) + 2;
		hDY = Math.random() * (-2 - 2) + 2;
		for(var i = 0; i < 15; i++){
		if(hX + hDX > canvas.width - heysoosR || hX + hDX < heysoosR) {
	    hDX = 0;
		}
		if(hY + hDY > canvas.height - heysoosR || hY + hDY < heysoosR) {
		hDY = 0;
		}
		hX += hDX;
		hY += hDY;
		ctx.beginPath();
		ctx.arc(hX, hY, 10, 0, Math.PI * 2);
		ctx.fillStyle = 'rgb(150, 255, 255';
		ctx.fill();
		ctx.closePath();
		}
	}
}

function people(){
	if(generate === true){
		if(!first){
		collected++;
		}
		first = false;
		r = (Math.floor(Math.random() * 255));
		g = (Math.floor(Math.random() * 255));
		b = (Math.floor(Math.random() * 255));
		peopleX = (Math.floor(Math.random() * (canvas.width - (furnaceX + furnaceW)) + (furnaceX + furnaceW)));
		peopleY = (Math.floor(Math.random() * (canvas.height - (furnaceY + furnaceW)) + (furnaceY + furnaceW)));
		generate = false;
	}
	ctx.beginPath();
	ctx.arc(peopleX, peopleY, peopleR, 0, Math.PI * 2);
	ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	ctx.fill();
	ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(2255, 255, 255)';
    ctx.stroke();
	ctx.closePath();
	
}

function detect(){
	disX = x - peopleX;
	disY = y - peopleY;
	distance = Math.sqrt(disX * disX + disY * disY);
	if(distance < nebuchadnezzarR + peopleR) {
		generate = true;
	}
	heysoosDisX = x - hX;
	heysoosDisY = y - hY;
	heysoosDistance = Math.sqrt(heysoosDisX * heysoosDisX + heysoosDisY * heysoosDisY);
	if(heysoosDistance < nebuchadnezzarR + heysoosR) {
		fail = true;
	}
}

function score(){
	ctx.fillStyle = 'rgb(150,150,150)';
	ctx.font = '50px Comic Sans MS';
	totalString = totalScore;
	collectedString = collected;
	final = text.concat(totalString);
	textSize = ctx.measureText(final);
	collectedSize = ctx.measureText(collected);
	ctx.fillText(final, (canvas.width/2) - (textSize.width/2), canvas.height);
	ctx.fillText(collectedString, (canvas.width/2), 45);
}

function furnace(){
	ctx.fillStyle = 'rgb(100,100,100)';
	ctx.fillRect(furnaceX, furnaceY, furnaceW, furnaceW);
	ctx.fillRect((furnaceW/4) + furnaceX, furnaceY, furnaceW/2, -furnaceY);
	ctx.fillStyle = 'rgb(175,100,50)';
	ctx.arc(60, 90, 50, 0, Math.PI * 2);
	ctx.fill();
	if(x < (furnaceW+furnaceX) && y < (furnaceW + furnaceY)){
		totalScore+= Math.floor(collected/3);
		collected = collected%3;
	}
}

function failed(){
	ctx.fillStyle = 'rgb(255, 50, 50)';
	ctx.font = '50px Comic Sans MS';
	failTextSize = ctx.measureText(failText);
	ctx.fillText(failText, (canvas.width / 2) - (failTextSize.width / 2), (canvas.height / 2));
	failTextSize = ctx.measureText('Pressth Space to Retry Again');
	ctx.fillText('Pressth Space to Retry Again', canvas.width / 2 - failTextSize.width / 2, canvas.height / 2 + 100)
	audio.pause();
	audio.currentTime = 0;
	musicPlay = true;
	if(spacePressed){
		//first = true;
		count = 0;
		totalScore = 0;
		collected = 0;
		x = canvas.width / 2;
		y = canvas.height / 2;
		hX = heysoosR;
		hY = heysoosR;
		fail = false;
	}
}

function checkStart(){
	if(!started){
		ctx.fillStyle = '#ffffff';
		ctx.font = '50px Comic Sans MS';
		var size = ctx.measureText('Press Space To Start');
		ctx.fillText('Press Space To Start', canvas.width / 2 - size.width / 2, canvas.height / 2 + 10);
	}
	if(spacePressed){
	started = true;
	musicPlay = true;
	}
}

function finished(){
	if(audio.currentTime >= audio.duration){
		isFinished = true;
		var string = "Your score is " + totalScore;
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		var size = ctx.measureText(string);
		ctx.font = '75px Comic Sans MS';
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText(string, canvas.width/2 - size.width/2, canvas.height/2 + 10);
	}

}

function draw(){
	ctx.canvas.width = window.innerWidth - 50;
	if(!started){
		checkStart();
	}
	if(!isFinished){
		if(started){
			if(musicPlay){			
				audio.play();
				musicPlay = false;
			}
			if(!fail){
				ctx.clearRect(0, 0, canvas.width, 320);
				furnace();
				people();
				detect();
				nebuchadnezzar();
				heysoos();
				score();
				finished();
			}
			if(fail){
				failed();
			}
		}
	}
	if(isFinished){
		finished();
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//rA = 39, lA = 37, uA = 38, dA = 40
//a = 65, d = 68, s = 83, w = 87
//SPACE = 32

function keyDownHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
	if(e.keyCode == 38 || e.keyCode == 87){
		upPressed = true;
    }else if(e.keyCode == 40 || e.keyCode == 83){
		downPressed = true;
	}
	if(e.keyCode == 32){
		spacePressed = true;
	}

	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
    if(e.keyCode == 38 || e.keyCode == 87){
    	upPressed = false;
    }else if(e.keyCode == 40 || e.keyCode == 83){
    	downPressed = false;
    }
    if(e.keyCode == 32){
    	spacePressed = false;
    }
}

setInterval(draw, 10);