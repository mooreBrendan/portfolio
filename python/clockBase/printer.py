import time

class printer:
	def __init__(self, delay, segType):
		self.__delay = .001
		if(segType == 'a' or segType == 'A'):
			self.__type = 'a'
		else:
			self.__type = 'c'
		self.__dict = {
			'0' : "11111100",
			'1' : "01100000",
			'2' : "11011010",
			'3' : "11110010",
			'4' : "01100110",
			'5' : "10110110",
			'6' : "10111110",
			'7' : "11100000",
			'8' : "11111110",
			'9' : "11100110",
			'a' : "11101110",
			'b' : "00111110",
			'c' : "10011100",
			'd' : "01111010",
			'e' : "10011110",
			'f' : "10001110"
		}
	def parse(self,clock):
		#disable output display
		for i in range(6):
			self.__write(self.__conv(clock.baseHour[i]))
			self.__write(self.__conv(clock.baseMin[i]))
			self.__write(self.__conv(clock.baseSec[i]))
			#clock low
			#clock high
		#enable output display

	def __conv(self,char):
		#convert to bits in 7 seg disp
		return(self.__dict[char])

	def __write(self,segments):
		#output the bits
		for seg in segments:
			#write each bit
			if(self.__type == 'c'):
				if(seg ==  '1'):
					x = 1
				else:
					x = 0
			else:
				if(seg == '1'):
					x = 0
				else:
					x = 1
		
