const gameContainer = document.getElementById("game");

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
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.innerHTML='click me?';
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}




//function for checking matching div boxes
function matching(prevEvent,event){
  let matchedBox=parseInt(sessionStorage.getItem("matched"));
  if(window.getComputedStyle(event.target).backgroundColor===window.getComputedStyle(prevEvent.target).backgroundColor) {
    event.target.innerText=`matched `;
    prevEvent.target.innerText=`matched`;
    event.target.className="matched"
    prevEvent.target.className="matched"
    sessionStorage.setItem("matched",matchedBox+2);
    if(sessionStorage.getItem("matched")==10){
      setTimeout(()=>{
        alert("game over")
      },500);
    }
    sessionStorage.setItem("clicks",0);
  }
  else{
    setTimeout(()=>{
    event.target.innerText="click me?";
    prevEvent.target.innerText="click me?";
    prevEvent.target.style.backgroundColor="black";
    event.target.style.backgroundColor="black";
    sessionStorage.setItem("clicks",0);
    },1000);
  }
}
// function to get privous event
let Event=(function lastEvent(){
  let prevEvent;
  return {
    get getPrevEvent(){
      return prevEvent;
    },
    set setPrevEvent(event){
      prevEvent=event;
    }
  }
  
})();

// using session storage to store some data
sessionStorage.setItem("clicks",0);
sessionStorage.setItem("matched",0);
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let prevEvent=Event.getPrevEvent;
  let clicks=parseInt(sessionStorage.getItem("clicks"));
  
  console.log("you clicked", event.target);

  //condition to handle first click
  if(clicks==0 && event.target.className!="matched"){
    event.target.innerText="";
    event.target.style.backgroundColor=event.target.className;
    console.log("i am first clicked")
    event.target.style.backgroundColor=event.target.className;
    Event.setPrevEvent=event;
    console.log( Event.getPrevEvent)
    console.log(event)
    sessionStorage.setItem("clicks",1);
  }
// condition to handle second click
  else if(clicks==1 && event.target!==prevEvent.target){
    sessionStorage.setItem("clicks",2);
    event.target.innerText="";
    event.target.style.backgroundColor=event.target.className;
    matching(prevEvent,event)
   
}
}

// when the DOM loads
createDivsForColors(shuffledColors);
