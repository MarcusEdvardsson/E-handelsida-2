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
            addbutton.innerHTML = "Lägg i varukorg"

            addbutton.addEventListener('click', () => {
                addtoCart(products.id);
                removeEvent();
            });

            let removeEvent = async () => {
                if()
                addbutton.removeEventListener('click');
                addbutton.innerHTML = 'Lagd i varukorgen';
            };

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
    });
};

getProducts();
// Disable added buttons 

// Importera "cart" => kolla ifall id till button finns i cart, om = true => disable button add innerHTML. 

// Add to cart
const addtoCart = async (id) => {
    let obj = {id: id}
    let url = 'http://localhost:8000/orders'
    let response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(obj)})
    let data = await response.json()
    console.log(obj)
    return data;
};


// Scrolla till toppen med ESC
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 27) {
        let top = document.getElementById('mainListDiv')
        top.scrollIntoView({
            behavior: "smooth", 
            block: "start"
        });
    };
});

// Lightbox funktion som ännu inte fungerar 

function lightboxFunction() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    
    const images = document.getElementsByClassName('product-img')
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active');
            const img = document.createElement('img')
            img.src = image.src
            while(lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)
        })
    })
    
    lightbox.addEventListener('click', e => {
        if(e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    })
};