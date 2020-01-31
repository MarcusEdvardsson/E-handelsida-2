// Eventlistener on Product-button
const button = document.getElementById('hero-button');
button.addEventListener("click", function(event) {
    getProducts();
});

// Getting images from database on localhost:8000/products
const createNode = (elem) => {
    return document.createElement(elem);
};

const appendNode = (parent, elem) => {
    parent.appendChild(elem);
};



const getProducts = async () => {
    let ul = document.getElementById('products'); 
    let url = 'http://localhost:8000/products'
    let response = await fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        data.forEach((products) => {
            let li = document.createElement('li'),
                img = document.createElement('img'),
                p = document.createElement('p'),
                span = document.createElement('span');
                addbutton = document.createElement('button');
                li.classList.add('product-item');
                img.classList.add('product-img');
                p.classList.add('product-name');
                span.classList.add('product-price')
                addbutton.classList.add('product-button');
            img.src = products.img
            span.innerText = products.price;
            p.innerText = products.name;
            addbutton.innerHTML = "Lägg i varukorg"
            appendNode(li, img);
            appendNode(li, p);
            appendNode(li, span);
            appendNode(li, addbutton);
            appendNode(ul, li);
        });
    }).catch(err => {
        console.error('Error: ', err);
    })
};

// Add to cart

// Remove from cart

// CLearar form

let clearForm = () => {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
};