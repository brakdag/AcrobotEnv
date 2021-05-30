
class Menu{
	constructor(env){
		this.menu={"MENU" : 27, "TRAINING" : 87, "MANUAL" : 77, "ELITE" : 84, "FAST" : 70}
		this.env=env
		this.status=this.menu.MENU;
		
		this.change=true;
	}
	evaluate(key){
		this.status=key;
	}
	draw(env){
		switch(this.status){
			case this.menu.MANUAL: this.manual();break;
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
		let action=0
		if(keyIsDown(RIGHT_ARROW))action=-1
		if(keyIsDown(LEFT_ARROW))action=1
		clear();
		let resp=this.env.step(action)
		fill(20)
		textSize(12)
		text(`${resp.observation.map(a=>a.toFixed(2))}`,10,10)
		text(`Frames:${frameRate()}Reward:${resp.reward},Terminal:${resp.terminal}`,10,30)
		fill(255)
		this.env.draw()
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


	env_test(){
		console.time("prueba")
			for(let i=0;i<1000;i++){
			let resp=env.step(Math.trunc(Math.random()*3-1))
			}
		console.timeEnd("prueba")
	}

}


