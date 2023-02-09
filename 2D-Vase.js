// 2D Vase
let sketch1 = function (sketch) {
  let cvs = cvs1;
  // console.log(cvs);
  let cvsW = getCvsWidth(cvs);
  let cvsH = getCvsWidth(cvs);

  let bgFill = 60

  sketch.setup = function () {
    
    // console.log(cvs);
    let canvas = sketch.createCanvas(cvsW, cvsH);
    cvs.prepend(canvas.elt);
    console.log(`Canvas 1 created size: ${cvsW} ${cvsW}`);
  };

  sketch.draw = function () {
    let sliceCount = document.querySelector("#sliceCount").value;
    let activeVaseGuides = vaseGuides;
    

    //for canvas 1
    sketch.background(bgFill);

    if (gridButton.ariaPressed == "true") {
      drawGrid();
    }

    if (guideShapeButton.ariaPressed == "true") {
      drawShape(activeVaseGuides, guideFill, guideStroke);
    }

    if (guideButton.ariaPressed == "true") {
      drawGuides(activeVaseGuides, guideStroke);
    }

    if (vaseButton.ariaPressed == "true") {
      drawShape(vase.slices, vaseFill, vaseStroke);
    }

    if (slicesButton.ariaPressed == "true") {
      drawGuides(vase.slices, vaseStroke);
    }

     

    



    function drawGuides(sliceArray, sColor) {
      // console.log("Vase Guides: ", activeVaseGuides)
      // Draw Vase Guides
      sliceArray.map((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;

        let x2 = centerW + ((cvsW / 100) * d.x) / 2;
        let y2 = (cvsH / 100) * d.y;
        // console.log(d)
        sketch.push();
        sketch.strokeWeight(3);
        sketch.stroke(sColor);
        sketch.line(x1, y1, x2, y2);
        sketch.pop();

        // // desciption
        // sketch.push();
        // // if (y1 >= cvsH) {
        // //   sketch.translate(0, -6);
        // // } else if (this.h <= 0) {
        // //   sketch.translate(0, 10);
        // // }
        // // if (x1 >= cvsW * 0.8) {
        // //   console.log("Translate Info");
        // //   sketch.translate(-80, 0);
        // // }
        // sketch.translate(3, 0);
        // sketch.textSize(10);
        // let displayText = "    " + sketch.round(x1) + " / " + sketch.round(y1);
        // sketch.text(displayText, x2, y2);
        // sketch.pop();

        
      });
    }

    function drawShape(sliceArray, fColor,sColor) {
      // Draw Vase Shape
      sketch.push();
      sketch.strokeWeight(1);
      sketch.stroke(sColor);
      sketch.fill(fColor);
      sketch.beginShape();

      sliceArray.forEach((d, i) => {
        let centerW = cvsW / 2;
        let x1 = centerW - ((cvsW / 100) * d.x) / 2;
        let y1 = (cvsH / 100) * d.y;
        sketch.vertex(x1, y1);
      });

      sliceArray
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
