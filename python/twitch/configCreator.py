import configparser

configFileName = 'config2.ini'
config = configparser.ConfigParser()
config['DEFAULT'] = {'user': 'null'}

with open(configFileName, 'w') as configfile:
	config.write(configfile)
