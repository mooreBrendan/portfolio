#https://stackoverflow.com/questions/16819222/how-to-return-dictionary-keys-as-a-list-in-python
#https://softwareengineering.stackexchange.com/questions/182093/why-store-a-function-inside-a-python-dictionary/182095

class test:
	def __init__(self,clock,dip,printer,verbose=False):
		self.clock = clock
		self.dip = dip
		self.printer = printer
		self.__number = 0
		self.__dict = {
			"ldrV":self.__ldrV,
			"clkS":self.__clkS,
			"clkM":self.__clkM,
			"clkH":self.__clkH,
			"clkB":self.__clkB,
			"clkC":self.__clkC,
			"clkR":self.__clkR,
			"read":self.__read,
			"list":self.__list,
			"exit":self.__exit,
			"stop":self.__stop,
			"selR":self.__selR,
			"enSR":self.__enSR,
			"rPin":self.__rPin
		}
		self.__verbose = verbose
	def __badVal(self):
		print("bad instruction, value")
		return(-2)

	def run(self):
		commands = input(str(self.__number) + ": ").split(' ')
		self.__number += 1
		#code = instruction[0:4]
		#string = instruction[5:]
		retVal = 1
		#if(len(code) <= 3):
		#	print("bad instruction, code")
		#	retVal = -1
		#else:
		try:
			retVal = self.__dict[commands[0]](commands[1:])
		except:
			print("bad instruction, code")
			retVal = -1
		if self.__verbose:
			print("code:",commands[0]," value:",commands[1:])
		return(retVal)

	#load register (individual reg test)
	def __ldrV(self,commands):
		if type(commands) != list or len(commands) != 2:
			return(self.__badVal())
		value = self.__toInt(commands[1])
		if value > 15 or value < 0:
			return(self.__badVal())
		ret = self.printer.write(commands[0],value)
		if(ret == -1):
			return(self.__badVal())
		return(1)

	#update clock's second value
	def __clkS(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		value = self.__toInt(commands[0])
		if value > 59 or value < 0:
			return(self.__badVal())
		self.clock.updateSec(value)
		return(1)

	#update clock's minute value
	def __clkM(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		value = self.__toInt(commands[0])
		if value > 59 or value < 0:
			return(self.__badVal())
		self.clock.updateMin(value)
		return(1)

	#update clock's hour value
	def __clkH(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		value = self.__toInt(commands[0])
		if value > 11 or value < 0:
			return(self.__badVal())
		self.clock.updateHour(value)
		return(1)
	
	#update clock's base value (doesn't update conversion)
	def __clkB(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		value = self.__toInt(commands[0])
		if value > 15 or value < 2:
			return(self.__badVal())
		self.clock.updateBase(value)
		return(1)

	#convert clocks value (update's all registers)
	def __clkC(self,commands):
		self.clock.convert()
		self.printer.updateRegs(self.__clock)
		return(1)

	#get clock value
	def __clkR(self,commands):
		self.clock.updateTime()
		print(self.clock.hour,":",self.clock.min,":",self.clock.sec)
		return(1)

	#read the dip switch
	def __read(self,commands):
		value = ""
		print(self.dip.readBase())
		return(1)

	#exit debug
	def __exit(self,commands):
		print("exiting debugger")
		return(-3)

	#stop program execution
	def __stop(self,commands):
		print("terminating")
		return(-4)

	def __toInt(self,string):
		try:
			temp = int(string)
		except:
			temp = -1
		return(temp)

	def __list(self,commands):
		for i in self.__dict.keys():
			print(i)
		return(1)
	
	def __selR(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		return(self.printer.writeSel(commands[0]))

	def __enSR(self,commands):
		if type(commands) != list or len(commands) != 1:
			return(self.__badVal())
		val = self.__toInt(commands[0])
		print(val)
		if(val == 0):
			self.printer.clkLow()
		elif(val == 1):
			self.printer.clkHigh()
		else:
			return(self.__badVal())
		return(1)

	def __rPin(self,commands):
		self.printer.printPins()
		self.dip.printPins()
