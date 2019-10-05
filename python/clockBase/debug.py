def test(clock,dip,printer):
	instruction = input()
	code = instruction[0:4]
	if(len(code) <= 3):
		print("bad instruction, code")
		return(-1)

	#load register (individual reg test)
	if code == "ldrV":
		reg = instruction[5:9]
		value = int(instruction[10:])
		if value > 15 or value < 0:
			print("bad instruction, value")
			return(-1)
		printer.write(reg,value)

	#update clock's second value
	elif code == "clkS":
		value = int(instruction[5:])
		if value > 59 or value < 0:
			print("bad instruction, value")
			return(-2)
		clock.updateSec(value)

	#update clock's minute value
	elif code == "clkM":
		value = int(instruction[5:])
		if value > 59 or value < 0:
			print("bad instruction, value")
			return(-2)
		clock.updateMin(value)

	#update clock's hour value
	elif code == "clkH":
		value = int(instruction[5:])
		if value > 11 or value < 0:
			print("bad instruction, value")
			return(-2)
		clock.updateHour(value)
	
	#update clock's base value (doesn't update conversion)
	elif code == "clkB":
		value = int(instruction[5:])
		if value > 15 or value < 0:
			print("bad instruction, value")
			return(-2)
		clock.updateBase(value)

	#convert clocks value (update's all registers)
	elif code == "clkC":
		clock.convert()
		printer.updateRegs(clock)

	#read the dip switch
	elif code == "read":
		value = ""
		print(dip.readBase())

	#exit debug
	elif code == "exit":
		print("running")
		return(-3)

	#stop program execution
	elif code == "stop":
		print("terminating")
		return(-4)

	#unknown code
	else:
		print("bad instruction, code")
		return(-1)
	print(instruction, "code:",code," value:",value)

	return(1)
