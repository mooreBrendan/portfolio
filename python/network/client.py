import sys
import socket

class client:
	def __init__(self, socketNum):
		self.__socketNum = socketNum

	def __sendCommand(self, command):
		print(command)

	def run()
		port = input("server port num:")
		try:
			response = self.__sendCommand(int(port),"auth")
		except:
			print("invalid port")

if __name__ == "__main__":
	cl = client(sys.argv[1])
	print("running")
	cl.run()
