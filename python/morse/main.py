import morseDict
import time

#create objects
morse = morseDict.morse

#open input/output files


while 1==1:
	#get character
	#temp
	message = "test message"
	for c in message:
		print(morse[c], "...")
