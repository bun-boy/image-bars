console.log("hi");

const main = document.querySelector(".maincontent");

const printHTML = function (items) {
  let count = 0;
  items.forEach((item) => {
    console.log(item);
    let imageTab = document.createElement("tab");
    imageTab.setAttribute("id", ++count);
    imageTab.classList.add("item");
    imageTab.innerHTML = `
        <figure class="item__image">
            <img src=${item.previewImage} alt="" loading="lazy" />
        </figure>
        <h1 class="item__title">${item.title}</h1>
    `;
    main.append(imageTab);
  });
};

fetch("./items.json")
  .then((response) => response.text())
  .then((json) => {
    console.log(json);
    let items = JSON.parse(json);
    // console.log(data);
    printHTML(items);
  });
