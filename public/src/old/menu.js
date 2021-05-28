
class Menu{
	constructor(initial_state){
		this.menu={"MENU" : 27, "TRAINING" : 87, "MANUAL" : 77, "ELITE" : 84, "FAST" : 70}
		this.status=this.menu.MENU
		this.change=true;
	}
	evaluate(key){
		this.status=key;
	}
	draw(env){
		switch(this.status){
			case this.menu.MANUAL: this.manual(env);break;
			case this.menu.TRAINING: this.training(env);break;
			case this.menu.ELITE: this.elite(env);break;
			case LEFT_ARROW: this.manual(env);break;
			case RIGHT_ARROW: this.manual(env);break;
			case this.menu.MENU: this.fnmenu();break;
		}
	}
	fnmenu(){
		 this.change= this.change?false:this.change
		 fill(10);
		 textSize(50)
		 text("ACROBOT ENV",80,80)
		 textSize(25)
		 text("[M] MANUAL MODE.",50,150)
		 text("[T] ELITE TEST.",50,180)
		 text("[W] SIMULATION.",50,210)
		 text("[ESC] RETURN THIS MENU.",50,240)
		 text("[F] FAST TRAINING",50,270)
		 	 
	}
	manual(env){
		 fill(10);
		 textSize(20)
		 text("Press [LEFT] OR [RIGHT] KEY TO MOVE.",10,20)
		let x=1
		if (keyIsDown(LEFT_ARROW)) {x = 1;}
		if (keyIsDown(RIGHT_ARROW)) { x = 2;}
		let resp = sim.manualenv.step(x)
		if (resp.done==1) sim.manualenv.reset();
		sim.manualenv.draw()	
	}
	training(env){
		let resp=sim.step(env,obs)
		obs=resp.state
		env.draw()
		sim.draw()
	}
	elite(env){
		let resp=sim.step(env,obs)
		obs=resp.state
		env.draw()
		sim.draw()
	}

	fast(env){
		
	}
}


