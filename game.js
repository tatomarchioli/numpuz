function createGame() {
  const PIECES = [
    { name: "1", element: null },
    { name: "2", element: null },
    { name: "3", element: null },
    { name: "4", element: null },
    { name: "5", element: null },
    { name: "6", element: null },
    { name: "7", element: null },
    { name: "8", element: null },
    { name: "", blank: true, element: null },
  ];
  
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const createPicesElements = (pieces) => {
    let table = document.getElementById("table");
    table.innerHTML = '';
    
    return pieces.map((piece) => {
      if (piece.blank) {
        const div = document.createElement("div");
        div.id = 'blank';
        div.className = "blank";
        div.innerHTML = `&nbsp;`;
        piece.element = div;
        table.appendChild(div);
        
      } else {
        const div = document.createElement("div");
        div.id = piece.name;
        div.className = "piece";
        div.innerHTML = `${piece.name}`;
        piece.element = div;
        table.appendChild(div);
      }
      return piece;
    });
  }
    
  const fillTable = () => {
    return createPicesElements([...shuffle(PIECES.slice(0, 8)), PIECES[8]]);
  }

  const canMove = (index, bIndex) => {
    console.log(`trying to move ${index} to ${bIndex}`)
    switch (index) {
      case 0: {
        return bIndex == 1 || bIndex == 3;
      }
      case 1: {
        return bIndex == 0 || bIndex == 2 || bIndex == 4;
      }
      case 2: {
        return bIndex == 1 || bIndex == 5;
      }
      case 3: {
        return bIndex == 0 || bIndex == 4 || bIndex == 6;
      }
      case 4: {
        return bIndex == 1 || bIndex == 3 || bIndex == 5 || bIndex == 7;
      }
      case 5: {
        return bIndex == 2 || bIndex == 4 || bIndex == 8;
      }
      case 6: {
        return bIndex == 3 || bIndex == 7;
      }
      case 7: {
        return bIndex == 4 || bIndex == 6 || bIndex == 8;
      }
      case 8: {
        return bIndex == 5 || bIndex == 7;
      }
    }
  }
    
  return {
    pieces: fillTable(),
    needToDraw: true,
    getBlank() {
      let blank = this.pieces.find(p => p.blank);
      let bIndex = this.pieces.indexOf(blank);
      return {blank, bIndex}
    },
    move(id) {
      const index = this.pieces.findIndex(p => p.name == id);
      const { blank, bIndex } = this.getBlank();
      if (!canMove(index, bIndex)) {
        alert("can't move this pieace")
        return;
      }
      const piece = this.pieces[index];
      this.pieces[bIndex] = piece;
      this.pieces[index] = blank;
      this.needToDraw = true;
    },
  }
}

//game loop
let game;
const preDraw = function () {
  game = createGame();
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('piece')) {
      game.move(e.target.id);
    }
  })
};

const draw = function () {
  if (game.needToDraw) {
    game.needToDraw = false;
    game.pieces.forEach((p, i) => {
      let col = i == 0 || i == 3 || i == 6 ? 0 :
        i == 1 || i == 4 || i == 7 ? 1 : 2;
      let row = i > 5 ? 2 : i > 2 ? 1 : 0;

      p.element.style.transform = `translate(${col * p.element.offsetWidth}px, ${row * p.element.offsetHeight}px)`;
    });
  }
};

window.onload = function () {
  preDraw();
  draw();
  setInterval(() => draw(), 300);
};
