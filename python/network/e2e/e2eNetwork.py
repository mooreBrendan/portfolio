import socket

def socketCreate(port, public='localhost', socketConnections=5):
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sock.bind((public,port))
	sock.listen(socketConnections)
	return sock

def diffieHelmanInitiator(sock, pubkey, port,host='localhost'):
	sendMessage(port, host, "DHS"+str(pubKey))
	msg = recMessage(sock)
	#TODO:
	#compute key

def diffieHelmanListen(sock, pubKey, privateKey):
	msg = ""
	while len(msg) < 3 and msg[:3] != "DHS":
		msg = recMessage(sock)
		#TODO:
		#send own public key
		#compute key


def sendMessage(self, port, host, msg):
	sock.connect((host,port))
	if len(msg) >= 1000:
		return -1
	sock.send(str(len(msg)))
	
	totalsent = 0
	while totalsent < len(msg):
		sent = sock.send(msg[totalsent:])
		if sent == 0:
			raise RuntimeError("socket connection broken")
		totalsent += sent

def recMessage(sock):
	chunks = []
	bytesReceived = 0
	chunk = sock.recv(3)
	MSGLEN = int(str(b''.join(chunk)))
	while bytesReceived < MSGLEN:
		chunk = sock.recv(min(MSGLEN-bytesReceived, 100))
		if chunk == b'':
			raise RuntimeError("socket connection broken")
		chunks.append(chunk)
		bytesReceived += len(chunk)
	return b''.join(chunks)

if __name__=="__main__":
	soc = socketCreate(20010)
