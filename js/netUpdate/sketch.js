const dimension = 600;

var sizeN = 30;
var sizeM = sizeN * .75;
var interDist = 300;
var timeout = 30000;
var transferSpd = 1;
var tolerance = 10;

var numNodes = 20;
var nodes = [];
var messages = [];

function setup() {
	createCanvas(dimension, dimension);
	for (var i = 0; i < numNodes; i++) {
		nodes[i] = new node(i);
		nodes[i].connect();
	}
}

function draw() {
	background(0);
	nodes.forEach((node) => {
		node.check();
		node.show();
	})
	for (var i = 0; i < messages.length; i++) {
		if (messages[i].update()) {
			messages[i].show();
		} else {
			messages.splice(i, 1);
			i--;
		}
	}
}

function removeNode(nodeIndex) {
	var index = -1;
	nodes.forEach((node) => { //find node with that index
		if (node.index == nodeIndex) {
			index = node.index;
		}
	});
	if (index != -1) { //if node exists, remove
		nodes.splice(index, 1);
	}
}

function addNode(nodeIndex, newX, newY) {
	var valid = true;
	nodes.forEach((node) => {
		if (node.index == nodeIndex || dist(newX, newY, node.x, node.y) < sizeN) {
			valid = false;
		}
	});
	if (valid) {
		append(nodes, new node(nodeIndex));
		nodes[nodes.length - 1].x = newX;
		nodes[nodes.length - 1].y = newY;
		nodes[nodes.length - 1].connect();
	}
}


function Dijkstra(start, end) {
	var unvisited = []; //S: 1
	var distance = [];
	var connections = [];
	var path = [];
	for (var i = 0; i < nodes.length; i++) {
		unvisited[i] = true;
		if (i != start) {
			distance[i] = Infinity;
			connections[i] = -1;
		} else {
			distance[i] = 0;
			connections[i] = -2;
		}
	}
	do {
		var shortest = Infinity;
		var current = -1;
		for (i = 0; i < nodes.length; i++) {
			if (distance[i] < shortest && unvisited[i]) { //find shortest that is unvisited to be current node
				current = i;
				shortest = distance[i];
			}
		}
		if (current != -1) {
			nodes[current].connections[0].forEach((connection, index) => { //S: 3
				if (dist(nodes[current].x, nodes[current].y, nodes[connection].x, nodes[connection].y) + distance[current] < distance[connection]) { //if tenative distance is smaller replace it
					distance[connection] = dist(nodes[current].x, nodes[current].y, nodes[connection].x, nodes[connection].y) + distance[current];
					connections[connection] = current;
				}
			});
		}
		unvisited[current] = false; //S: 4
	} while (unvisited[end] && current != -1);

	if (connections[end] != -1) {
		current = end;
		while (connections[current] != -2) {
			path.unshift(nodes[current].index);
			current = connections[current];
		}
		path.unshift(current);
		return (path);
	} else {
		console.log("no connection")
		return ([]);
	}
}
