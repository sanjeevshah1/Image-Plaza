const accessKEY = "_ShzFbFYUeK2ZOFPUTiCpz_ryBE6nMAWpVdKs81JwPQ";
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const showMore = document.querySelector("#show-more");
const result = document.querySelector(".result");
let inputData = "";
let pageNo = 1;

async function displayRandom() {
  result.innerHTML = `<p>Showing random results...</p>`;
  const apiURL = `https://api.unsplash.com/photos/random?count=${10}&client_id=${accessKEY}`;
  try {
    const response = await fetch(apiURL);
    const images = await response.json();
    displayImages(images);
  } catch (error) {
    console.log("Errow while random searching", error);
  }
}
displayRandom();

function capitalizeFirstLetter(str) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

async function searchImages(check) {
  const imageContainer = document.querySelector("#image-container");
  if (check) imageContainer.innerHTML = "";
  inputData = searchInput.value;
  result.innerHTML = "";
  result.innerHTML = `<p>Showing ${inputData} results...</p>`;
  const apiURL = `https://api.unsplash.com/search/photos?page=${pageNo}&pageSize=${10}&query=${inputData}&client_id=${accessKEY}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const images = data.results;
    displayImages(images);
  } catch (error) {
    console.log("There's been an error", error);
  }
}
const displayImages = (images) => {
  const imageContainer = document.querySelector("#image-container");
  images.forEach((image) => {
    const imageCard = document.createElement("div");
    imageCard.classList.add("image-card");
    imageCard.innerHTML = `
        <img src=${image.urls.regular} alt=${image.alt_description}></img>
        <p>${capitalizeFirstLetter(image.alt_description)}</p>
        `;
    imageContainer.appendChild(imageCard);
  });
};

searchButton.addEventListener("click", () => {
  searchImages(true);
});
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Preventing the default behavior of the Enter key (form submission)
    event.preventDefault();
    searchImages(true);
  }
});
showMore.addEventListener("click", () => {
  if (searchInput.value == "") {
    displayRandom();
  } else {
    pageNo++;
    searchImages(false);
  }
});
