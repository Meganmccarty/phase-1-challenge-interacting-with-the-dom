// Variables to hold existing HTML elements
const counterContainer = document.getElementById('counter');
let counter = parseInt(counterContainer.textContent, 10);
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const likeButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const likesList = document.querySelector('ul.likes');
const commentsList = document.getElementById('list');
const commentForm = document.querySelector('form#comment-form');
const input = document.querySelector('input#comment-input')

// Function for counter to increment once per second
let timer = setInterval(increment, 1000);

// Event listeners for minus, plus, and pause buttons
minusButton.addEventListener('click', decrement);
plusButton.addEventListener('click', increment);
likeButton.addEventListener('click', like);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
commentForm.addEventListener('submit', function(event) {
    const newComment = document.createElement('p');
    newComment.textContent = input.value;
    commentsList.appendChild(newComment);
    input.value = '';
    event.preventDefault();
});

// Decrement function
function decrement() {
    counter -= 1;
    return counterContainer.textContent = counter;
}

// Increment function
function increment() {
    counter += 1;
    return counterContainer.textContent = counter
}

// Like function
function like() {
    let likedNumber = counter;

    // Create unique id for each counter number liked
    let id = 'number' + likedNumber;

    // Create new li element for a new liked counter number
    const newLike = document.createElement('li');
    newLike.id = id;

    // Grab existing li element for an already-liked counter number
    let likeExists = document.querySelector(`#${id}`);

    // Checks to see if a number has already been liked
    // If yes, increase total like count
    // If not, keep total like count at 1 and append the new li element as a child of the ul element
    if (likeExists) {
        let likeCount = document.querySelector(`#${id} span`).innerHTML;
        likeCount++;
        likeExists.innerHTML = `${likedNumber} has been liked <span>${likeCount}</span> times!`
    } else {
        newLike.innerHTML = `${likedNumber} has been liked <span>1</span> time!`;
        likesList.appendChild(newLike);
    }
}

// Pause function
function pause() {
    // Pauses/resumes timer depending on the text displayed in the pause button
    // Buttons also enabled/disabled depending on timer state
    if (pauseButton.textContent === ' pause ') {
        minusButton.disabled = true;
        plusButton.disabled = true;
        likeButton.disabled = true;
        pauseButton.textContent = ' resume ';
        clearInterval(timer);
    } else if (pauseButton.textContent === ' resume ') {
        minusButton.disabled = false;
        plusButton.disabled = false;
        likeButton.disabled = false;
        pauseButton.textContent = ' pause ';
        timer = setInterval(increment, 1000);
    }
}

// Reset function
function reset() {
    counter = 0;
    likesList.innerHTML = '';
    commentsList.innerHTML = '';
    return counterContainer.textContent = counter;
}