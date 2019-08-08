import morseDict

#create objects
morse = morseDict.morse

#open input/output files


while true:
	#get character
	#temp
	message = "test message"
	for c in message:
		print(morse[c])
