// 2D Vase
let sketch1 = function (sketch) {
  let cvs = cvs1;
  console.log(cvs);
  let cvsW = getCvsWidth(cvs);
  let cvsH = getCvsWidth(cvs);

  sketch.setup = function () {
    console.log(cvs);
    let canvas = sketch.createCanvas(cvsW, cvsH);
    cvs.prepend(canvas.elt);
    console.log(`Canvas 1 created size: ${cvsW} ${cvsW}`);
  };

  sketch.draw = function () {
    let sliceCount = document.querySelector("#sliceCount").value;
    let vg = vaseGuides;
    

    //for canvas 1
    sketch.background(60);

    if (gridButton.ariaPressed == "true") {
      drawGrid();
    }

    if (guideShapeButton.ariaPressed == "true") {
      drawGuideShape();
    }

    if (guideButton.ariaPressed == "true") {
      drawGuides();
    }

    function drawGuides() {
      
      // console.log("Vase Guides: ", vg)
      // Draw Vase Guides
      vg.map((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;

        let x2 = centerW + ((cvsW / 100) * d.x) / 2;
        let y2 = (cvsH / 100) * d.y;
        // console.log(d)
        sketch.push();
        sketch.strokeWeight(3);
        sketch.stroke(255, 0, 255);
        sketch.line(x1, y1, x2, y2);
        sketch.pop();
      });
    }

    function drawGuideShape() {
      // Draw Vase Shape
      sketch.push();
      sketch.strokeWeight(1);
      sketch.stroke(255, 0, 255);
      sketch.fill(122, 0, 122);
      sketch.beginShape();

      vg.forEach((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;
        sketch.vertex(x1, y1);
      });

      vg
        .slice(0)
        .reverse()
        .forEach((d, i) => {
          let centerW = cvsW / 2;
          let x2 = centerW + ((cvsW / 100) * d.x) / 2;
          let y2 = (cvsH / 100) * d.y;
          sketch.vertex(x2, y2);
        });

      sketch.endShape();
      sketch.pop();
    }

    function drawGrid() {
      // Draw Grid
      sketch.push();
      for (let y = 0; y < cvsH; y += cvsH / sliceCount) {
        sketch.stroke(120);
        sketch.line(0, y, cvsW, y);
      }
      // Draw center line
      sketch.stroke(90);
      sketch.line(cvsW / 2, 0, cvsW / 2, cvsH);
      sketch.pop();
    }
  };

  sketch.windowResized = function () {
    let cvsW = getCvsWidth(cvs);
    let cvsH = getCvsWidth(cvs);
    sketch.resizeCanvas(cvsW, cvsH);
  };
};

new p5(sketch1);
