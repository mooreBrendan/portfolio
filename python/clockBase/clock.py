import time

class clock():
	def __init__(self,base):
		base = int(base)
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
		if(base < 2):
			self.__base = 2
		elif(base >16):
			self.__base = 16
		else:
			self.__base = base
	def update(self, base):
		self.hour = time.localtime().tm_hour
		self.min = time.localtime().tm_min
		self.sec = time.localtime().tm_sec
		self.__base = base
	def convert(self):
		self.baseHour = ""
		self.baseMin = ""
		self.baseSec = ""
		while self.hour >0:
			self.baseHour = self.__dict[self.hour % self.__base] + self.baseHour
			self.hour = int((self.hour - (self.hour % self.__base) ) / self.__base)
		while len(self.baseHour) < 5:
			self.baseHour = "0" + self.baseHour
		while self.min >0:
			self.baseMin = self.__dict[self.min % self.__base] + self.baseMin
			self.min = int((self.min - (self.min % self.__base) ) / self.__base)
		while len(self.baseMin) < 6:
			self.baseMin = "0" + self.baseMin
		while self.sec >0:
			self.baseSec = self.__dict[self.sec % self.__base] + self.baseSec
			self.sec = int((self.sec - (self.sec % self.__base) ) / self.__base)
		while len(self.baseSec) < 6:
			self.baseSec = "0" + self.baseSec
