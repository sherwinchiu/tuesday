let red = 255;
let green = 0;
let blue = 0;
let dr = 0;
let dg = 1;
let db = 0;

function updateColours() {
  //colours
  let root = document.documentElement;
  red += dr;
  green += dg;
  blue += db;
  if(red >= 255 && green <= 0) {
    dr = 0;
    dg = 1;
    db = 0;
  }else if(red <= 0 && green >= 255 && blue <= 0) {
    dr = 0;
    dg = 0;
    db = 1;
  }else if(red <= 0 && green <= 0 && blue >= 255) {
    dr = 1;
    dg = 0;
    db = 0;
  }else if(red >= 255 && green >= 255) {
    dr = -1;
    dg = 0;
    db = 0;
  }else if(blue >= 255 && green >= 255) {
    dr = 0;
    dg = -1;
    db = 0;
  }else if(red >= 255 && blue >= 255) {
    dr = 0;
    dg = 0;
    db = -1;
  }else if(red >= 255 && blue <= 0) {
    dr = 0;
    dg = 1;
    db = 0;
  }
  root.style.setProperty('--red', red);
  root.style.setProperty('--green', green);
  root.style.setProperty('--blue', blue);
  setTimeout(updateColours, 1);
}
updateColours();