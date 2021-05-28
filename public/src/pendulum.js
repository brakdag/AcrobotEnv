class Pendulum{
	constructor(x,y,r){
	this.r=r
	this.x=x
	this.y=y
	var options={
		mass:2,
		frictionAir:0
	}
	this.body = Bodies.circle(x, y+100, r,options);
	this.body2 = Bodies.circle(x, y+200, r,options);
	
	this.mConstraint=Matter.Constraint.create({
		bodyB:this.body, 
		pointA:{x:x,y:y},
		length:100,
		stiffness:1
	})

	this.mConstraint2=Matter.Constraint.create({
		bodyA:this.body, 
		bodyB:this.body2,
		length:100,
		stiffness:1,
	})


	Composite.add(engine.world, [this.body,this.mConstraint,this.body2,this.mConstraint2]);
	}

	draw(){
	rectMode(CENTER)
	line(this.body.position.x,this.body.position.y,this.x,this.y)
	line(this.body.position.x,this.body.position.y,this.body2.position.x,this.body2.position.y)
	//line(this.body.position.x,this.body.position.y,this.body.position.x+this.tangente().y*100,this.body.position.y+this.tangente().x*100)
	fill(200)
	circle(this.body.position.x,this.body.position.y,this.r)
	circle(this.body2.position.x,this.body2.position.y,this.r)
	}

	tangente(){
		let z = Math.sqrt((this.body.position.y-this.y)**2+(this.body.position.x-this.x)**2)
		let dy = (this.body.position.y-this.y)/z
		let dx = (this.body.position.x-this.x)/z
		let x = +dy
		let y = -dx
		return {x:dx,y:-dy}
	}


	angulo(){
		

	}
}