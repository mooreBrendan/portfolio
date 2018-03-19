from __future__ import division
from visual import *

#Objects in Simulation
Earth=sphere(pos=vector(0,0,0), radius=6.4e6, color=color.cyan, material=materials.earth) #materials.earth makes sphere look like a little Earth
craft=sphere(pos=vector(-10*Earth.radius,0,0), radius=1e6, color=color.yellow)
Moon=sphere(pos=vector(4e8,0,0), radius=1.75e6, color=color.white)
trail=curve(color=craft.color) ##creates a trail behind the craft

#Constants
G=6.7e-11 #N*m^2/kg^2
Earth.m = 6e24 #kg
craft.m = 15e3 #kg
Moon.m=7e22 #kg
Fscale=20000 #unitless number
 

#Initial Conditions
#craft.v=vector(0,3.291e3,0) #m/s
craft.v=vector(0,3.2735e3,0) #m/s
craft.p=craft.m*craft.v #kg*m/s

#Simulation Parameters
delta_t=1 #s
simtime=10*365*24*60*60 #10 years in s
t=0 #s

###Arrows for simulation
arr_c=arrow(color=color.yellow) #force on craft from Earth arrow
parr_c=arrow(color=color.blue) #momentum of craft arrow
arr_E=arrow(color=color.yellow) #force on Earth from craft arrow
fnetarr_c=arrow(color=color.red, shaftwidth=2e6) #net force on craft arrow
fearr_c=arrow(color=color.cyan, shaftwidth=2e6) #force by Earth arrow
fmarr_c=arrow(color=color.white, shaftwidth=2e6) #force by Moon arrow

scene.autoscale=0
scene.center=vector(2e8,0,0)
while t<simtime:
    rate(100000) #slows down the simulation to 100 loops per second

    #Calculate Relative Position Vectors & Gravitational Forces
    ##Earth
    r_cE=craft.pos-Earth.pos
    rmag_cE=mag(r_cE)
    Fmag_cE=G*Earth.m*craft.m/(rmag_cE**2)
    rhat_cE=r_cE/rmag_cE
    F_cE=Fmag_cE*-rhat_cE

    

    ##Moon
    r_cM=craft.pos-Moon.pos
    rmag_cM=mag(r_cM)
    rhat_cM=r_cM/rmag_cM
    Fmag_cM=G*Moon.m*craft.m/(rmag_cM**2)
    F_cM=Fmag_cM*-rhat_cM
    

    #rhat_cM = mag

    #Calculate Net Force
    Fnet_c=F_cE+F_cM
    #print("Fnet_c =",Fnet_c)

    #Update Craft Momentum
    delta_p =Fnet_c*delta_t
    craft.p= craft.p+delta_p
    #Update Craft Position
    delta_r=craft.p*delta_t/craft.m
    craft.pos=craft.pos+delta_r

    #Update trail to show motion
    trail.append(pos=craft.pos) #draws new points on our trail as the craft moves

    #Update craft arrows
    arr_c.pos=craft.pos #keeps the tail end of the arrow on the craft
    arr_c.axis=F_cE*Fscale #axis has the same components as the vector we want it to represent
    parr_c.pos=craft.pos     #arrow with tail on craft
    parr_c.axis= craft.p   #should have same vector components as momentum
    fnetarr_c.pos=craft.pos  #arrow with tail on craft
    fnetarr_c.axis= Fnet_c*Fscale  #don't forget our scale factor!
    arr_E.pos= Earth.pos     #arrow with tail on Earth
    arr_E.axis= -F_cE*Fscale    #don't forget our scale factor!
    fearr_c.pos=craft.pos
    fearr_c.axis=F_cE*Fscale
    fmarr_c.pos=craft.pos
    fmarr_c.axis=F_cM*Fscale

    #Update Time
    t=t+delta_t

    #Check for crash with Earth
    if rmag_cE < Earth.radius:
        print("Crashed into Earth")
        break

    #Check for crash with Moon
    if rmag_cM < Moon.radius:
        print("Crashed into Moon")
        break
