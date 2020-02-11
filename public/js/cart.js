export let getShoppingCart = async () => {
  const url = "http://localhost:8000/orders";
  let response = await fetch(url, { method: "GET" });
  let data = await response.json();
  return await data;
};

const appendNode = (parent, elem) => {
  if (parent == null) {
  } else {
    parent.appendChild(elem);
  }
};

let createCartCards = async () => {
  let output = document.getElementById("cart-section");
  let cartItems = await getShoppingCart();
  if (cartItems == undefined) {
    console.log("tomt!");
  } else {
    for (let cartItem of cartItems) {
      let card = document.createElement("div"),
        imgDiv = document.createElement("div"),
        txtDiv = document.createElement("div"),
        img = document.createElement("img"),
        p = document.createElement("p"),
        span = document.createElement("span"),
        removeButton = document.createElement("button");

      card.classList.add("product-item");
      imgDiv.classList.add("product-img-div");
      txtDiv.classList.add("details");
      img.classList.add("product-img");
      p.classList.add("product-name");
      span.classList.add("product-price");
      removeButton.classList.add("product-button");

      img.src = cartItem.img;
      span.innerText = cartItem.price + " kr";
      p.innerText = cartItem.name;
      removeButton.innerHTML = "Ta bort från varukorg";

      appendNode(card, imgDiv);
      appendNode(card, txtDiv);
      appendNode(txtDiv, p);
      appendNode(txtDiv, span);
      appendNode(txtDiv, removeButton);
      appendNode(output, card);
      appendNode(imgDiv, img);

      removeButton.addEventListener("click", async () => {
        removeFromCart(cartItem.id);
        card.remove();
      });
    }
  }
};

createCartCards();

const removeFromCart = async id => {
  let obj = { id: id };
  let url = "http://localhost:8000/orders";
  let response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  });
  let data = await response.json();
  return data;
};
