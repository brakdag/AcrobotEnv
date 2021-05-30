var mn;
var fuente;


function preload(){
	fuente =loadFont("assets/VCR_OSD_MONO.ttf")	
}

function setup(){
	createCanvas(500, 500);	
	textFont(fuente)
	frameRate(15)
	let pendulum = new Pendulum(250,250);	
	mn = new Menu(pendulum);
}

function draw(){
	mn.draw()
}


function keyPressed(){
	mn.evaluate(keyCode)
}
	
