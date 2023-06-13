// Public Key
// 22f00bbaec0717f039640a3992ca71c8

// Private Key
// 234bcb7426dcb5bec1c27df5ff8aea05f33be966

// hash
// 5a8addfa2d4cbc1caabf38065c8e5baf

// (ts + privatekey + public key)
// 1234bcb7426dcb5bec1c27df5ff8aea05f33be96622f00bbaec0717f039640a3992ca71c8

const searchHero = document.getElementById("searchHero");
const searchResults = document.getElementById("searchResults");
const favClicked = document.getElementById("second");

let searchData ;
let heroclicked = 0;

let favHeroId = [];

// Adding eventListener to search 

searchHero.addEventListener("keyup", () => searchHeros(searchHero.value));

// function api call
async function searchHeros(textSearched) {
    if (textSearched.length < 2) {
      searchResults.innerHTML = "Insert min 3 character";
      return;
    }
    // API call to get the data
    // https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${textSearched}&apikey=22f00bbaec0717f039640a3992ca71c8&hash=a3910c9b5f6f1d3595ff94e1ae227803&ts=1
  
    let testCharData = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&ts=1&apikey=22f00bbaec0717f039640a3992ca71c8&hash=5a8addfa2d4cbc1caabf38065c8e5baf`
      );
    //Converting the data into JSON format
    const data = await testCharData.json();

    // console.log(data.data.results);
    window.searchData = await data.data.results;
    // console.log(window.searchData);
    showSearchedResults(window.searchData);
}

// Function for displaying the searched results i DOM
// An array is accepted as argument
// SearchedHero is the array of objects which matches the string entered in the search bar

function showSearchedResults(searchedHero){
    // Id's of the character which are added in the fav.
    // Used for displaying the appropriate button in search result i.e. if the 
    // id exist in this array then we display "Remove from fav." button otherwise we display "add to fav button"
    // favouritesCharacterIDs is a map which contains id of character as key and true as value 

    searchResults.innerHTML =  ``;
    let count = 1;
    // iterating the searchedHero array 
    for(const key in searchedHero){
        // if count<=5 then only we display it in dom other results are discarded
        if(count<=10){
            let hero = searchedHero[key];
            searchResults.innerHTML += 
            `
            <li id="list-item"> 
                <div id="first">
                    <img src="${hero.thumbnail.path+'.'+hero.thumbnail.extension}" alt="image not found">
                    <a class="character-info" href="./heroDetails.html" id="${hero.id}">
                        <span>${hero.name}</span>
                    </a>
                </div>
                <div id="second" id="${hero.id}">
                    <button class="btn" id="${hero.id}">
                        Add to Favourite
                    </button>
                </div>
            </li>
            `
            
         }
        count++;
    }
    // adding the appropriate events to buttons after they are inserted in DOM
    events();
}

// function for attaching eventListener to buttons

function events() {
    let favClicked = document.querySelectorAll(".btn");
    favClicked.forEach((btnn) => btnn.addEventListener("click", addToFav));

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));

    let rbtn = document.querySelectorAll(".rbtn");
    rbtn.forEach((ch) => ch.addEventListener("click",removeFromFavourites));
}

// function which stores the info objects of character for which user want to see the info

// this is for Detail page , Do not update
function addInfoInLocalStorage(){
    // This function basically stores the id of character in localStorage for use of showing hero detail
     let heroId = this.id;
     localStorage.setItem("heroId",JSON.stringify(heroId));
}

// getting favourite Heroes Id from Local Storage
function getFavourites(){
    let favourites = JSON.parse(localStorage.getItem("favHeroId"));
   
    // console.log(typeof favourites);

    if (favourites.length == 0) {
        favourites = new Array();
      }
    // console.log(typeof favourites);
    // console.log(favourites);
    return favourites;
}

// add superHero to Favourite
async function addToFav(){
    // console.log(this);
    var favId = this.id;
    // console.log(favId);
    let hasId = false;
    if(favHeroId.length > 0){
        favHeroId = getFavourites();
    }
    console.log(typeof favHeroId);
    for(let i = 0;i<favHeroId.length ; i++){
        if(favHeroId[i] === favId){
            hasId = true;
            break;
        }
    }

    if(hasId == false){
        // let type = typeof favHeroId;
        // console.log(type);
        favHeroId.push(favId);
    }

    this.innerHTML = "Remove from Fav";
    this.classList.toggle("rbtn");
    localStorage.setItem("favHeroId", JSON.stringify(favHeroId));
    let removebtn = document.querySelectorAll(".rbtn");
    removebtn.forEach((btnnn) => btnnn.addEventListener("click", removeFromFavourites));
}

function removeFromFavourites(){
    let itemId = this.id;
    // console.log("itemId to be remove", itemId);
    let favourites = getFavourites();
    let updatedFavorites = favourites.filter(function (val) {
        return val != itemId;
      });

    localStorage.setItem("favHeroId", JSON.stringify(updatedFavorites));
    this.classList.toggle("btn");
    this.innerHTML = "Add to favourite";
    this.removeEventListener("click", removeFromFavourites);
    let favClicked = document.querySelectorAll(".btn");
    favClicked.forEach((btnn) => btnn.addEventListener("click", addToFav));
}