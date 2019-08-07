import configparser
import twitch
from time import sleep

config = configparser.ConfigParser()
config.read('config.ini')
print(config[0])
print(config[1])

client = twitch.TwitchClient(client_id = config.client_id)
channel = client.channels.get_by_id(44322889)

print(channel.id)
print(channel.name)
print(channel.display_name)

while true:
	sleep(1)
