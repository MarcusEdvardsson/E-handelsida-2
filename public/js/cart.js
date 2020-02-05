
const appendNode = (parent, elem) => {
    parent.appendChild(elem);
};

const getCart = async () => {
    let ul = document.getElementById('cart-section'); 
    let url = 'http://localhost:8000/orders'
    let response = await fetch(url, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
        data.forEach((products) => {
            card = document.createElement('div'),
            imgDiv = document.createElement('div'),
            txtDiv = document.createElement('div'),
            img = document.createElement('img'),
            p = document.createElement('p'),
            span = document.createElement('span'),
            addbutton = document.createElement('button');

            card.classList.add('product-item');
            imgDiv.classList.add('product-img-div');
            txtDiv.classList.add('details');
            img.classList.add('product-img');
            p.classList.add('product-name');
            span.classList.add('product-price');
            addbutton.classList.add('product-button');

            img.src = products.img;
            span.innerText = products.price + " kr";
            p.innerText = products.name;
            addbutton.innerHTML = "Ta bort från varukorg"

            addbutton.addEventListener('click', () => {
                removeFromCart(products.id);
            });

            appendNode(card, imgDiv);
            appendNode(card, txtDiv);
            appendNode(txtDiv, p);
            appendNode(txtDiv, span);
            appendNode(txtDiv, addbutton);
            appendNode(ul, card);
            appendNode(imgDiv, img);
        });
    }).catch(err => {
        console.error('Error: ', err);
    })
};

getCart();

const removeFromCart = async (id) => {
    let obj = {id: id}
    let url = 'http://localhost:8000/orders'
    let response = await fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(obj)})
    let data = await response.json()
    console.log(obj)
    return data;
};

