// Function for responsiv Canvases b
let guideStroke = [255, 0, 255];
let guideFill = [122, 0, 122];

let vaseStroke = [255, 255, 0];
let vaseFill = [122, 122, 0];
 
function getCvsWidth(cvs) {
  var cs = getComputedStyle(cvs);

  var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

  var borderX =
    parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
  var borderY =
    parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

  // Element width and height minus padding and border
  let elementWidth = cvs.offsetWidth - paddingX - borderX;
  let elementHeight = cvs.offsetHeight - paddingY - borderY;

  let cvsW = elementWidth;

  return cvsW;
}

// Get Random Number
function getRndNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

let vaseGuides = [];

let mastersRanges = [
  { id: "lip", x: { min: 15, max: 40 }, y: { min: -1, max: 0 } },
  { id: "neck", x: { min: 25, max: 40 }, y: { min: 10, max: 30 } },
  { id: "shoulder", x: { min: 40, max: 50 }, y: { min: 30, max: 60 } },
  { id: "body", x: { min: 60, max: 80 }, y: { min: 60, max: 80 } },
  { id: "fillet", x: { min: 12, max: 18 }, y: { min: 80, max: 90 } },
  { id: "foot", x: { min: 20, max: 50 }, y: { min: 100, max: 100 } },
];

function getRndGuideValues() {
  vaseGuides = [];
  mastersRanges.forEach((guide, i) => {
    let id = guide.id;

    let y;

    if (guide.y.max > 0) {
      y = getRndNumber(guide.y.min, guide.y.max);
    } else {
      y = 0
    }

    let x = getRndNumber(guide.x.min, guide.x.max);
    
    
    

    vaseGuides.push({ id: id, x: x, y: y });
  }); 
}

getRndGuideValues(); 


console.log("Master Values: ", vaseGuides);

reloadButton.onclick = () => {
  console.log("RELOAD");
  getRndGuideValues(); 
  calculateSlices(vaseGuides);
}

let vase = {
  parts: [],
  slices: []
}

let cutCount;
function calculateSlices(vaseGuides) {
  vase = {
    parts: [],
    slices: [],
  };

  let sliceCount = document.querySelector("#sliceCount").value;
  cutCount = document.querySelector("#cutCount").value;
  let singleSliceHeight = 100 / sliceCount
  
  let sortedSlices = []

  vaseGuides.forEach((vaseGuide, i) => {
    if (i + 1 === vaseGuides.length) {
      nextGuide = vaseGuide
    } else {
      nextGuide = vaseGuides[i + 1];

    }
    
    let part = {
      id: vaseGuide.id,
      slices: []
    }

    let bot = vaseGuide.y
    let top = nextGuide.y

    let botW = vaseGuide.x
    let topW = nextGuide.x

    // console.log(bot, top, botW, topW)

    range = top - bot
    // console.log(vaseGuide.id)
    // console.log(bot, top)
    function mapHeight(value, valueMin, valueMax, resultMin, resultMax) {
     return ((value-valueMin)/(valueMax-valueMin)*(resultMax-resultMin)+resultMin)

      // return (value - valueMin) * range / 100;
    }
    
    for (let b = 0; b <= sliceCount; b++) {
      
      let sliceHeight = b * singleSliceHeight;
      
      if (sliceHeight >= bot && sliceHeight <= top) {

        // console.log(vaseGuide.id, sliceHeight);
        let y = sliceHeight;
        let x = mapHeight(sliceHeight, bot, top, botW, topW)

        function sinOffset() {
          return -Math.sin(sliceHeight * 0.1) * 20;
        }

        function cosOffset() {
          return -Math.cos(sliceHeight * 0.1) * 20;
        }

        function testOffset() {
          return (
            (Math.sin(((-2 * (2 * Math.PI)) / 100) * sliceHeight) * 6)
            - (Math.cos(((8 * (2 * Math.PI)) / 100)) * x/6)
          );
        }
        
        // let xOffset = 0;
        let xOffset = testOffset();


        slice = {
          y: y,
          x: x + xOffset
        }

        part.slices.push(slice);
      }
    };
    vase.parts.push(part);

  });

  vase.parts.forEach((part, i) => {
    part.slices.forEach((slice, i) => {
      vase.slices.push(slice)
    });
  });

  console.log("VASE CREATED: ", vase)
}

sliceCount.onchange = () => {
  calculateSlices(vaseGuides);
  // sliceCounter.value = sliceCount.value
};

calculateSlices(vaseGuides);

