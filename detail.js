const apiUrl = 'https://648704aabeba6297278facac.mockapi.io/'
const endPoint = {
    products: 'products'
}

let idOfProduct = 'id'
let productId = localStorage.getItem(idOfProduct)
let quantityValue = 1
let timeoutId = null

const CART = 'CART'

function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}


async function fetchData() {
    try {
        const res = await fetch(apiUrl + endPoint.products + "/" + productId)
        let product = await res.json()
        renderDetail(product)

    } catch (error) {
        console.log(error)

    }




}

function renderDetail(product) {
    let quantityValue = 1
    let { imgs, name, price, type, stock } = product

    let imageArr = imgs.map(function (item) {
        return `<img onclick='changeImg("${item}")' src=${item} width='100' class='imagePreview' >`
    })
    let imageString = imageArr.join('')

    

    const buyButton = stock === 0
        ? `<div class="SoldOutBtn"><p>----Sold out----</p></div>`
        : `<div class="addBtn"><p>Add to cart</p></div>`

    document.querySelector('.detail-product').innerHTML = `
    
    <a href="products.html" style="color: #3232ff;" class="backToPrd"><i
        class="fa-solid fa-backward" style="color: #3232ff; margin-right: 8px;"></i>Xem thêm sản phẩm</a>
    <div class="detail">

        <div class="detailImage col-6">
            <div class="avatar"><img src=${imgs[0]}></div>

            <div class="preview">${imageString}</div>
        </div>

        
        <div class="information col-6">
            <h2 style="padding-bottom: 10px">${name}</h2>
            <h4 style="padding-bottom: 24px">${formatPrice(price)} đ</h4>
            <p>Loại: ${type}</p>
            <ul style="padding-bottom: 24px; line-height: 28px">
                <li>Chất liệu: Vải Polyester cao cấp chống thấm nước<li>
                <li>Nhiều ngăn nhỏ đựng đồ cá nhân<li>
                <li>Có ngăn lấy đồ nhanh bên hông balo<li>
            </ul>
            
            <div class="add">
                <div class="quantity">
                    <button class="decrease" onclick="decreaseInputNumber()"><i class="fa-solid fa-minus" style="color: #000000;"></i></button>
                    <span class="quantityNumber">${quantityValue}</span>
                    <button class="increase" onclick="increaseInputNumber()"><i class="fa-solid fa-plus" style="color: #000000;"></i></button>
                </div>
                ${buyButton}
            </div>
            
        </div>
    </div>
    
    `
    document.querySelector(".addBtn").addEventListener("click", function () {
        addToCart(product)
    })
}

function changeImg(url) {
    let newAvatar = document.querySelector('.avatar')
    newAvatar.innerHTML = `
    <img src=${url} width="100%">
    `
}

function decreaseInputNumber() {

    --quantityValue
    if (quantityValue < 1) {
        alert('Lỗi số lượng sản phẩm')
        return
    }

    document.querySelector('.quantityNumber').innerHTML = quantityValue
   


}

function increaseInputNumber() {
    ++quantityValue
    document.querySelector('.quantityNumber').innerHTML = quantityValue


}



function addToCart(data) {
    let { id, name, price, imgs } = data
    
    const currentCart = localStorage.getItem(CART)
    if (!currentCart) {
        
        const newItem = {
            id: id,
            name: name,
            price: price,
            img: imgs[0],
            quantity: quantityValue
        }
        const cart = [newItem]

        localStorage.setItem(CART, JSON.stringify(cart))
    }
    else {
        try {
            const parsedCart = JSON.parse(currentCart)
            const cart = parsedCart
            console.log(cart)
            const exitsItem = cart.find(i => i.id === id)
            if (!exitsItem) {
                const newItem = {
                    id: id,
                    name: name,
                    price: price,
                    img: imgs[0],
                    quantity: quantityValue
                }
                cart.push(newItem)
                localStorage.setItem(CART, JSON.stringify(cart))
                renderNumer()
            
            }
            else {
                exitsItem.quantity = exitsItem.quantity + quantityValue
                localStorage.setItem(CART, JSON.stringify(cart))
                
            }

        } catch (error) {
            localStorage.removeItem(CART)
            const newItem = {
                id: id,
                name: name,
                price: price,
                img: imgs[0],
                quantity: quantityValue
            }
            const cart = [newItem]
            localStorage.setItem(CART, JSON.stringify(cart))
        }

        
    }
    document.querySelector('.notification').style.display = 'block'
    timeoutId = setTimeout(() => {
        displayNone()
    }, 3000)
    
}

function displayNone(){
    document.querySelector('.notification').style.display = 'none'
    clearTimeout(timeoutId)
}

function getCartLocalStorage() {
    let cartData = localStorage.getItem(CART)
    try {
        let products = JSON.parse(cartData)
        return products
    } catch (error) {
        return null
    }
}
getCartLocalStorage()

function renderNumer(){
    const quantityProducts = getCartLocalStorage() === null ? 0 : getCartLocalStorage().length
    document.querySelector('.cart').innerHTML = `
    
    <i class="fa-solid fa-cart-shopping" style="color: #fff;"></i>
    <p>Giỏ hàng | ${quantityProducts}</p>
`
}
renderNumer()

function goToCart(){
    window.open("cart.html", "_self")
}


fetchData()
