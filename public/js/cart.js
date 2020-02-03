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
            img = document.createElement('img'),
            p = document.createElement('p'),
            span = document.createElement('span'),
            addbutton = document.createElement('button');

            card.classList.add('product-item');
            img.classList.add('product-img');
            p.classList.add('product-name');
            span.classList.add('product-price');
            addbutton.classList.add('product-button');

            img.src = products.img;
            span.innerText = products.price;
            p.innerText = products.name;
            addbutton.innerHTML = "Ta bort från varukorgen"

            addbutton.addEventListener('click', () => {
                console.log("Tar bort produkt nummer: " + products.id);
                removeFromCart(products.id);
            });

            appendNode(card, img);
            appendNode(card, p);
            appendNode(card, span);
            appendNode(card, addbutton);
            appendNode(ul, card);
        });
    }).catch(err => {
        console.error('Error: ', err);
    })
};

getCart();

const removeFromCart = async (id) => {
    let obj = {id: id}
    let url = 'http://localhost:8000/orders'
    let response = await fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(obj)})
    let data = await response.json()
    console.log(obj)
    return data;
};