const newFactButton = document.getElementById("newFactButton");
const factDisplay = document.getElementById("factDisplay");
const likeButton = document.getElementById("likeButton");
const heart = document.getElementById("heart");
const userName = document.getElementById("userName");
const userComment = document.getElementById("userComment");
const postCommentButton = document.getElementById("postCommentButton");
const commentsList = document.getElementById("comments");
const factImage = document.getElementById("factImage");

 let facts = [];
let currentIndex = 0;
let backEndUrl = "https://tropics-facts-be.onrender.com/facts"

// Fetch facts from the API
fetchFacts();

newFactButton.addEventListener("click", displayNewFact);
likeButton.addEventListener("click", likeFact);
postCommentButton.addEventListener("click", postComment);

function fetchFacts() {
  
  fetch(backEndUrl)
    .then((response) => response.json())
    .then((data) => {
      facts = data;
      displayFact(currentIndex);
      resetHeartColor(); // Call the resetHeartColor function when fetching facts
    })
    
}

function displayFact(index) {
  if (facts.length === 0) {
    factDisplay.textContent = "No facts available.";
  } else {
    const fact = facts[index];
    factDisplay.textContent = facts.fact;
  }
}

function displayNewFact() {
  if (facts.length === 0) {
    factDisplay.textContent = "No facts available.";
  } else {
    currentIndex = (currentIndex + 1) % facts.length;
    displayFact(currentIndex);
    resetHeartColor(); // Call the resetHeartColor function when displaying a new fact
  }
}

function likeFact() {
  heart.classList.add("liked");
}

function resetHeartColor() {
  heart.classList.remove("liked"); // Remove the "liked" class to reset heart color
}

function postComment() {
  const name = userName.value;
  const comment = userComment.value;
  if (name && comment) {
    const listItem = document.createElement("li");
    listItem.textContent = `(Name: ${name}, Comment: ${comment})`;
    commentsList.appendChild(listItem);
  }
  userName.value = "";
  userComment.value = "";
}
