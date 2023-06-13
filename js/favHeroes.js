let favouriteHeroContainer = document.getElementById('favourites-container');

window.onload = function(){
    console.log("1");
    updateFavoriteHero();
}

// calling api and getting data by using character id
async function getHeroData(heroId){
    console.log("2");
    try{
        let heroInfo;
        let response = await fetch(
            `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=1&apikey=22f00bbaec0717f039640a3992ca71c8&hash=5a8addfa2d4cbc1caabf38065c8e5baf`
            );
            heroInfo = await response.json();
            heroInfo = heroInfo.data.results;
            // console.log(heroInfo);
            return(heroInfo);
        }
        catch (err){
            console.log("error from api");
        }
    }

async function updateFavoriteHero(){
    console.log("2");
    let favourites = getFavourites();
    for(let i = 0;i<favourites.length;i++){
        let heroInfo = await getHeroData(favourites[i]);
        console.log(heroInfo);
        console.log(heroInfo[0].id);
        favouriteHeroContainer.innerHTML += 
        `
        <div class="fav-hero" id="${heroInfo[0].id}">
            <div id="hero-img" >
                <img src="${heroInfo[0].thumbnail.path+'.' + heroInfo[0].thumbnail.extension}" />
            </div>
            <div id="hero-info">
                <a id="hero-name" href="https://www.google.com">
                    <span>${heroInfo[0].name} </span>
                </a>
                <a id="comics-url" onclick="window.location.href='${heroInfo[0].urls[0].url}';">
                    <span>Detail Link</span>
                </a>
                <a id="stories-url" onclick="window.location.href='${heroInfo[0].urls[1].url}';">
                    <span>Comics Link</span>
                </a>
                         
                <button class="btn" id="${heroInfo[0].id}">
                    Remove
                </button>
                         
            </div>
        </div>
        `
    }

    events();
}

function events(){
    console.log("4")
    let removeHero = document.querySelectorAll(".btn");
    removeHero.forEach((bt) => bt.addEventListener("click",removeFromFav));
}

function getFavourites(){
    console.log("5");
    let favourites ;
    // local storage data
    let favHeroesId = localStorage.getItem("favHeroId");

    if(favHeroesId == null){
        favourites = new Array();
    }else{
        favourites = JSON.parse(favHeroesId);
    }

    // console.log(favourites);

    return favourites;
}

async function removeFromFav(){
    console.log("6");
    console.log(this);
    let removeHeroId = this.id;
    console.log(removeHeroId);
    let favs = getFavourites();

    let updatedFav = favs.filter(function (val) {
        return val != removeHeroId;
      });

    localStorage.setItem("favHeroId",JSON.stringify(updatedFav));

    let favItem = document.getElementsByClassName("fav-hero");
    for (let i = 0; i < favItem.length; i++) {
        if (favItem[i].id == removeHeroId) {
            favouriteHeroContainer.removeChild(favItem[i]);
            break;
        }
    }
}
