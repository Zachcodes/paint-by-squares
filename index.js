let colorOption = 'white';
let drawing = false;
let squareClass = 'square-small';
let resizing;

let smallSquare = {
  height: 20,
  width: 20
};

let mediumSquare = {
  height: 40,
  width: 40
};

let largeSquare = {
  height: 60,
  width: 60
};

let selectedSquare = smallSquare;

document.addEventListener('mousedown', drawStart);
document.addEventListener('mouseup', drawEnd);

let canvas = document.querySelector('#canvas');
let colorSpan = document.querySelector('#color-span');
let colorButtonContainer = document.querySelector('#color-button-container');
colorButtonContainer.addEventListener('click', changeShownColor);
let body = document.querySelector('body');
window.addEventListener('resize', redrawCanvas);
let bodyHeight = body.clientHeight;

function redraw(newSquareClass) {
  if (newSquareClass && newSquareClass !== squareClass) {
    let squares = document.querySelectorAll(`.${squareClass}`);
    for (let i = 0; i < squares.length; i++) {
      squares[i].remove();
    }
    squareClass = newSquareClass;
    switch (newSquareClass) {
      case 'square-small':
        selectedSquare = smallSquare;
        break;
      case 'square-medium':
        selectedSquare = mediumSquare;
        break;
      case 'square-large':
        selectedSquare = largeSquare;
        break;
      default:
        break;
    }
  }
  let fillSpace = true;
  let removeSquares = false;
  if (canvas.childNodes.length) {
    let lastElement = canvas.childNodes[canvas.childNodes.length - 1];
    if (lastElement.offsetTop + selectedSquare.height > bodyHeight) {
      fillSpace = false;
      removeSquares = true;
    }
  }
  while (fillSpace) {
    fillSpace = createSquare();
  }
  if (removeSquares) {
    for (let i = canvas.childNodes.length - 1; i--; i >= 0) {
      if (canvas.childNodes[i].offsetTop + selectedSquare.height > bodyHeight) {
        canvas.childNodes[i].remove();
      } else {
        canvas.childNodes[i].remove();
        break;
      }
    }
  }
}
redraw();
function createSquare() {
  let newSquare = document.createElement('span');
  newSquare.classList.add(squareClass);
  newSquare.addEventListener('mouseover', changeColor);
  canvas.append(newSquare);
  if (newSquare.offsetTop + selectedSquare.height < bodyHeight) return true;
  else {
    console.log(selectedSquare);
    console.log(
      'newSquare.offsetTop + selectedQuare',
      newSquare.offsetTop + selectedSquare.height
    );
    newSquare.remove();
    return false;
  }
}

function changeShownColor(e) {
  let attributes = e.target.attributes;
  if (attributes.selectedColor) {
    colorOption = attributes.selectedColor.value;
    colorSpan.style.backgroundColor = attributes.selectedColor.value;
  } else {
    console.log('no selected color');
  }
}

function drawStart() {
  drawing = true;
}

function drawEnd() {
  drawing = false;
}

function changeColor(e) {
  if (e.target.classList.contains(squareClass) && drawing) {
    e.target.style.backgroundColor = colorOption;
  }
}

function redrawCanvas() {
  if (resizing) {
    clearTimeout(resizing);
    resizing = setTimeout(redraw, 500);
  } else {
    resizing = setTimeout(redraw, 500);
  }
}

function resetSpace() {
  let squares = document.querySelectorAll(`.${squareClass}`);
  if (squares.length) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = 'white';
    }
  }
  colorOption = 'white';
}

function resizeSquares(newSquareClass) {
  redraw(newSquareClass);
}
