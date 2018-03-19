# -*- coding: cp1252 -*-from __future__ import divisionfrom visual import *from visual.graph import *scene.width=600scene.height = 760##constants and datag = 9.8         #m/s^2mball = 1 # change this to the mass (in kg) from your experiment.L0 = 0.26       # relaxed length of your spring in metersks = 40  # change this to the spring stiffness you measured (in N/m)amp = 0.1      # amplitude of oscillation measured in myeq =-L0-mball*g/ks # equilibrium position of the spring in m## objectsceiling = box(pos=(0,0,0), size = (0.2, 0.01, 0.2))ball = sphere(pos=(.25,yeq-amp,.25), radius=0.025, color=color.orange)spring = helix(pos=ceiling.pos, axis=ball.pos-ceiling.pos, color=color.cyan, thickness=.003, coils=40, radius=0.015) ball.trail = curve(color=ball.color)##graphsgdisplay(xtitle='Seconds', ytitle='Meters', x=600, y=0,width=600, height=300)ygraph = gcurve(color=color.yellow)## initial valuesball.m=mball #Do NOT change this value, change the variable mballball.v = vector(0,0,.5)ball.p = ball.m*ball.v## improve the displayscene.autoscale = 0          ## don't let camera zoom in and out as ball movesscene.center = vector(0,yeq,0)   ## move camera to the equilibrium position#Simulation Parametersdelta_t = .01t = 0           simtime=10  while t < simtime:    rate(100)    #Forces    Fgrav = vector(0,-g*ball.m,0)    ## calculate spring�s L_vector    L = ball.pos-ceiling.pos    Lmag = mag(L)    Lhat = L/Lmag    ## calculate force of spring on the ball    stretch = Lmag-L0    F_bspring = -ks*stretch*Lhat    #Net Force    Fnet = Fgrav+F_bspring    #Momentum Update    delta_p = Fnet*delta_t    ball.p = ball.p + delta_p    ##add data points to ygraph    ygraph.plot(pos=(t, ball.pos.y))    #add points to ball trail    ball.trail.append(pos=ball.pos)    #Position Update    delta_r = ball.p/ball.m*delta_t    ball.pos = ball.pos + delta_r    spring.axis = ball.pos - ceiling.pos        t = t + delta_t