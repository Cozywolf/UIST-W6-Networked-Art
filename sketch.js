var theta1;
var theta2;
var randomX;
var randomY;
var strokeR;
var strokeG;
var strokkB;
var leafRed, leafGreen;
var img;

var ang = 0;
var angle = ang + Math.PI/2; //largest sine value for largest sun size
var d;
var x;
var y;
var r;
var g;
var b;
var dk;
var j, k;
var i=0;
var swing=0;
var map1 = 400;
var map2 = 400;
var leafchange = 0;
var leafRed;
var leafGreen;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // randomX = Math.floor(random(0,windowWidth-200));
  // randomY = Math.floor(random(0,windowHeight-200));
  stroke(153, 102, 51);
}

function draw() {
  d = 0.45 * windowWidth;
  x = d * cos(ang);
  y = d * sin(ang);

// sky color change
  if(y > 0) {
		background(r, g, b);
	}
	else {
		background(dk, dk, dk);
  }

//sun size and location
  push();
  cloud();
  pop();

  push();
  translate(windowWidth / 2 ,windowHeight);
  var d1 = 50 + (sin(angle) * windowWidth/35) + windowWidth/35;
  push();
  fill(250, 147, 45);
  stroke(252, 252, 192);
  ellipse(x, -y, d1, d1);

// moon size and location
  fill(255, 204, 0);
  stroke(255, 204, 0);
  arc(-x, y, d1, d1, PI / 4, PI+QUARTER_PI, CHORD);
  pop();

  angle += PI / 187.5;
  ang += PI / 375;

  r = 250;
  g = 245;
  b = 192+ (1- Math.abs(x / 560)) * 63;
  dk = Math.abs(x / 560) * 150;

  if (swing <50){
    map1+=10;
    map2-=10;
    swing++;
  }
  else if (swing >= 50 && swing < 100){
    map1-= 10;
    map2+= 10;
    swing++;
  }
  else if (swing >= 100 && swing < 150){
    map1-= 10;
    map2+= 10;
    swing++;
  }
  else if (swing >= 150 && swing < 200){
    map1+= 10;
    map2-= 10;
    swing++;
  }
  else if (swing = 200){
    swing = 0;
  }

  theta1 = map(map1,0,width,PI/8,PI/4.5);
  theta2 = map(map2,0,height,PI/8,PI/4.5);

  push();
  branch(200,20);
  pop();

  pop();


}


// Each branch now receives its length as an argument.
function branch(len, thick) {
  if (thick > 1){
  strokeWeight(thick);
  }
  else{
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
    branch(len,thick);
    //branch(len);
    pop();

    push();
    rotate(-theta2);
    branch(len,thick);
    //branch(len);
    pop();
  }

  else{
  // if (leafchange <50){
  //   leafRed+=1;
  //   leafGreen-=1;
  //   leafchange++;
  // }
  // else if (leafchange >= 50 && leafchange < 100){
  //   leafRed-= 1;
  //   leafGreen+= 1;
  //   leafchange++;
  // }
  // else if (leafchange >= 100 && leafchange < 150){
  //   leafRed-= 1;
  //   leafGreen+= 1;
  //   leafchange++;
  // }
  // else if (leafchange >= 150 && leafchange < 200){
  //   leafRed+= 1;
  //   leafGreen-= 1;
  //   leafchange++;
  // }
  // else if (leafchange = 200){
  //   leafchange = 0;
  // }
    leafRed = floor(y%255);
    if (leafRed < 0){
      leafRed = -1*leafRed;
    }

    leafGreen = floor(x%255);
    if (leafGreen < 0){
      leafGreen = -1*leafGreen;
    }

    fill(leafRed, leafGreen,0);
    noStroke();
    var a = random(50,100);
    if(y > 0) {
      ellipse(0,0,a,0.45 * a);
    }
    else
      ellipse(0,0,a,3);
    }
}

function cloud() {
num = random(80, 90);
noStroke();
fill(200, 200, 255);
ellipse(j+i, k, num*2, num);
i+=5;
}

// function keyPressed() {
//   randomX = Math.floor(random(0,windowWidth));
//   randomY = Math.floor(random(0,windowHeight));
//   strokeR = Math.floor(random(0,200));
//   strokeG = Math.floor(random(0,200));
//   strokeB = Math.floor(random(0,200));
//   stroke(strokeR,strokeG,strokeB);
// }



function mousePressed() {
  if (mouseY <= windowHeight/2){
    var diameter = dist(mouseX,mouseY,windowWidth/2, windowHeight-200);
    if(diameter>400){
    j = mouseX;
    k = mouseY;
    i = 0;
    }
  }
}
