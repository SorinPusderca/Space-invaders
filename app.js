const box = document.querySelector(".box");
let displayText = document.querySelector(".text");
const scoreNumber = document.getElementById('score');
let shipIndex = 182;
const width = 14;
let test = 1;
let invaderId;
let testRight = true;

for (let i = 0; i < 210; i++) {
  const square = document.createElement("div");
  box.appendChild(square);
}

const square = Array.from(document.querySelectorAll(".box div"));

const invaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
];

// /////////////////MOVE-REMOVE////////////////
// /////////////////MOVE-REMOVE////////////////
// /////////////////MOVE-REMOVE////////////////

function paint() {
  for (let i = 0; i < invaders.length; i++) {
    square[invaders[i]].classList.add("alien");
  }
}
paint();

function remove() {
  for (let i = 0; i < invaders.length; i++) {
    square[invaders[i]].classList.remove("alien");
  }
}
//remove();
square[shipIndex].classList.add("ship");

// /////////////////SHIP////////////////
// /////////////////SHIP////////////////
// /////////////////SHIP////////////////

function battleShip(e) {
  square[shipIndex].classList.remove("ship");
  switch (e.key) {
    case "ArrowRight":
      if (shipIndex % width < width - 1) shipIndex += 1;
      break;
    case "ArrowLeft":
      if (shipIndex % width !== 0) shipIndex -= 1;
      break;
  }
  square[shipIndex].classList.add("ship");
}

document.addEventListener("keydown", battleShip);

// /////////////////BULLET//////////////
// /////////////////BULLET//////////////
// /////////////////BULLET//////////////

function fire(e) {
  let bulletId;
  let bulletIndex = shipIndex;
  function fireBullet() {
    const indx = invaders?.indexOf(bulletIndex);
    const alienIsAlive =
      indx >= 0 ? square[invaders[indx]]?.classList.contains("alien") : false;
    if (invaders.includes(bulletIndex) && alienIsAlive) {
      clearInterval(bulletId);
      square[bulletIndex].classList.remove("bullet");
      const indx = invaders.indexOf(bulletIndex);
      square[invaders[indx]].classList.remove("alien");
      play();
      return;
    }
    if (bulletIndex >= width) {
      square[bulletIndex].classList.remove("bullet");
      bulletIndex -= width;
      square[bulletIndex].classList.add("bullet");
    } 
    else {
      square[bulletIndex].classList.remove("bullet");
      clearInterval(bulletId);
    }
  }

  function calculateScore() {
    const aliveInvaders = invaders.filter(alien => square[alien].classList.contains('alien'));
    const score = invaders.length - aliveInvaders.length;
    scoreNumber.innerText = score;
    if(score === invaders.length){
        clearInterval(invaderId);
        box.innerHTML = null;
        box.innerHTML = '<div><h4>TOP GUN</h4></div>';
        box.style = "color: red;";

    }
  }

  if (e.keyCode === 32) {
    bulletId = setInterval(() => {
      fireBullet();
      calculateScore();
    }, 100);
  }
}

document.addEventListener("keydown", (e) => {
  fire(e);
  //audio
});

///////////////////SOUND///////////////////
///////////////////SOUND///////////////////
///////////////////SOUND///////////////////

function play() {
  var audio = new Audio("./sound/explosionAlien1.wav");
  audio.play();
}

// function playTwo() {
//     var audio = new Audio("./sound/mixkit-arcade-space-shooter-dead-notification-272.wav")
//     audio.playTwo();
//  }

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 32) {
    document.getElementById("audio").play();
  }
});


///////////////////MOTION///////////////////
///////////////////MOTION///////////////////
///////////////////MOTION///////////////////

function move() {
  const left = invaders[0] % width === 0;
  const right = invaders[invaders.length - 1] % width === width - 1;
  const aliensStatusBeforeMove = []
  for (let i = 0; i < invaders.length; i++) {
    if(square[invaders[i]].classList.contains('alien'))aliensStatusBeforeMove.push({index: i, class: 'alien'})
    else aliensStatusBeforeMove.push({index: i, class: ''})
  }
  remove();
  if (right && testRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1;
      test = -1;
      testRight = false;
    }
  }
  if (left && !testRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1;
      test = 1;
      testRight = true;
    }
  }
  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += test;
  }

  //////////////repaint after move aliens/////////////////////
    
    aliensStatusBeforeMove.forEach((alien, i)=>{
        if( square[invaders[alien.index]].classList.contains('ship')){
            // displayText.innerHTML = "hahahah";
            // clearInterval(invaderId);
            clearInterval(invaderId);
            box.innerHTML = null;
            box.innerHTML = '<div><h3>HA-HA LOSER</h3></div>';
            // box.style = "color: red; margin: auto;";
            // playTwo();
        }
        else square[invaders[alien.index]].className = alien.class

    })
  
}
invaderId = setInterval(move, 700);

