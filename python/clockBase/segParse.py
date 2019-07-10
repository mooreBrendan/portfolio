import time

class segParser:
	def __init__(self):
		self.delay = .001
		self.dict = {
			'0' : "11111100",
			'1' : "01100000",
			'2' : "11011010"
		}
	def parse(self,string):
		#disable output display
		for i in string:
			self.write(self.conv(i))
		#enable output display

	def conv(self,char):
		#convert to bits in 7 seg disp
		return(self.dict[char])

	def write(self,segments):
		#clock low
		#output the bits
		for seg in segments:
			#write each bit
			time.delay(self.delay)
		#clock high (write)
		
