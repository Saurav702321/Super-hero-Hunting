// Selecting the elements from the DOM
let info = document.getElementById('main');

// getting the heroInfo object which was stored when the user clicked on more info
var heroInfo = {};
let heroId = 1230;

window.onload = function () {
     let heroId = JSON.parse(localStorage.getItem("heroId"));
     console.log(heroId);
     searchHero(heroId);
};

async function searchHero(heroId){
     let response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&apikey=22f00bbaec0717f039640a3992ca71c8&hash=5a8addfa2d4cbc1caabf38065c8e5baf`
          );
          heroInfo = await response.json();
          heroInfo = heroInfo.data.results;
          await updateDOM(heroInfo);
}

async function updateDOM(heroInfo) {

          // console.log(heroInfo);
          // adding the information into DOM 
          main.innerHTML = 
          `
          <div id="left">
               <img id="avater" src="${heroInfo[0].thumbnail.path+'.' + heroInfo[0].thumbnail.extension}"/>
          </div>
          <div id="right">
               <div id="hero-title">${heroInfo[0].name}</div>
               <div id="about">
                    <div id="biography">
                         <span class="cate">Biography</span>
                         <ul id="about-bio">
                              <li id="comics">Comics: ${heroInfo[0].comics.available}</li>
                              <li id="description">Discription: ${heroInfo[0].comics.discription}</li>
                              <li id="series">Series: ${heroInfo[0].series.available}</li>
                              <li id="stories">Stories: ${heroInfo[0].stories.available}</li>
                              <li id="detail">Hero Details: 
                                   <button id="detail-btn" onclick="window.location.href='${heroInfo[0].urls[0].url}';">Details</button>
                              </li>
                              <li id="comiclink">Comic Link : 
                                   <button id="comiclink-btn" onclick="window.location.href='${heroInfo[0].urls[1].url}';">Comics</button>
                              </li>
                         </ul>
                    </div>
          
               </div>
          </div>
          `
}
