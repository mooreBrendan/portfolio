import time

class clock():
	def __init__(self,clk,bus,switch):
		self.__dict = {
			0 : "0",
			1 : "1",
			2 : "2",
			3 : "3",
			4 : "4",
			5 : "5",
			6 : "6",
			7 : "7",
			8 : "8",
			9 : "9",
			10 : "a",
			11 : "b",
			12 : "c",
			13 : "d",
			14 : "e",
			15 : "f"
		}
		self.__reg ={
			"base0":"17",
			"hour3":"16",
			"hour2":"15",
			"hour1":"14",
			"hour0":"13",
			"min_5":"12",
			"min_4":"10",
			"min_3":"9",
			"min_2":"8",
			"min_1":"7",
			"min_0":"6",
			"sec_5":"5",
			"sec_4":"4",
			"sec_3":"3",
			"sec_2":"2",
			"sec_1":"1",
			"sec_0":"0"
		}
		self.__base = 10
		self.baseSec = ""
		self.baseMin = ""
		self.baseHour = ""

#run the clock
	def runClock():
		updateTime()
		readBase()
		convert()
		updateRegs()


#update clock values
	def __updateTime(self):
		self.hour = time.localtime().tm_hour
		self.min = time.localtime().tm_min
		self.sec = time.localtime().tm_sec

#convert to base
		def __convert(self):
		self.__prevHour = self.baseHour
		self.__prevMin = self.baseMin
		self.__prevSec = self.baseSec
		self.baseHour = ""
		self.baseMin = ""
		self.baseSec = ""
		while self.hour >0:
			self.baseHour = self.__dict[self.hour % self.__base] + self.baseHour
			self.hour = int((self.hour - (self.hour % self.__base) ) / self.__base)
		while len(self.baseHour) < 4:
			self.baseHour = " " + self.baseHour
		while self.min >0:
			self.baseMin = self.__dict[self.min % self.__base] + self.baseMin
			self.min = int((self.min - (self.min % self.__base) ) / self.__base)
		while len(self.baseMin) < 6:
			self.baseMin = " " + self.baseMin
		while self.sec >0:
			self.baseSec = self.__dict[self.sec % self.__base] + self.baseSec
			self.sec = int((self.sec - (self.sec % self.__base) ) / self.__base)
		while len(self.baseSec) < 6:
			self.baseSec = " " + self.baseSec

