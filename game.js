const table = [];

let pieces = [
  { name: "1"},
  { name: "2"},
  { name: "3"},
  { name: "4"},
  { name: "5"},
  { name: "6"},
  { name: "7"},
  { name: "8"},
  { name: "", blank: true },
];

function shuffle(array) {
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

const fillTable = function () {
  pieces = [...shuffle(pieces.slice(0, 8)), pieces[8]];
};

const move = function (index) {
  if (!isMovable(index)) {
    alert("can't move this pieace")
    return;
  }

  let blank = pieces.find(p => p.blank);
  let bIndex = pieces.indexOf(blank);
  let piece = pieces[index];

  pieces[bIndex] = piece;
  pieces[index] = blank;

  draw();
};

const isMovable = function (index) {
  let blank = pieces.find((p) => p.blank);
  let bIndex = pieces.indexOf(blank);
  console.log({bIndex, index})

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
};

//game loop

const preDraw = function () {
  fillTable();
};

const draw = function () {
  let table = document.getElementById("table");
  table.innerHTML = '';

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];

    if (piece.blank) {
      const div = document.createElement("div");
      div.className = "blank";
      div.innerHTML = `<span>&nbsp;</span>`;
      table.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.onclick = () => move(i);  
      div.className = "piece";
      div.innerHTML = `<span>${piece.name}</span>`;
      table.appendChild(div);
    }
  }
};

window.onload = function () {
  preDraw();
  draw();
  //setInterval(() => draw(), 300);
};
