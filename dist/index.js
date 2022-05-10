/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/Leaderboard.js
class Leaderboard {
  constructor(url) {
    this.url = url;
  }

  createGameID = async (url) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'The Mavericks Game' }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('gameID', JSON.stringify(data));
      });
  };

  getData = async (url) => {
    await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
      });
  };

  addData = async (url, name, score) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ user: name, score }),
    })
      .then((response) => response.json());
  };
}
;// CONCATENATED MODULE: ./src/modules/Display.js
class Display {
  createList = (arr) => {
    document.querySelector('.scores').innerHTML = '';
    const li = [];
    let i = 0;
    if (arr) {
      arr.result = arr.result.sort((a, b) => b.score - a.score);
      arr.result.forEach((element) => {
        li[i] = document.createElement('li');
        li[i].textContent = `${element.user}: ${element.score}`;
        document.querySelector('.scores').append(li[i]);
        i += 1;
      });
    }
  };
}

;// CONCATENATED MODULE: ./src/assets/github.svg
const github_namespaceObject = __webpack_require__.p + "3b21c250a99986431958.svg";
;// CONCATENATED MODULE: ./src/index.js





const src_name = document.getElementById('name');
const score = document.getElementById('score');
const src_submit = document.querySelector('.submit');
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
src_submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    src_submit.click();
  }
  if (!src_name.value.trim()) {
    src_name.setCustomValidity('Please check input name field.');
    src_name.reportValidity();
  } else if (!score.value) {
    score.setCustomValidity('Please check input score field.');
    score.reportValidity();
  } else if (src_name.value.trim() && score.value) {
    api.addData(requestUrl, src_name.value.trim(), score.value);
    src_submit.setCustomValidity('"Leaderboard score created correctly.');
    src_submit.reportValidity();
    src_name.value = '';
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
github.src = github_namespaceObject;
github.style.height = '15px';
footer.append(github);
/******/ })()
;