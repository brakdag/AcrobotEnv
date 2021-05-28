
var Engine = Matter.Engine
var Bodies = Matter.Bodies
var Composite = Matter.Composite;
var Runner = Matter.Runner
var Body = Matter.Body;
var engine
var pendulum
var runner
function preload(){
	//fuente = loadFont("./assets/VCR_OSD_MONO.ttf")
}

function setup() {
	engine = Engine.create(); 
	runner = Runner.create()
	var canvas =createCanvas(500, 500);	
	frameRate(30)
	 pendulum=new Pendulum(250,250,20)
	 console.log(pendulum)
	Runner.run(runner,engine)
}

function draw(){
	clear();
	fill(0)
	textSize(20)
	let x=pendulum.tangente().x
	let y=pendulum.tangente().y
	text(x.toString(),10,10)
	text(y.toString(),10,30)
	let power=0.004
if(keyIsDown(RIGHT_ARROW)) {
	pendulum.body.force.y=-power*x
	pendulum.body.force.x=-power*y

}
if(keyIsDown(LEFT_ARROW)){
	pendulum.body.force.y=power*x
	pendulum.body.force.x=power*y
} 
	//Engine.update(engine)
	fill(100)
	pendulum.draw()
	//console.log(boxA)
}


	