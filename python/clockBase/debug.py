#https://stackoverflow.com/questions/16819222/how-to-return-dictionary-keys-as-a-list-in-python
#https://softwareengineering.stackexchange.com/questions/182093/why-store-a-function-inside-a-python-dictionary/182095

class test:
	def __init__(self,clock,dip,printer,verbose):
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
		instruction = input(str(self.__number) + ": ")
		self.__number = self.__number + 1
		code = instruction[0:4]
		string = instruction[5:]
		retVal = 1
		if(len(code) <= 3):
			print("bad instruction, code")
			retVal = -1
		else:
			try:
				retVal = self.__dict[code](string)
			except:
				print("bad instruction, code")
				retVal = -1
		if self.__verbose:
			print("\"",instruction,"\"","code:",code," value:",string)
		return(retVal)

	def __ldrV(self,string):
	#load register (individual reg test)
		reg = string[0:5]
		value = self.__toInt(string[5:])
		if value > 15 or value < 0:
			return(self.__badVal())
		ret = self.printer.write(reg,value)
		if(ret == -1):
			return(self.__badVal())
		return(1)

	#update clock's second value
	def __clkS(self,string):
		value = self.__toInt(string[0:])
		if value > 59 or value < 0:
			return(self.__badVal())
		self.clock.updateSec(value)
		return(1)

	#update clock's minute value
	def __clkM(self,string):
		value = self.__toInt(string[0:])
		if value > 59 or value < 0:
			return(self.__badVal())
		self.clock.updateMin(value)
		return(1)

	#update clock's hour value
	def __clkH(self,string):
		value = self.__toInt(instruction[0:])
		if value > 11 or value < 0:
			return(self.__badVal())
		self.clock.updateHour(value)
		return(1)
	
	#update clock's base value (doesn't update conversion)
	def __clkB(self,string):
		value = self.__toInt(string[0:])
		if value > 15 or value < 2:
			return(self.__badVal())
		self.clock.updateBase(value)
		return(1)

	#convert clocks value (update's all registers)
	def __clkC(self,string):
		self.clock.convert()
		self.printer.updateRegs(self.__clock)
		return(1)

	#get clock value
	def __clkR(self,string):
		self.clock.updateTime()
		print(self.clock.hour,":",self.clock.min,":",self.clock.sec)
		return(1)

	#read the dip switch
	def __read(self,string):
		value = ""
		print(self.dip.readBase())
		return(1)

	#exit debug
	def __exit(self,string):
		print("exiting debugger")
		return(-3)

	#stop program execution
	def __stop(self,string):
		print("terminating")
		return(-4)

	def __toInt(self,string):
		temp=0
		try:
			temp = int(string)
		except:
			temp = -1
		return(temp)

	def __list(self,string):
		for i in self.__dict.keys():
			print(i)
		return(1)
	
	def __selR(self,string):
		return(self.printer.writeSel(string))

	def __enSR(self,string):
		val = self.__toInt(string[0:])
		print(val)
		if(val == 0):
			self.printer.clkLow()
		elif(val == 1):
			self.printer.clkHigh()
		else:
			return(self.__badVal())
		return(1)

	def __rPin(self,string):
		self.printer.printPins()
		self.dip.printPins()
