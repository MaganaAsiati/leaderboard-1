import './style.scss';
import Leaderboard from './modules/Leaderboard.js';
import Display from './modules/Display.js';

const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.querySelector('.submit');
const refresh = document.querySelector('.refresh');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const api = new Leaderboard(url);

let gameID;
let str;
let requestUrl;

const getGameID = () => {
  if (localStorage.length) {
    gameID = JSON.parse(localStorage.getItem('gameID'));
    const regEx = /[\w]{20}/;
    const result = JSON.stringify(gameID.result);
    const data = result.match(regEx);
    str = data[0].toString();
  }
};

// On Page Load
if (!localStorage.length) {
  api.createGameID(url);
} else {
  getGameID();
}

setTimeout(() => {
  getGameID();
  requestUrl = `${url}${str}/scores/`;

  document.addEventListener('DOMContentLoaded', () => {
    api.getData(requestUrl);
  });
}, 1000);

const display = new Display();

// Submit Button Event
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    submit.click();
  }
  if (!name.value.trim()) {
    name.setCustomValidity('Please check input name field.');
    name.reportValidity();
  } else if (!score.value) {
    score.setCustomValidity('Please check input score field.');
    score.reportValidity();
  } else if (name.value.trim() && score.value) {
    api.addData(requestUrl, name.value.trim(), score.value);
    submit.setCustomValidity('"Leaderboard score created correctly.');
    submit.reportValidity();
    name.value = '';
    score.value = '';
  }
  setTimeout(() => {
    api.getData(requestUrl);
    const arr = JSON.parse(localStorage.getItem('data'));
    display.createList(arr);
  }, 1000);
});

// Refresh Button Event
refresh.addEventListener('click', () => {
  api.getData(requestUrl);
  if (localStorage.getItem('data')) {
    const arr = JSON.parse(localStorage.getItem('data'));
    display.createList(arr);
  }
});

// On Page Load
window.onload = () => {
  if (localStorage.getItem('data')) {
    const arr = JSON.parse(localStorage.getItem('data'));
    display.createList(arr);
  }
};
