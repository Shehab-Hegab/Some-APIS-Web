let quote = document.getElementById('quote');
let author = document.getElementById('author');
let btn = document.getElementById('btn');
let favourite = document.getElementById('favourite');
let list = document.getElementById('list-of-favourite-quotes');
let copyButton = document.getElementById('copy');
let showAllListOfFavourite = document.getElementById('show-list');
let clearButton = document.getElementById('clear-button');
let favoriteContainer = document.querySelector('.favorite-container');
let closeButton = document.getElementById('close-favorite');
const url = 'https://api.quotable.io/random';
let favorites = [];

// Function to update the displayed quote and author
const updateQuote = (content, authorName) => {
  quote.innerText = content;
  author.innerText = authorName;
  let existsInFavorites = checkExistence(content, authorName);
  let heartIcon = favourite.firstElementChild;
  if (existsInFavorites) {
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid', 'active');
  } else {
    heartIcon.classList.add('fa-regular');
    heartIcon.classList.remove('fa-solid', 'active');
  }
};

// Function to display favorite quotes
const displayFavorites = () => {
  list.innerHTML = '';
  favorites.forEach((q, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${q.content} - ${q.author}`;
    list.appendChild(listItem);
  });
};

// Function to save favorites to local storage
const saveFavoritesToLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Function to fetch a random quote from the API
const getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      updateQuote(item.content, item.author);
    });
};
const checkExistence = (content, authorName) => {
  return favorites.some(
    (q) => q.content === content && q.author === authorName
  );
};
// Function to add a quote to favorites
const addToFavorites = () => {
  let heartIcon = favourite.firstElementChild;
  // if (heartIcon.classList.contains('fa-regular')) {
  heartIcon.classList.remove('fa-regular');
  heartIcon.classList.add('fa-solid', 'active');

  const content = quote.innerText;
  const authorName = author.innerText;
  // Check if the quote is already in favorites
  const existsInFavorites = checkExistence(content, authorName);
  if (!existsInFavorites) {
    favorites.push({ content, author: authorName });
    saveFavoritesToLocalStorage(); // Save to local storage
    displayFavorites(); // Call this function to update the favorite quotes list
  }
};

// Function to copy text to clipboard
const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

// list-of-favourite-quotes
copyButton.addEventListener('click', () => {
  copyToClipboard(quote.innerText);
});

// Function to clear favorites from local storage
const clearFavoritesFromLocalStorage = () => {
  localStorage.removeItem('favorites');
  favorites = []; // Clear the favorites array
  displayFavorites(); // Display the cleared favorites list
  favoriteContainer.style.display = 'none';
  list.style.display = 'none';
  let heartIcon = favourite.firstElementChild;
  if (heartIcon.classList.contains('fa-solid')) {
    heartIcon.classList.add('fa-regular');
    heartIcon.classList.remove('fa-solid', 'active');
  }
};

showAllListOfFavourite.addEventListener('click', () => {
  if (favorites.length == 0) {
    list.innerHTML = "<p>You haven't added a favorite yet</p>";
  }
  list.style.display = 'block';
  favoriteContainer.style.display = 'block';
});
//close button
closeButton.addEventListener('click', () => {
  list.style.display = 'none';
  favoriteContainer.style.display = 'none';
});
// Attach event listeners
window.addEventListener('load', () => {
  list.style.display = 'none'; // hide when window load or refresh
  favoriteContainer.style.display = 'none';
  favourite.addEventListener('click', addToFavorites);
  clearButton.addEventListener('click', clearFavoritesFromLocalStorage);
  // Load favorites from local storage if available
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    displayFavorites();
  }
  getQuote();
});

btn.addEventListener('click', getQuote);

quote.addEventListener('click', () => {
  copyToClipboard(quote.innerText);
});
