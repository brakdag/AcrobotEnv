# AcrobotEnv
port of AcrobotEnv in openai environment in gym python to javascript


## Mensaje del editor Spanish.

El objetivo principal de este proyecto es imitar el código compartido por openai,escrito para
python pero utilizando las herramientas que tenemos en javascript. 


## Traducción de texto al español.

Acrobot es un pendulo de 2 barras, con sólo la segunda junta motorizada. 
Inicialmente, ambas barras apuntan hacia abajo. El objetivo es moverlo
a una altura al menos el largo de uno de las barras sobre la base.

Ambas barras puede moverse libremente y pueden pasar una sobre la otra, o sea que no colisinan cuando
tienen el mismo ángulo.

ESTADO:
El estado consiste en el seno y conseno de los dos angulos y las velocidades angulares.

 [cos(theta1) sin(theta1) cos(theta2) sin(theta2) thetaDot1 thetaDot2].

Para la primera barra, una ángulo de 0 corresponde cuando la barra está para abajo.
El ángulo de la segunda barra es relativa al angulo de la primera barra.
El ángulo 0 corresponde cuando se tiene el mismo ángulo de la primera barra. 
Un estado [1, 0, 1, 0, ..., ...] significa que ambas barras estan mirando hacia abajo.

ACCIONES:

La acciones es aplicar torque de +1, 0 or -1 sobre la junta entre las dos barras del pendulo.



    """
    Acrobot is a 2-link pendulum with only the second joint actuated.
    Initially, both links point downwards. The goal is to swing the
    end-effector at a height at least the length of one link above the base.
    Both links can swing freely and can pass by each other, i.e., they don't
    collide when they have the same angle.
    **STATE:**
    The state consists of the sin() and cos() of the two rotational joint
    angles and the joint angular velocities :
    [cos(theta1) sin(theta1) cos(theta2) sin(theta2) thetaDot1 thetaDot2].
    For the first link, an angle of 0 corresponds to the link pointing downwards.
    The angle of the second link is relative to the angle of the first link.
    An angle of 0 corresponds to having the same angle between the two links.
    A state of [1, 0, 1, 0, ..., ...] means that both links point downwards.
    **ACTIONS:**
    The action is either applying +1, 0 or -1 torque on the joint between
    the two pendulum links.
    .. note::
        The dynamics equations were missing some terms in the NIPS paper which
        are present in the book. R. Sutton confirmed in personal correspondence
        that the experimental results shown in the paper and the book were
        generated with the equations shown in the book.
        However, there is the option to run the domain with the paper equations
        by setting book_or_nips = 'nips'
    **REFERENCE:**
    .. seealso::
        R. Sutton: Generalization in Reinforcement Learning:
        Successful Examples Using Sparse Coarse Coding (NIPS 1996)
    .. seealso::
        R. Sutton and A. G. Barto:
        Reinforcement learning: An introduction.
        Cambridge: MIT press, 1998.
    .. warning::
        This version of the domain uses the Runge-Kutta method for integrating
        the system dynamics and is more realistic, but also considerably harder
        than the original version which employs Euler integration,
        see the AcrobotLegacy class.
    """
