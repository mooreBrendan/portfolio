from catan import *

def getNumPlayers:
	return 4

def getPlayers:
	numPlayers = getNumPlayers()
	players = []
	for i in range(numPlayers):
		players.append(Player())
	return(players)

def getTiles:
	tiles = []
	
	return tiles
	

if __name__ == "__main__":
	print("running")

	players = getPlayers()
	
	finished = False
	while not finished:
		for i in players:
			roll = diceRoll()
			if roll == 7:
				for j in players:
					j.cullCards()
				i.moveRobber
			i.buildTrade()
