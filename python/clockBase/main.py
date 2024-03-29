#https://docs.python.org/3/tutorial/errors.html

import sys
import time

import clock
import hardware
import debug

#define constants
printDelay = .001


#create objects
clk = clock.clock()
dipSwitch = hardware.dipSwitch(1)
printer = hardware.printer(printDelay,'c') 

#run the clock
try:
#if 1==1:
	if len(sys.argv) > 1 and sys.argv[1] == "-d" :
		if len(sys.argv) > 2 and sys.argv[2] == "-v":
			verbose = True
		else:
			verbose = False
		test = debug.test(clk,dipSwitch,printer,verbose)
		retCode = 0
		while retCode != -3:
			retCode = test.run()
			if(retCode == -4):
				raise Exception('terminate')
	print("running clock")
	while 1 == 1:
		clk.updateBase(dipSwitch.readBase())
		clk.updateTime()
		clk.convert()
		printer.updateRegs(clk)
except:
#else:
	print("\nexiting")
