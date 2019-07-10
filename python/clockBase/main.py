import clock
import time

base = 10

clk = clock.clock(base)

try:
	while 1 == 1:
		clk.update(base)
		print(str(clk.base) +":\t"+ str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
		clk.convert()
		print(str(clk.base) +":\t"+ str(clk.baseHour)+":"+str(clk.baseMin)+":"+str(clk.baseSec))
		time.sleep(1)
except:
	print("exiting")
