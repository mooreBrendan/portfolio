from __future__ import division
from visual import *
from visual.graph import *

#Objects in Simulation
Earth=sphere(pos=vector(0,0,0), radius=6.4e6, color=color.cyan, material=materials.earth) #materials.earth makes sphere look like a little Earth
craft=sphere(pos=vector(-10*Earth.radius,0,0), radius=1e6, color=color.yellow)
#Moon=sphere(pos=vector(4e8,0,0), radius=1.75e6, color=color.white)
trail=curve(color=craft.color) ##creates a trail behind the craft

#Constants
G=6.7e-11 #N*m^2/kg^2
Earth.m = 6e24 #kg
#craft.m = 15e3 #kg
craft.m = 15e3 #kg
#Moon.m=7e22 #kg
Fscale=20000 #unitless number
Earth.v=vector(0,0,0);
Earth.p=Earth.v*Earth.m;
 

#Initial Conditions
#craft.v=vector(0,3.291e3,0) #m/s
craft.v=vector(0,sqrt(2*craft.m*G*craft.m*Earth.m/mag(Earth.pos-craft.pos))/craft.m) #m/s
#craft.v=vector(0,sqrt((G*(craft.m*Earth.m)/pow((10*Earth.radius),2))*10*Earth.radius/craft.m),0) #m/s
craft.p=craft.m*craft.v #kg*m/s
W_oncraft = 0;

#Simulation Parameters
delta_t=10 #s
simtime=4*24*60*60 #10 years in s
t=0 #s

#graphing objects
gdisplay(xtitle='Seconds',ytitle='Joules', x=500, y=0,width=800, height=500);
Kgraph = gcurve(color=color.magenta);
Ugraph = gcurve(color=color.yellow);
Etotal = gcurve(color=color.red);
Wgraph = gcurve(color=color.cyan);

scene.autoscale=0 #prevents auto scaling

while t<simtime:
    rate(100000) #slows down the simulation to 100 loops per second

    #Calculate Relative Position Vectors & Gravitational Forces
    ##Earth
    r_cE=craft.pos-Earth.pos
    rmag_cE=mag(r_cE)
    Fmag_cE=G*Earth.m*craft.m/(rmag_cE**2)
    rhat_cE=r_cE/rmag_cE
    F_cE=Fmag_cE*-rhat_cE

    #calculate Force of Gravity: Earth
    F_Ec = -1*F_cE;
    Fnet_E=F_Ec;
    #momentum
    delatp_Earth= Fnet_E * delta_t;
    Earth.p=Earth.p+delatp_Earth;

    #update position;
    deltar_Earth=Earth.p*delta_t/Earth.m;
    #Earth.pos=Earth.pos+deltar_Earth;
    

    ##Moon
    #r_cM=craft.pos-Moon.pos
    #rmag_cM=mag(r_cM)
    #rhat_cM=r_cM/rmag_cM
    #Fmag_cM=G*Moon.m*craft.m/(rmag_cM**2)
    #F_cM=Fmag_cM*-rhat_cM
    

    #rhat_cM = mag

    #Calculate Net Force
    Fnet_c=F_cE#+F_cM
    #print("Fnet_c =",Fnet_c)

    #Update Craft Momentum
    delta_p =Fnet_c*delta_t
    craft.p= craft.p+delta_p
    #Update Craft Position
    delta_r=craft.p*delta_t/craft.m
    craft.pos=craft.pos+delta_r

    #Update trail to show motion
    trail.append(pos=craft.pos) #draws new points on our trail as the craft moves

    #calculate System Energies
    pmag = mag(craft.p) ## magnitude of the craft’s momentum
    K = pow(mag(craft.p) , 2)/( craft.m * 2);
    U = -G*craft.m*Earth.m/mag(Earth.pos-craft.pos);

    #calculate and update work
    delta_W = dot(Fnet_c,craft.p*delta_t/craft.m); ## work done in this iteration
    W_oncraft = W_oncraft + delta_W ## keeps track of total work on craft
    E = K+U#W_oncraft
    
    #add data points to Energy graphs
    Kgraph.plot(pos=(mag(Earth.pos-craft.pos),K))
    Ugraph.plot(pos=(mag(Earth.pos-craft.pos),U))
    Etotal.plot(pos=(mag(Earth.pos-craft.pos),E))
    Wgraph.plot(pos=(mag(Earth.pos-craft.pos),W_oncraft))

    #Update Time
    t=t+delta_t

    #Check for crash with Earth
    if rmag_cE < Earth.radius:
        print("Crashed into Earth")
        break

    scene.center = (Earth.pos*Earth.m +craft.pos*craft.m)/(craft.m+Earth.m) #keeps the earth in the center
    #Check for crash with Moon
    #if rmag_cM < Moon.radius:
        #print("Crashed into Moon")
        #break

