// Eventlisteners
const button = document.getElementById('hero-button');
button.addEventListener("click", function(event) {
    let top = document.getElementById('products-section')
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
    let ul = document.getElementById('products-section'); 
    let url = 'http://localhost:8000/products'
    let response = await fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        data.forEach((products) => {
            card = document.createElement('div'),
            imgDiv = document.createElement('div'),
            img = document.createElement('img'),
            p = document.createElement('p'),
            span = document.createElement('span'),
            addbutton = document.createElement('button');

            card.classList.add('product-item');
            imgDiv.classList.add('product-img-div')
            img.classList.add('product-img');
            p.classList.add('product-name');
            span.classList.add('product-price');
            addbutton.classList.add('product-button');

            img.src = products.img;
            span.innerText = products.price;
            p.innerText = products.name;
            addbutton.innerHTML = "Lägg i varukorg"

            addbutton.addEventListener('click', () => {
                console.log("Lägger till produkt nummer: " + products.id);
                addtoCart(products.id);
            });

            appendNode(card, imgDiv);
            appendNode(card, p);
            appendNode(card, span);
            appendNode(card, addbutton);
            appendNode(ul, card);
            appendNode(imgDiv, img);
        });
    }).catch(err => {
        console.error('Error: ', err);
    })
};

getProducts();

// Add to cart
const addtoCart = async (id) => {
    let obj = {id: id}
    let url = 'http://localhost:8000/orders'
    let response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(obj)})
    let data = await response.json()
    console.log(obj)
    return data;
};

