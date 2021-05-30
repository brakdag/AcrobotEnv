/*
Long pendulum calc.
Original size =1
from bounds
Scale = 500/4.4=113.63
used 114
*/
class Pendulum{
constructor(x,y){
		
			this.Body = Matter.Body;
			this.engine = Matter.Engine.create(); 
			this.runner = Matter.Runner.create()
			this.engine.timing.timeScale = 1;
			this.state=[0,0]
			this.x=x
			this.y= y
			this.width=20
			this.height=120
			let options={mass:1,stiffness:1,frictionAir:0}
			this.body=Matter.Bodies.rectangle(x, y, this.width,this.height,options)
			this.body2=Matter.Bodies.rectangle(x, y-this.height, this.width,this.height,options)
			this.body.collisionFilter = {'group': -1,'category': 2,'mask': 0};
			this.mConstraint=Matter.Constraint.create({
				bodyB:this.body,
				pointB:{x:0,y:-59}, 
				pointA:{x:x,y:y},
				length:0,stiffness:1
			});
			
			this.mConstraint2=Matter.Constraint.create({
				bodyA:this.body,
				bodyB:this.body2,
				pointB:{x:0,y:-59},
				pointA:{x:0,y:+59},
				length:0,stiffness:1
			})
			
			Matter.Composite.add(this.engine.world, [this.body,this.mConstraint,this.body2,this.mConstraint2]);
}


draw(){
			fill(color(0,255*.8, 255*.8))
			beginShape();for(var a of this.body.vertices)vertex(a.x,a.y);endShape(CLOSE)
			beginShape();for(var a of this.body2.vertices)vertex(a.x,a.y);endShape(CLOSE)
			fill(color(.8*255,.8*255, 0))
			circle((this.body2.vertices[0].x+this.body2.vertices[1].x+this.body.vertices[2].x+this.body.vertices[3].x)/4,(this.body2.vertices[0].y+this.body2.vertices[1].y+this.body.vertices[2].y+this.body.vertices[3].y)/4,20)
			line(0,120,500,120)
}

step(a){
			Matter.Engine.update(this.engine,66) //15 FPS en el proyecto original.
			this.state=[this.body.angle,this.body2.angle-this.body.angle]
			switch(a){
				case -1:
					Matter.Body.applyForce(this.body2,{x:0,y:49},{x:-0.0005,y:0});break;
				case 1:
					Matter.Body.applyForce(this.body2,{x:0,y:49},{x:0.0005,y:0});break;
			}
			let terminal = this._terminal()
		    let reward =terminal?0:-1
		    return {observation:this._get_ob(),"reward":reward,"terminal":terminal,info:{}}
}

_get_ob(){
		let theta1=this.state[0]
		let theta2=this.state[1]
	return [cos(theta1),sin(theta1),cos(theta2),sin(theta2),this.body.angularSpeed,this.body2.angularSpeed]
}
_terminal(){
        let s = this.state
        return (-Math.cos(s[0]) - Math.cos(s[1] + s[0])) > 1
}

		getPos(){
			let xmean=(this.body2.vertices[3].x+this.body2.vertices[2].x)/2
			let ymean=(this.body2.vertices[3].y+this.body2.vertices[2].y)/2
			return {x:xmean,y:ymean}
}

}