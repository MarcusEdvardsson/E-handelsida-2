import { getShoppingCart } from "./cart.js";
const addButton = document.querySelector(".product-button");

// Eventlisteners
const button = document.getElementById("hero-button");
button.addEventListener("click", function(event) {
  let top = document.getElementById("products-section");
  top.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

// Hämta produkter
const appendNode = (parent, elem) => {
  parent.appendChild(elem);
};

const getProducts = async () => {
  let url = "http://localhost:8000/products";
  let response = await fetch(url, { method: "GET" });
  let data = await response.json();
  return await data;
};

const productCards = async () => {
  let ul = document.getElementById("products-section");
  let cartProducts = await getShoppingCart();
  let products = await getProducts();
  for (let product of products) {
    let card = document.createElement("div"),
      imgDiv = document.createElement("div"),
      txtDiv = document.createElement("div"),
      img = document.createElement("img"),
      p = document.createElement("p"),
      span = document.createElement("span"),
      addbutton = document.createElement("button");

    card.classList.add("product-item");
    imgDiv.classList.add("product-img-div");
    txtDiv.classList.add("details");
    img.classList.add("product-img");
    p.classList.add("product-name");
    span.classList.add("product-price");
    addbutton.classList.add("product-button");

    img.src = product.img;
    span.innerText = product.price + " kr";
    p.innerText = product.name;
    addbutton.innerHTML = "Lägg i varukorg";

    appendNode(card, imgDiv);
    appendNode(card, txtDiv);
    appendNode(txtDiv, p);
    appendNode(txtDiv, span);
    appendNode(txtDiv, addbutton);
    appendNode(ul, card);
    appendNode(imgDiv, img);

    if (cartProducts) {
      let checkProduct = cartProducts.find(cartItem => {
        if (cartItem.id == product.id) {
          addbutton.disabled = true;
          addbutton.innerHTML = "i varukorgen redan";
        }
      });
      if (checkProduct) {
      }
    }
    addbutton.addEventListener("click", () => {
      addtoCart(product.id);
    });
  }
};

productCards();

// Disable added buttons

// Add to cart
const addtoCart = async id => {
  let obj = { id: id };
  let url = "http://localhost:8000/orders";
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(obj)
  });
  let data = await response.json();
  return data;
};

// Scrolla till toppen med ESC
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 27) {
    let top = document.getElementById("mainListDiv");
    top.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});
