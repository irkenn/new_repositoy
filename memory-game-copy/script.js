const gameContainer = document.getElementById("game");
let pick1 = undefined;
let pick2 = undefined;
let pick1Color = undefined;
let pick2Color= undefined;
let seconds = 0;
let matchCounter = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  let individualID = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.classList.add(color, "flipped", "unblocked");
    newDiv.id = individualID;
    newDiv.addEventListener("click", handleCardClick); //this links the listener to the function
    gameContainer.append(newDiv);
    individualID ++;
  }
}

function handleCardClick(event){  
  event.preventDefault();
  const cards = gameContainer.querySelectorAll(".unblocked");
  //returns the color of the selected <div>
  function whichColor(){
      for (let color of COLORS){
        if (event.target.classList.contains(color)){
          return color;
        }
      }
    }
  //Removes a classNames
  function removeUnblocked(){
    cards.forEach(card =>{
      card.classList.remove("unblocked");
      }
    );
  }  
  //Adds a className, toggle didn't worked well
  function addUnblocked(){
    cards.forEach(card =>{
      card.classList.add("unblocked");
      }
    );
  }  
  //Pick No. 2
  if (
    pick1 != undefined &&
    pick1.id != event.target.id && 
    event.target.classList.contains("unblocked") &&
    event.target.tagName === "DIV"
    ){
      pick2 = event.target;
      pick2Color = whichColor();
      pick2.classList.remove("flipped");
    }
  //Pick NO. 1
  if (
    pick1 === undefined &&
    event.target.classList.contains("unblocked") &&
    event.target.tagName === "DIV"
    ){
      pick1 = event.target;
      pick1Color = whichColor(); 
      pick1.classList.remove("flipped");
      }
  //Match case
  if (
    pick1Color === pick2Color &&
    pick1.id != pick2.id
    ){
      //remove listeners
      pick1.removeEventListener("click", handleCardClick);
      pick2.removeEventListener("click", handleCardClick);
      //reset variables
      pick1 = undefined;
      pick2 = undefined;
      pick1Color = undefined;
      pick2Color = undefined;
      //Add to the counter
      matchCounter ++;
      
      }
  //Unmatch case
  if(
    pick1 != undefined &&
    pick2 != undefined &&
    pick1Color != pick2Color
    ){
      removeUnblocked();
      let timerId = setTimeout(function(){
        pick1.classList.add("flipped");
        pick2.classList.add("flipped");
        addUnblocked();
        console.log("The timeout has run");  
        pick1 = undefined;
        pick2 = undefined;
        pick1Color = undefined;
        pick2Color = undefined;
        console.log("Pick resetted");
        },700); 
    }
  
  if(matchCounter === (COLORS.length/2)){
    setTimeout(function(){
      alert(`Congratulations, you matched all cards!`)
      },200);
    }  
  }
createDivsForColors(shuffledColors);