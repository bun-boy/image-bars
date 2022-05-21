const main = document.querySelector(".maincontent");

const updateRow = function (event, item, newValue) {
  console.log(newValue);
  let title = document.querySelector(".item__title" + item.id);
  item.title = newValue;
  title.innerHTML = `${item.title}`;
};

const loadItem = function (event, item) {
  console.log(item);
  const imageArticle = document.createElement("article");
  imageArticle.classList.add("image");
  imageArticle.setAttribute("id", item.id);
  imageArticle.innerHTML = `
    <figure class="image__src">
      <img src=${item.previewImage} loading="lazy" />
    </figure>
    <form>
      <label for="image__title"></label>
      <input type="text" value=${item.title}>
    </form>
  `;
  let form = imageArticle.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newValue = form.querySelector("input").value;
    updateRow(event, item, newValue);
  });
  main.append(imageArticle);
};

const formed = function (item, id) {
  console.log(item);
  let row = document.createElement("row");
  row.classList.add("tab");
  row.setAttribute("id", id);
  row.innerHTML = `
    <h1 class="item__title${item.id}">${item.title}</h1>
  `;
  row.addEventListener("click", (event) => {
    loadItem(event, item);
  });
  return row;
};

const printHTML = function (items) {
  let id = 1;
  items.forEach((item) => {
    item.id = id;
    main.append(formed(item, id++));
  });
};

fetch("./items.json")
  .then((response) => response.text())
  .then((json) => {
    let items = JSON.parse(json);
    printHTML(items);
  });
