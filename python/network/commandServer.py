import sys
import socket

class commandServer:
	def __init__(self, socketNum, authenticator):
		self.__socketNum = socketNum
		self.__authenticator = self.__authenticate(authenticator)

	def handleCommand(self, command):
		parsedCommand = command.split("\0")
		if parsedCommand[0] == "auth":
			handleAuth(parsedCommand[1])
		else:
			if self.__verifyToken(parsedCommand[1]):
				response = self.__handleCommand(parsedCommand[2])
				self.__sendResponse(response)
			else:
				self.__respondError()


if __name__ == "__main__":
 	cs = commandServer(sys.argv[1], sys.argv[2])
	print("running")
	cs.run()
