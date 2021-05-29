class Pendulum{
		constructor(x,y){
			this.x=x
			this.y= y
			this.width=20
			this.height=240
			var options={mass:2,
					stiffness:1,
					frictionAir:0
			
			}
			this.body=Bodies.rectangle(x, y, this.width,this.height,options)
			this.body2=Bodies.rectangle(x, y-height, this.width,this.height,options)
			this.body.collisionFilter = {'group': -1,'category': 2,'mask': 0};
			this.mConstraint=Matter.Constraint.create({
				bodyB:this.body,
				pointB:{x:0,y:-120}, 
				pointA:{x:x,y:y},
				length:0,
				stiffness:1
			})
			
			this.mConstraint2=Matter.Constraint.create({
				bodyA:this.body,
				bodyB:this.body2,
				pointB:{x:0,y:-120},
				length:0,
				stiffness:1
			})
			
			Composite.add(engine.world, [this.body,this.mConstraint,this.body2,this.mConstraint2]);
		}

		draw(){
			strokeWeight(20); 
			point(this.x,this.y)
			point(this.body.position.x,this.body.position.y)
			point(this.body2.position.x,this.body2.position.y)
			strokeWeight(8); 
			line(this.body.position.x,this.body.position.y,this.x,this.y)
			line(this.body.position.x,this.body.position.y,this.body2.position.x,this.body2.position.y)
			}

		action(a){
			switch(a){
				case 0:
					Body.applyForce(this.body2,{x:0,y:80},{x:-0.005,y:0}); break;
				case 2:
					Body.applyForce(this.body2,{x:0,y:80},{x:0.005,y:0}); break;
						
			}
		}

		getPos(){
			return {x:this.body2.position.x,y:this.body2.position.y}
		}

}