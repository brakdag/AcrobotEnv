
var Engine = Matter.Engine
var Bodies = Matter.Bodies
var Composite = Matter.Composite;
var Runner = Matter.Runner
var Body = Matter.Body;
var engine
var pendulum
var runner
var points=[]
function preload(){
	//fuente = loadFont("./assets/VCR_OSD_MONO.ttf")
}

function setup() {
	engine = Engine.create(); 
	runner = Runner.create()
	var canvas =createCanvas(500, 500);	
	frameRate(30)
	 pendulum=new Pendulum(250,250)
	 console.log(pendulum)
	Runner.run(runner,engine)
}

function draw(){
	if(points.length>100) points.shift()
	clear();
	push()
	for(o of points){
		strokeWeight(2)
		stroke('purple')
		point(o.x,o.y)
	}
	pop()
	if(frameCount%1==0) points.push(pendulum.getPos())

	if(keyIsDown(RIGHT_ARROW))pendulum.action(0)
	if(keyIsDown(LEFT_ARROW))pendulum.action(2)
	fill(255)
	pendulum.draw()
	//console.log(boxA)
}


	