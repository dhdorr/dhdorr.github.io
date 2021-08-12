var cols = 15;
var rows = 15;
var sLen = 45;
var canvLen = 675;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

var startAlgo = false;
var noSolution = false;


function Spot(i, j) {
  let spotColor = color(200, 200, 200);
  let wallColor = color(39, 71, 112);

  let myColor = spotColor;
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.wall = false;
  this.neighbors = [];
  this.previous = undefined;

  this.show = function (clr) {
    if (this.wall == false) {
      fill(clr);
      stroke(0);
    }
    if (this.wall == true) {
      fill(wallColor);
      stroke(0);
    }
    rect(this.x * sLen, this.y * sLen, sLen, sLen);
  };

  this.addNeighbors = function (grid) {
    var i = this.x;
    var j = this.y;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  };
}

function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  //var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function runAlgo() {
    frameRate(10);
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (openSet[winner] == end) {
      startAlgo = false;
      //noLoop();
      console.log("Done!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    console.log("no solution");
    noSolution = true;
    startAlgo = false;
    //noLoop();
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(250, 0, 0));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }

  //Find the path
  if (!noSolution) {
    frameRate(30);
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }
}

function setup() {
  let renderer = createCanvas(canvLen, canvLen);
  renderer.parent("maze");

  frameRate(30);

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);
}

console.log(grid);

function draw() {
  background(255,255, 255, 0);
  drawGrid();
  if (startAlgo) {
    runAlgo();
  }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color("#eea849"));
  }
}

function drawGrid() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(250, 250, 250, 100));
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (
        mouseX >= grid[i][j].x * sLen &&
        mouseX <= grid[i][j].x * sLen + sLen &&
        mouseY >= grid[i][j].y * sLen &&
        mouseY <= grid[i][j].y * sLen + sLen
      ) {
        fill(color("#3fada8"));
        rect(grid[i][j].x * sLen, grid[i][j].y * sLen, sLen, sLen);
      }
    }
  }

  fill(color("#2e8b57"));
  rect(grid[0][0].x * sLen, grid[0][0].y * sLen, sLen, sLen);

  fill(color("#cd5c5c"));
  rect(grid[cols - 1][rows - 1].x * sLen, grid[cols - 1][rows - 1].y * sLen, sLen, sLen);

  if (mouseIsPressed) {
    console.log("Clicked");
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (
          mouseX >= grid[i][j].x * sLen &&
          mouseX <= grid[i][j].x * sLen + sLen &&
          mouseY >= grid[i][j].y * sLen &&
          mouseY <= grid[i][j].y * sLen + sLen &&
          grid[i][j] != start &&
          grid[i][j] != end
        ) {
          grid[i][j].wall = true;
        }
      }
    }
  }
}

function keyPressed() {
  if (key == "c") {
    location.reload();

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].wall == true) {
          grid[i][j].wall = false;
        }
      }
    }
  }

  if (key == "s") {
    startAlgo = true;
  }
}

function initAlgo() {
    startAlgo = true;
}

function reloadPage() {
    location.reload();
}