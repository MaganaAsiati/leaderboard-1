export default class Display {
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
