import sys
import socket

class client:
	def __init__(self, socketNum):
		self.__socketNum = socketNum

	def __sendCommand(self, command):
		print(command)
		return command

	def run()
		response = 0
		while response != 1:
			authPort = input("server port num:")
			try:
				response = self.__sendCommand(int(authPort),"auth")
			except:
				print("invalid server port")

		while 1 == 1:
			command = input("{}:\\".format(authPort))
			#TODO: parse command
			if command == "stop":
				return
			else:
				formattedCommand = self.__formatCommand(command)
				response = self.__sendCommand(formattedCommand)
				print(response)

if __name__ == "__main__":
	cl = client(sys.argv[1])
	print("running")
	cl.run()
