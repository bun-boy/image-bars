let loader = document.querySelector(".loaderContent");
const rows = document.querySelector(".rows");
var items;
let selectedID = 1;
let N;

const updateRow = function (event, item, newValue) {
  let title = document.querySelector(".item__title" + item.id);
  items[item.id - 1].title = newValue;
  title.innerHTML = `${newValue}`;
  document.querySelector(".item__title" + item.id).click();
  document.querySelector(".image__src").innerHTML = `
    <img src=${item.previewImage} loading="lazy" />
  `;
};

const loadItem = function (event, item) {
  loader.classList.add("image");
  loader.setAttribute("id", item.id);
  loader.innerHTML = `
    <figure class="image__src">
      <img src=${item.previewImage} loading="lazy" />
    </figure>
    <form>
      <label for="image__title"></label>
      <input type="text" value=${item.title}>
    </form>
  `;
  let form = loader.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newValue = form.querySelector("input").value;
    updateRow(event, item, newValue);
  });
};

const formed = function (item, id) {
  let row = document.createElement("row");
  row.classList.add("tab");
  row.setAttribute("id", id);
  row.innerHTML = `
    <h1 class="item__title${item.id}">${item.title}</h1>
  `;
  row.addEventListener("click", (event) => {
    selectedID = item.id;
    loadItem(event, item);
  });
  return row;
};

const printHTML = function () {
  let id = 1;
  items.forEach((item) => {
    item.id = id;
    rows.append(formed(item, id++));
  });
  document.querySelector(".item__title1").click();
};

fetch("./items.json")
  .then((response) => response.text())
  .then((json) => {
    items = JSON.parse(json);
    N = items.length;
    printHTML();
  });

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Down":
    case "ArrowDown":
      selectedID++;
      if (selectedID == N + 1) selectedID = 1;
      break;
    case "Up":
    case "ArrowUp":
      selectedID--;
      if (selectedID == 0) selectedID = N;
      break;
  }
  document.querySelector(".item__title" + selectedID).click();
});
