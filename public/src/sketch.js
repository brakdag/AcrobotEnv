var pendulum

function setup(){
	
	var canvas =createCanvas(500, 500);	
	//var render = Render.create({element: document.body,engine: engine});
	frameRate(15)
	pendulum=new Pendulum(250,250)
	 
}

function draw(){
	let action=0	
	if(keyIsDown(RIGHT_ARROW))action=-1
	if(keyIsDown(LEFT_ARROW))action=1
	clear();
	resp=pendulum.step(action)
	fill(20)
	text(`${resp.observation.map(a=>a.toFixed(2))}`,10,10)
	text(`Reward:${resp.reward},Terminal:${resp.terminal}`,10,30)
	fill(255)
	pendulum.draw()
	//console.log(boxA)
}


	