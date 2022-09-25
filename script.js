const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed ");
const loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = `yf0Vz5JbfGSClrJa1IjqXyYblcxMUND8EDmUJcHQ`;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// creating an favorite object not an array because easier to  delete an item from object using key value instead of loop through entire array

let favorites = {};

function updateDOM() {
  resultsArray.forEach((result) => {
    // card - container
    const card = document.createElement("div");
    card.classList.add("card");
    // link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "view full image";
    link.target = "_blank";
    // image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "Nasa picture of the day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // save text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "add to favourite";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    // card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // footer container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = `${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

// GET 10 IMAGES FROM NASA API

async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    // found error while getting data
  }
}

// Add to favourite
function saveFavorite(itemUrl) {
  // loop through each array to select favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // show save confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(()=>{
        saveConfirmed.hidden = true;
      }, 2000);
    //   saving the date into the local storage 
    localStorage.setItem('nasaFavorites', JSON.stringify(favorites[itemUrl]));
    }
  });
}

// on load
getNasaPictures();
