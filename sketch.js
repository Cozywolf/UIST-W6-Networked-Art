var SOCKET_URL = 'wss://fierce-plains-17880.herokuapp.com/';
var TEAM_NAME = 'letterpress';
var socket;

var theta1;
var theta2;
var randomX;
var randomY;
var strokeR;
var strokeG;
var strokkB;
var leafRed, leafGreen;

var ang = 0;
var angle = ang + Math.PI / 2; //largest sine value for largest sun size
var d;
var x;
var y;
var r;
var g;
var b;
var dk;
var j, k;
var i = 0;
var swing = 0;
var map1 = 400;
var map2 = 400;
var leafchange = 0;
var leafRed;
var leafGreen;
var flower = [];
var flowerLimit = 30;
var flowerColorRed, flowerColorBlue, flowerColorGreen;
var star = [];
var starLimit = 20;
var cloud = [];
var cloudLimit = 15;



function setup() {
  socket = io(SOCKET_URL + TEAM_NAME); // Open a socket connection to the server.
  stroke(153, 102, 51);
  socket.on('flower', addFlower);
  socket.on('star', addStar);
  socket.on('cloud', addCloud);
  socket.on('clear', clearAll);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  d = 0.45 * windowWidth;
  x = d * cos(ang);
  y = d * sin(ang);

  // sky color change
  if (y > 0) {
    background(r, g, b);
  } else {
    background(dk, dk, dk);
  }
  r = 250;
  g = 245;
  b = 192 + (1 - Math.abs(x / 560)) * 63;
  dk = Math.abs(x / 560) * 150;

  //draw star and cloud
  push(); // No.1
  if (y > 0) {
    for (var i = 0; i < cloud.length; ++i) {
      fill(cloud[i].c);
      noStroke();
      var pikerandom = random(85, 100);
      fill(cloud[i].c)
      ellipse(cloud[i].x, cloud[i].y, pikerandom * 2.3, pikerandom * 0.8);
      ellipse(cloud[i].x + 2 * pikerandom / 3, cloud[i].y - pikerandom / 3, 0.66 * pikerandom, 0.66 * pikerandom);
      ellipse(cloud[i].x, cloud[i].y - pikerandom / 4, pikerandom * 1.4, pikerandom * 1.2);
    }
  }
  if (y < 0) {
    for (var i = 0; i < star.length; ++i) {
      fill(star[i].c);
      noStroke();
      var pikerandom = random(50, 100);
      fill(star[i].c)
      ellipse(star[i].x, star[i].y, pikerandom / 3, 3);
      ellipse(star[i].x, star[i].y, 3, pikerandom / 3);
    }
  }
  pop(); // No.1

  //sun size and location
  push(); // No.2
  translate(windowWidth / 2, windowHeight);
  var d1 = 50 + (sin(angle) * windowWidth / 35) + windowWidth / 35;
  push(); // No.3
  fill(250, 147, 45);
  noStroke();
  ellipse(x, -y, d1, d1);

  // moon size and location
  fill(255, 204, 0);
  arc(-x, y, d1, d1, PI / 4, PI + QUARTER_PI, CHORD);
  pop(); // No.3

  angle += PI / 187.5;
  ang += PI / 375;

  r = 250;
  g = 245;
  b = 192 + (1 - Math.abs(x / 560)) * 63;
  dk = Math.abs(x / 560) * 150;

  // ground
  push(); // No.4
  translate(-windowWidth / 2, -windowHeight);
  noStroke();
  fill(161, 212, 144);
  rect(0, 0.7 * windowHeight, windowWidth, windowHeight / 2);
  pop(); // No.4

  // path
  push(); // No.5
  translate(-windowWidth / 2, -windowHeight);
  fill(115, 64, 47);
  noStroke();
  ellipse(windowWidth, 1.1 * windowHeight, 2 * 0.9 * windowWidth, 2 * 0.39 * windowHeight);
  fill(161, 212, 144);
  noStroke();
  ellipse(windowWidth, 1.1 * windowHeight, 2 * 0.6 * windowWidth, 2 * 0.38 * windowHeight)
  pop(); // No.5

  //draw flower
  push();
  translate(-windowWidth / 2, -windowHeight);
  for (var i = 0; i < flower.length; ++i) {
    strokeWeight(3);
    line(flower[i].x, flower[i].y, flower[i].x, flower[i].y - 50);
    fill(flower[i].c);
    strokeWeight(0);
    ellipse(flower[i].x + 15, flower[i].y - 50, 20, 20);
    ellipse(flower[i].x - 15, flower[i].y - 50, 20, 20);
    ellipse(flower[i].x, flower[i].y - 35, 20, 20);
    ellipse(flower[i].x, flower[i].y - 65, 20, 20);
    fill(215, 135, 128);
    ellipse(flower[i].x, flower[i].y - 50, 20, 20);
  }
  pop();


  //tree swing
  if (swing < 50) {
    map1 += 10;
    map2 -= 10;
    swing++;
  } else if (swing >= 50 && swing < 100) {
    map1 -= 10;
    map2 += 10;
    swing++;
  } else if (swing >= 100 && swing < 150) {
    map1 -= 10;
    map2 += 10;
    swing++;
  } else if (swing >= 150 && swing < 200) {
    map1 += 10;
    map2 -= 10;
    swing++;
  } else if (swing = 200) {
    swing = 0;
  }

  // define tree angle
  theta1 = map(map1, 0, width, PI / 8, PI / 4.5);
  theta2 = map(map2, 0, height, PI / 8, PI / 4.5);

  // draw the first(center) tree
  push(); // No.6
  stroke(139,69,19);
  branch(0.2 * windowHeight, 0.02 * windowHeight);
  pop(); // No.6

  // draw the second (left) tree
  push(); // No.7
  stroke(112,128,144);
  translate(-windowWidth / 3, -windowHeight / 6)
  branch(0.1 * windowHeight, 0.01 * windowHeight);
  pop(); // No.7

  // draw the third (right) tree
  push(); // No.8
  stroke(165,42,42);
  translate(windowWidth / 3, -windowHeight / 4)
  branch(0.05 * windowHeight, 0.005 * windowHeight);
  pop(); // No.8

  pop(); // No.2

}


// Each branch now receives its length as an argument.
function branch(len, thick) {
  if (thick > 1) {
    strokeWeight(thick);
  } else {
    strokeWeight(1);
  }
  line(0, 0, 0, -len);
  translate(0, -len);

  // Each branch’s length shrinks by two-thirds.
  // Each branch's thickness shrinks timed by 0.8.
  len *= 0.66;
  thick *= 0.8;

  if (len > 4) {
    push();
    rotate(theta1);
    // Subsequent calls to branch()
    // include the length argument.
    branch(len, thick);
    //branch(len);
    pop();

    push();
    rotate(-theta2);
    branch(len, thick);
    //branch(len);
    pop();
  } else {

    leafRed = floor(y % 255);
    if (leafRed < 0) {
      leafRed = -1 * leafRed;
    }

    leafGreen = floor(x % 255);
    if (leafGreen < 0) {
      leafGreen = -leafGreen;
    }

    fill(leafRed, leafGreen, 0);
    noStroke();
    var a = random(50, 100);
    if (y > 0) {
      ellipse(0, 0, a, 0.45 * a);
    } else
      ellipse(0, 0, a, 3);
  }
}

function addFlower(x, y, r, g, b) {
  flower.push({
    x: x,
    y: y,
    c: 'rgb(' + r + ',' + g + ',' + b + ')'
  });
  if (flowerLimit > 0 && flower.length > flowerLimit) flower.shift();
}

function addStar(x, y, r, g, b) {
  star.push({
    x: x,
    y: y,
    c: 'rgb(' + r + ',' + g + ',' + b + ')'
  });
  if (starLimit > 0 && star.length > starLimit) star.shift();
}

function addCloud(x, y, r, g, b) {
  cloud.push({
    x: x,
    y: y,
    c: 'rgb(' + r + ',' + g + ',' + b + ')'
  });
  if (cloudLimit > 0 && cloud.length > cloudLimit) cloud.shift();
}

function mousePressed() {
  if (mouseY > 0.7 * windowHeight) {
    flowerColorRed = floor(random(0, 255));
    flowerColorGreen = floor(random(0, 255));
    flowerColorBlue = floor(random(0, 255));
    addFlower(mouseX, mouseY, flowerColorRed, flowerColorGreen, flowerColorBlue);
    socket.emit('flower', mouseX, mouseY, flowerColorRed, flowerColorGreen, flowerColorBlue);
  } else if (mouseY < 0.7 * windowHeight && y > 0) {
    cloudColorRed = floor(random(0, 255));
    cloudColorGreen = floor(random(0, 255));
    cloudColorBlue = floor(random(0, 255));
    addCloud(mouseX, mouseY, cloudColorRed, cloudColorGreen, cloudColorBlue);
    socket.emit('cloud', mouseX, mouseY, cloudColorRed, cloudColorGreen, cloudColorBlue);
  } else if (mouseY < 0.7 * windowHeight && y < 0) {
    starColorRed = floor(random(0, 255));
    starColorGreen = floor(random(0, 255));
    starColorBlue = floor(random(0, 255));
    addStar(mouseX, mouseY, starColorRed, starColorGreen, starColorBlue);
    socket.emit('star', mouseX, mouseY, starColorRed, starColorGreen, starColorBlue);
  }
}

function keyPressed(){
  if(keyCode===32){
    clearAll();
    socket.emit('clear');
  }
}

function clearAll(){
  star = [];
  cloud = [];
  flower = [];
}

// function addCloud(cloudx, cloudy, i) {
//   push();
//   num = random(80, 90);
//   noStroke();
//   fill(200, 200, 255);
//   ellipse(cloudx + i, cloudy, num * 2, num);
//   i += 5;
//   pop()
// }

// function keyPressed() {
//   randomX = Math.floor(random(0,windowWidth));
//   randomY = Math.floor(random(0,windowHeight));
//   strokeR = Math.floor(random(0,200));
//   strokeG = Math.floor(random(0,200));
//   strokeB = Math.floor(random(0,200));
//   stroke(strokeR,strokeG,strokeB);
// }

// function mousePressed() {
//   if (mouseY <= windowHeight / 2) {
//     var diameter = dist(mouseX, mouseY, windowWidth / 2, windowHeight - 200);
//     if (diameter > 400) {
//       j = mouseX;
//       k = mouseY;
//       i = 0;
//       addCloud(j, k, i);
//     }
//   }
// }
