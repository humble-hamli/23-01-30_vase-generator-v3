// 3D Vase
var sketch2 = function (sketch) {
  let cvs = cvs2;
  let cvsW = getCvsWidth(cvs);
  let cvsH = getCvsWidth(cvs);
  sketch.setup = function () {
    let canvas = sketch.createCanvas(cvsW, cvsH, sketch.WEBGL);
    cvs.prepend(canvas.elt);
    console.log(`Canvas 2 created size: ${cvsW} ${cvsH}`);
    sketch.push();
    sketch.stroke(120, 120, 120);
    sketch.debugMode();
    sketch.pop();
  };
  sketch.draw = function () {
    sketch.orbitControl();
    //for canvas 1
    sketch.background(100);
    // sketch.rotateX(sketch.frameCount * 0.01);
    // sketch.rotateZ(sketch.frameCount * 0.01);
    sketch.cone(20, 20);

    let dimension = 200;
    let cvsW = dimension;
    let cvsH = dimension;
    let centerW = cvsW / 2;
    let z = 0;

    sketch.push();
    sketch.translate(-centerW, -cvsH);

    drawGrid();
    drawGuides();
    drawGuideShape();

    sketch.pop();

    function drawGrid() {
      // Draw Grid
      // sketch.push();
      // sketch.line(0, y, 0, cvsW, y, 0);
      // sketch.pop();
    }

    function drawGuides() {
      // Draw Vase Guides
      vaseGuides.map((d, i) => {
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;

        let x2 = centerW + ((cvsW / 100) * d.x) / 2;
        let y2 = (cvsH / 100) * d.y;
        // console.log(d)
        sketch.push();
        sketch.strokeWeight(3);
        sketch.stroke(255, 0, 255);
        sketch.line(x1, y1, z, x2, y2, z);
        sketch.pop();
      });
    }

    function drawGuideShape() {
      let centerW = cvsW / 2;

      // Draw Vase Shape
      sketch.push();
  
      sketch.stroke(255, 0, 255);
      sketch.strokeWeight(10);
      sketch.fill(122, 0, 122);
      // sketch.noFill()
      sketch.beginShape();

      vaseGuides.forEach((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;
        sketch.vertex(x1, y1);
      });

      vaseGuides
        .slice(0)
        .reverse()
        .forEach((d, i) => {
          let centerW = cvsW / 2;
          let x2 = centerW + ((cvsW / 100) * d.x) / 2;
          let y2 = (cvsH / 100) * d.y;
          sketch.vertex(x2, y2);
        });
      
      vaseGuides
        .slice(0)
        .reverse()
        .forEach((d, i) => {
          let centerW = cvsW / 2;
          let x2 = centerW + ((cvsW / 100) * d.x) / 2;
          let y2 = (cvsH / 100) * d.y;
          sketch.vertex(x2, y2, 100);
        });
      
      
      vaseGuides.forEach((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;
        sketch.vertex(x1, y1, 100);
      });

      
      
      
      
      
      // let x1 = centerW - ((cvsW / 100) * vaseGuides[0].x) / 2;
      // let y1 = (cvsH / 100) * vaseGuides[0].y;
      // sketch.vertex(x1, y1);

      sketch.endShape();
      sketch.pop();
    }
  };

  sketch.windowResized = function () {
    let cvsW = getCvsWidth(cvs);
    let cvsH = getCvsWidth(cvs);
    sketch.resizeCanvas(cvsW, cvsH);
    console.log(`Resized to size: ${cvsW} ${cvsH}`);
  };
};

new p5(sketch2);
