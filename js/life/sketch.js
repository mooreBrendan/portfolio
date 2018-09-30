const sizeT = 40;
const rows = 30;
const cols = 25;

var arry1 = [];
var arry2 = [];

function setup() {
	createCanvas(sizeT * cols, sizeT * rows);
	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			arry1[j * cols + i] = new tile(i, j);
			arry1[j * cols + i].show();
			arry2[j * cols + i] = new tile(i, j);
		}
	}
}

function draw() {
	if (keyCode != 32) {
		frameRate(60);
		if (mouseIsPressed) {
			var i = -1;
			var j = -1;
      var maxVal=cols;
      if(rows>cols){
        maxVal=rows;
      }
			for (k = 0; k <= maxVal; k++) {
				if (mouseX > k * sizeT) {
					i++;
				}
				if (mouseY > k * sizeT) {
					j++;
				}
			}
			if (i < cols && j < rows && i >= 0 && j >= 0) {
				if (keyIsDown(16)) {
					arry1[j * cols + i].life = false;
				} else {
					arry1[j * cols + i].life = true;
				}
			}
		}
	} else {
		frameRate(3);
    arry1.forEach((tile,index) => arry2[index].checkNeighbors());
		arry1 = arry2;
	}
  arry1.forEach((tile)=>tile.show());
}
