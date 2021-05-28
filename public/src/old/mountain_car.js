class Mountain_car{
	constructor(){
		this.viewer={width:640,height:480}
		this.frame_rate=30
		this.min_position = -1.2
        this.max_position = 0.6
        this.max_speed = 0.07
        this.goal_position = 0.5
        this.goal_velocity = 0
        this.force = 0.001
        this.gravity = 0.0025
        this.last_u
	}

	step(action){
		this.last_u=action
		let position = this.state[0]
        let velocity = this.state[1]
	    velocity += (action - 1) * this.force + Math.cos(3 * position) * (-this.gravity)
        velocity = this.clip(velocity, -this.max_speed, this.max_speed)
        position += velocity
        position = this.clip(position, this.min_position, this.max_position)
 	 	if (position == this.min_position && velocity < 0) velocity = 0
		let done = (position >= this.goal_position) && (velocity >= this.goal_velocity)
        this.step_count++
        done=this.step_count>2000?1:done
        let reward = -1.0
        this.state = [position, velocity]
        return {"state":this.state,"reward":reward,"done":done}
	}


	_height(xs){
        return Math.sin(3 * xs) * .45 + .55
	}

	reset(){
		this.step_count=0
		this.state=[-0.6+Math.random()*0.2,0]
		return this.state
	}
	draw(){
		let screen_width = 600
        let screen_height = 400
		let world_width = this.max_position - this.min_position
        let scale = screen_width / world_width
        let carwidth = 40
        let carheight = 20
        let xs = this.linspace(this.min_position,this.max_position,100)
        let ys = xs.map(a=>this._height(a))
        //path
        strokeWeight(4.0);
        beginShape();
        for(let i in xs){vertex((xs[i]- this.min_position)*scale, screen_height-ys[i]*scale);}
		endShape(POINTS);
		//flag
		let flagx = (this.goal_position-this.min_position) * scale
        let flagy1 = screen_height-this._height(this.goal_position) * scale
        let flagy2 = flagy1 - 50
        strokeWeight(1.0)
        line(flagx, flagy1, flagx, flagy2)
        strokeWeight(0.0)
        fill("rgb(80%,80%,0%)")
        beginShape();
        	vertex(flagx, flagy2+10);vertex(flagx, flagy2);vertex(flagx + 25, flagy2 + 5)
        endShape(CLOSE);
		
		noFill()		   
		let clearance = 10
		let l = carwidth / 2
		let r = -carwidth / 2
 		let t = -carheight
		let b = 0
		
		let pos = this.state[0]
		translate(0,-clearance)
		translate((pos-this.min_position) * scale, screen_height-this._height(pos) * scale)
		rotate(-Math.cos(3 * pos))
		fill(51)
		beginShape();
		vertex(l,b);
		vertex(l,t);
		vertex(r,t);
		vertex(t,b);
    	endShape(CLOSE);
    	fill("rgb(50%,50%,50%)")
    	circle(carwidth / 4,clearance/2-4,carheight/1.25)
		circle(-carwidth / 4,clearance/2-4,carheight/1.25)
		noFill()


    	 

	}
	clip(x,min,max){
		return x<min?min:x>max?max:x
	}
	linspace(min,max,count){
		let dt = (max-min)/(count-1)
		let result = new Array(count)
		result=result.fill(0)
		result=result.map((a,i)=>min+dt*i)
		return result
	}

}