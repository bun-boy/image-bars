let article = document.querySelector(".articleContent");
const rows = document.querySelector(".rows");
var items;
let selectedID = 1;
let N;
let maxN = -1;

const updateRow = function (event, item, newValue) {
  let title = document.querySelector(".item" + selectedID);
  items[item.id - 1].title = newValue;
  title.innerHTML = `${newValue}`;
  document.querySelector(".row" + item.id).click();
  document.querySelector(".image__src").innerHTML = `
    <img src=${item.previewImage} loading="lazy" />
  `;
};

const loadItem = function (event, item) {
  article.innerHTML = `
    <img class="image__src" src=${item.previewImage} loading="lazy" />
    <form class="image__form">
      <input type="text" value="${item.title}">
    </form>
  `;
  let form = article.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newValue = form.querySelector("input").value;
    updateRow(event, item, newValue);
  });
};

const compute = function () {
  let row = document.createElement("div");
  row.classList.add("tab");
  row.classList.add("row");
  row.classList.add("demo");
  row.innerHTML = `
      <div><img class="item__icon" src=${items[0].previewImage} loading="lazy" /></div>
      <div><span class="item__title item1">...</span></div>
  `;
  rows.append(row);
  let width = row.offsetWidth;
  row.remove();
  row.innerHTML = `<div><span class="item__title item1">oa</span></div>`;
  rows.append(row);
  let add = row.offsetWidth;
  row.remove();
  let elementWidth = 300;
  maxN = 0;
  while (width < elementWidth) {
    width += add;
    maxN += 2;
  }
  console.log(maxN);
  return maxN;
};

const formed = function (item, id) {
  let row = document.createElement("div");
  row.classList.add("tab");
  row.classList.add("row" + id);
  row.setAttribute("selected", false);
  let displayTitle = item.title;
  if (maxN === -1) maxN = compute();

  if (item.title.length > maxN) {
    displayTitle =
      item.title.slice(0, maxN / 2) +
      "..." +
      item.title.slice(item.title.length - maxN / 2, item.title.length);
  }
  row.innerHTML = `
    <div><img class="item__icon" src=${item.previewImage} loading="lazy" /></div>
    <div><span class="item__title item${id}">${displayTitle}</span></div>
  `;
  row.addEventListener("click", (event) => {
    let tmp = ".row" + selectedID;
    document.querySelector(tmp).setAttribute("selected", false);
    selectedID = item.id;
    tmp = ".row" + selectedID;
    document.querySelector(tmp).setAttribute("selected", true);
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
  document.querySelector(".row1").click();
};

fetch("./items.json")
  .then((response) => response.text())
  .then((json) => {
    items = JSON.parse(json);
    N = items.length;
    printHTML();
  });

window.addEventListener("keydown", (event) => {
  let tmp;
  switch (event.key) {
    case "Down":
    case "ArrowDown":
      tmp = selectedID + 1;
      if (tmp == N + 1) tmp = 1;
      break;
    case "Up":
    case "ArrowUp":
      tmp = selectedID - 1;
      if (tmp == 0) tmp = N;
      break;
    default:
      return;
  }
  document.querySelector(".row" + tmp).click();
});
