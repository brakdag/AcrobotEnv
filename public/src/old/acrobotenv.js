var self
class Acrobotenv{

constructor(){
    this.viewer={width:500,height:500}
	this.frame_rate=15
	this.dt = .2
	this.LINK_LENGTH_1 = 1  
    this.LINK_LENGTH_2 = 1  
    this.LINK_MASS_1 = 1
    this.LINK_MASS_2 = 1
    this.LINK_COM_POS_1 = .5  
    this.LINK_COM_POS_2 = .5  
    this.LINK_MOI = 1  
    this.MAX_VEL_1 = 4 * Math.PI
    this.MAX_VEL_2 = 9 * Math.PI
    this.AVAIL_TORQUE = [-1, 0, 1]
    this.torque_noise_max = 0
    this.book_or_nips = "book"
    //this.action_arrow = None
    //this.domain_fig = None
    this.actions_num = 3
    this.high = [1.0, 1.0, 1.0, 1.0, this.MAX_VEL_1, this.MAX_VEL_2]
    this.low = this.high.map(a=>-a)
    self=this
}

step(a){
    let s = this.state
    let torque = this.AVAIL_TORQUE[a]
    // Add noise to the force action
    torque +=this.torque_noise_max > 0 ? this.runiform(-this.torque_noise_max, this.torque_noise_max):0;
    // Now, augment the state with our force action so it can be passed to
    // _dsdt
    let s_augmented =s.concat([torque])
    console.log(s_augmented)
    let ns = this.rk4( this.dsdt,s_augmented, [0, this.dt])
    ns = ns.pop()
    ns = ns.slice(0,4) // omit action
        // ODEINT IS TOO SLOW!
        // ns_continuous = integrate.odeint(self._dsdt, self.s_continuous, [0, self.dt])
        // self.s_continuous = ns_continuous[-1] # We only care about the state
        // at the ''final timestep'', self.dt
        ns[0] = this.wrap(ns[0], -Math.PI, Math.PI)
        ns[1] = this.wrap(ns[1], -Math.PI, Math.PI)
        ns[2] = this.bound(ns[2], -this.MAX_VEL_1, this.MAX_VEL_1)
        ns[3] = this.bound(ns[3], -this.MAX_VEL_2, this.MAX_VEL_2)
    this.state = ns
    let terminal = this._terminal()
    let reward =terminal?-1:0
    return {observation:this._get_ob(),"reward":reward,"terminal":terminal,info:{}}
}

runiform(low,high){
    return low+Math.random()*(high-low)    
}


reset(){
        this.state = new Array (4)
        this.state.fill(this.runiform(-0.1,0.1))
        return this._get_ob()
}

draw(){

}


_get_ob(){
        let s = this.state
        return [Math.cos(s[0]), Math.sin(s[0]), Math.cos(s[1]), Math.sin(s[1]), s[2], s[3]]
}
_terminal(){
        s = this.state
        return (-Math.cos(s[0]) - Math.cos(s[1] + s[0])) > 1
}


dsdt(s_augmented){
    console.log(self)
    let m1 = self.LINK_MASS_1
    let m2 = self.LINK_MASS_2
    let l1 = self.LINK_LENGTH_1
    let lc1 = self.LINK_COM_POS_1
    let lc2 = self.LINK_COM_POS_2
    let I1 = self.LINK_MOI
    let I2 = self.LINK_MOI
    let g = 9.8
    let a = s_augmented[s_augmented.length-1]
    let s = s_augmented.slice(0,s_augmented.length-2)
    let theta1 = s[0]
    let theta2 = s[1]
    let dtheta1 = s[2]
    let dtheta2 = s[3]
    let d1 = m1 * lc1 ** 2 + m2 * (l1 ** 2 + lc2 ** 2 + 2 * l1 * lc2 * Math.cos(theta2)) + I1 + I2
    let d2 = m2 * (lc2 ** 2 + l1 * lc2 * Math.cos(theta2)) + I2
    let phi2 = m2 * lc2 * g * Math.cos(theta1 + theta2 - Math.PI / 2.)
    let phi1 = - m2 * l1 * lc2 * dtheta2 ** 2 * Math.sin(theta2) - 2 * m2 * l1 * lc2 * dtheta2 * dtheta1 * Math.sin(theta2)  + (m1 * lc1 + m2 * l1) * g * Math.cos(theta1 - Math.PI / 2) + phi2
    var ddtheta2
    if (self.book_or_nips == "nips"){
            // the following line is consistent with the description in the paper
             ddtheta2 = (a + d2 / d1 * phi1 - phi2) / (m2 * lc2 ** 2 + I2 - d2 ** 2 / d1)
        }
    else{
            // the following line is consistent with the java implementation and the book
             ddtheta2 = (a + d2 / d1 * phi1 - m2 * l1 * lc2 * dtheta1 ** 2 * Math.sin(theta2) - phi2) / (m2 * lc2 ** 2 + I2 - d2 ** 2 / d1)
    }
    let ddtheta1 = -(d2 * ddtheta2 + phi1) / d1
    return [dtheta1, dtheta2, ddtheta1, ddtheta2, 0.]
}

rk4(derivs, y0, t){
 /*
    Integrate 1D or ND system of ODEs using 4-th order Runge-Kutta.
    This is a toy implementation which may be useful if you find
    yourself stranded on a system w/o scipy.  Otherwise use
    :func:`scipy.integrate`.

    Args:
        derivs: the derivative of the system and has the signature ``dy = derivs(yi, ti)``
        y0: initial state vector
        t: sample times
        args: additional arguments passed to the derivative function
        kwargs: additional keyword arguments passed to the derivative function

    Example 1 ::
        ## 2D system
        def derivs6(x,t):
            d1 =  x[0] + 2*x[1]
            d2 =  -3*x[0] + 4*x[1]
            return (d1, d2)
        dt = 0.0005
        t = arange(0.0, 2.0, dt)
        y0 = (1,2)
        yout = rk4(derivs6, y0, t)
    Example 2::
        ## 1D system
        alpha = 2
        def derivs(x,t):
            return -alpha*x + exp(-t)
        y0 = 1
        yout = rk4(derivs, y0, t)
    If you have access to scipy, you should probably be using the
    scipy.integrate tools rather than this function.

    Returns:
        yout: Runge-Kutta approximation of the ODE
    */
    let yout=[]
    yout[0] = y0


    for( let i=0;i<t.length;i++){

        let thist = t[i]
        let dt = t[i + 1] - thist
        let dt2 = dt / 2.0
        y0 = yout[i]

        let k1 = derivs(y0, thist)
        let k2 = derivs(y0 + dt2 * k1, thist + dt2)
        let k3 = derivs(y0 + dt2 * k2, thist + dt2)
        let k4 = derivs(y0 + dt * k3, thist + dt)

        yout[i + 1] = y0 + dt / 6.0 * (k1 + 2 * k2 + 2 * k3 + k4)
    }
    return yout
}



draw(){
    let s = this.state
    let bound = this.LINK_LENGTH_1 + this.LINK_LENGTH_2 + 0.2  // 2.2 for default
            //self.viewer.set_bounds(-bound,bound,-bound,bound)
    let p1 = [-this.LINK_LENGTH_1 * Math.cos(s[0]), this.LINK_LENGTH_1 * Math.sin(s[0])]
    let p2 = [p1[0] - this.LINK_LENGTH_2 * Math.cos(s[0] + s[1]),p1[1] + this.LINK_LENGTH_2 * Math.sin(s[0] + s[1])]
    //xys = np.array([[0,0], p1, p2])[:,::-1]
    let thetas = [s[0]- Math.PI/2, s[0]+s[1]-Math.PI/2]
    let link_lengths = [this.LINK_LENGTH_1, this.LINK_LENGTH_2]
    line(-2.2, 1, 2.2, 1)
    
}

wrap(x, m, M){
    /*Wraps ``x`` so m <= x <= M; but unlike ``bound()`` which
    truncates, ``wrap()`` wraps x around the coordinate system defined by m,M.\n
    For example, m = -180, M = 180 (degrees), x = 360 --> returns 0.

    Args:
        x: a scalar
        m: minimum possible value in range
        M: maximum possible value in range

    Returns:
        x: a scalar, wrapped
    */
    let diff = M - m
    while (x > M){
        x = x - diff
    }
    while (x < m){
        x = x + diff
    }
    return x
}

bound(x, m, M){
    /*Either have m as scalar, so bound(x,m,M) which returns m <= x <= M *OR*
    have m as length 2 vector, bound(x,m, <IGNORED>) returns m[0] <= x <= m[1].

    Args:
        x: scalar

    Returns:
        x: scalar, bound between min (m) and Max (M)
    */

    if (typeof(M)=="undefined"){
        M = m[1]
        m = m[0]
    }
    // bound x between min (m) and Max (M)
    return Math.min(Math.max(x, m), M)
}

}

