// Function for responsiv Canvases b
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

let vaseGuides = [
  { id: "lip", x: getRndNumber(20, 80), y: 0 },
  { id: "body", x: getRndNumber(20, 80), y: 80 },
  { id: "foot", x: getRndNumber(20, 80), y: 100 },
];

console.log("Master Values: ", vaseGuides);

reloadButton.onclick = () => {
  console.log("RELOAD");
  vaseGuides = [
    { id: "lip", x: getRndNumber(20, 80), y: 0 },
    { id: "body", x: getRndNumber(20, 80), y: 80 },
    { id: "foot", x: getRndNumber(20, 80), y: 100 },
  ];
};


