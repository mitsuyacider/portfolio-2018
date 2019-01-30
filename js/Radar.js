var degree;
var initRadius = 150;
let p5;
var radiusList = []


export function main(_p5) {
  p5 = _p5

  p5.setup = _ => {
    console.log(screen.width)
    var canvas;
    if (screen.width <= 768) {
      canvas = p5.createCanvas(320, 320)
      initRadius = 100
    } else {
      canvas = p5.createCanvas(500, 500)
    }

    canvas.parent("p5Canvas")

    p5.smooth();
    p5.noFill();
    degree = 0;
    
    var num = 360
    var angle = p5.radians(360 / num);
    for (var i=0; i < 50; i++){		 
      var x = (p5.random(0, 50) + initRadius);
      var y = (p5.random(0, 50) + initRadius);
      var vec = p5.createVector(x, y)
      radiusList.push(vec)
    }
    
    p5.frameRate(10)
  }

  p5.draw = _ => {
    p5.background(220);
    drawCircle();
  }
}

export function killAnimation() {
  p5.noLoop();
  p5.noCanvas();  
}

function drawCircle() {
  // init form
  var centerX = p5.width / 2; 
  var centerY = p5.height / 2;
  degree++;

  p5.push();
  p5.translate(centerX, centerY);
  var formResolution = 15;
  var angle = p5.radians(360 / formResolution);  

  for (var j = 0; j < 20; j++) {
    p5.beginShape();
    p5.stroke(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255), p5.random(20, 100));
    for (var i=0; i < 50; i++){
      const r = initRadius + 20 * p5.sin( p5.radians(8 * i * angle))			
      const radian = p5.radians(i * angle)
      var x = p5.cos(angle * i * degree / 2) * (radiusList[i].x + p5.cos(p5.radians(degree * 5)) * 10)
      var y = p5.sin(angle * i * degree / 2) * (radiusList[i].y + p5.cos(p5.radians(degree * 5)) * 10)

      p5.curveVertex(x, y);  
    }
    p5.endShape();  
  }

  p5.pop();
}
