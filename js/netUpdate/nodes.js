function node(index) {
	this.index = index;
	this.x = random(sizeN / 2, dimension - sizeN / 2);
	this.y = random(sizeN / 2, dimension - sizeN / 2);
	this.version = 1;
	this.connections = [
		[], //index
		[], //alive connection
		[] //last interaction time
	];
	for (var i = 0; i < this.index; i++) {
		if (dist(nodes[i].x, nodes[i].y, this.x, this.y) <= sizeN) {
			this.x = random(sizeN / 2, dimension - sizeN / 2);
			this.y = random(sizeN / 2, dimension - sizeN / 2);
			i = 0;
		}
	}
	this.connect = function() {
		append(messages, new message(this.index,this, "beat", "request reply", []));

	}
	this.check = function() {
		//receive messages
		messages.forEach((mess) => { //receive & process message
			if (abs(dist(mess.x, mess.y, this.x, this.y) - mess.r) < transferSpd / 2 && (mess.path[1] == this.index || !mess.path.length) && mess.sender != this.index) {
				//update connections
				var connected = false;
				this.connections[0].forEach((connection, index) => {
					if (connection == mess.sender) {
						connected = true;
						this.connections[1][index] = true;
						this.connections[2][index] = millis();
					}
				});
				if (!connected) {
					append(this.connections[0], mess.sender);
					append(this.connections[1], true);
					append(this.connections[2], millis());
				}
				if (mess.path.length > 2) { //if this is on the path to the target
					//forward message
					append(messages, new message(mess.sender, this, mess.mode, mess.message, mess.path.splice(1, mess.path.length)));
				} else { //if is the target or no target
					if (mess.version == this.version) {
						if (mess.mode == "beat") {
							//send message in mess mode with beat string
							append(messages, new message(this.index, this, "mess", "beat", [this.index, mess.index])); //
						} else if (mess.mode == "mess") {
							//receive the message
							console.log(this.index + " received: " + mess.message);
						}
					} else if (mess.version > this.version) {
						if (mess.mode == "updt") {
							this.version = mess.version;
						} else {
							//request update
							append(messages, new message(this.index, this, "mess", "update request", Dijkstra(this.index, mess.sender))); //Dijkstra(this.index, mess.sender)
						}
					} else { //if this.version > message.version
						//send update
						append(messages, new message(this.index, this, "updt", "update body", Dijkstra(this.index, mess.sender)));
					}
					//prevent rechecking this message
				}
			}
		})
		//update connections
		var disconnection = false;
		for (i = 0; i < this.connections[0].length; i++) {
			if (this.connections[1][i] && millis() - this.connections[2][i] > timeout) { //if timed out
				this.connections[1][i] = false; //mark as not active
				this.connections[2][i] = millis();
				disconnection = true;
			} else if (millis() - this.connections[2][i] > timeout && this.connections[1][i] == false) { //if timed out twice
				this.connections[0].splice(i, 1); //remove to prevent dead connections
				this.connections[1].splice(i, 1);
				this.connections[2].splice(i, 1);
				i--
			}
		}
		if (disconnection) {
			append(messages, new message(this.index, this, "beat", "request reply", []));
		}
	}
	this.update = function() {
		this.version++;
		append(messages, new message(this.index, this, "updt", "update body", [])); //send updt message
	}
	this.show = function() {
		ellipseMode(CENTER);
		fill(200);
		ellipse(this.x, this.y, sizeN, sizeN);
		fill(0);
		textSize(sizeN * .75);
		textAlign(CENTER, CENTER);
		text(this.index, this.x, this.y);
	}
}

function message(origin, sender, mode, msg, path) {
	this.x = sender.x;
	this.y = sender.y;
	this.version = sender.version;
	this.sender = origin;
	this.mode = mode; //modes: beat,mess,updt
	this.message = msg;
	this.path = path;
	this.r = 0;
	this.update = function() {
		this.r += transferSpd;
		if (this.r > interDist) {
			return (false);
		} else {
			return (true);
		}
	}
	this.show = function() {
		ellipseMode(CENTER)
		stroke(255);
		strokeWeight(transferSpd);
		noFill();
		ellipse(this.x, this.y, this.r, this.r);
	}
}
