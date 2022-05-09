import './style.scss';
import Leaderboard from './modules/Leaderboard.js';
import Display from './modules/Display.js';
import Icon from './assets/github.svg';

const name = document.getElementById('name');
const score = document.getElementById('score');
const submit = document.querySelector('.submit');
const refresh = document.querySelector('.refresh');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Oawl0gMZlyz9hcMNVFUQ';
const api = new Leaderboard(url);

// On Page Load
const requestUrl = `${url}/scores/`;
api.getData(requestUrl);

setTimeout(() => {
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

// Footer Section
const footer = document.getElementById('footer');
const github = new Image();
github.src = Icon;
github.style.height = '15px';
footer.append(github);