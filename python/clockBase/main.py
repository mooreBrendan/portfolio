import clock

base = 10

clk = clock.clock(base)

try:
	while 1 == 1:
		clk.update()
		print(str(clk.hour)+":"+str(clk.min)+":"+str(clk.sec))
except:
	print("exiting")
