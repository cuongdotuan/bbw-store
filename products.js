

const apiUrl = 'https://648704aabeba6297278facac.mockapi.io/'
const endPoint = {
    products: 'products'
}
const CART = 'CART'
const loading = {
    list() {
        let div = document.createElement('div')
        div.classList.add('placeHolder')
        div.innerHTML = `
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        <div class="col-3-loading skeleton"></div>
        
        `
        return div
    }
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}
let productParams = {
    apiUrl: apiUrl,
    endPoint: endPoint.products,
    method: 'GET',
    async callback(prds) {
        await removeLoader(prds)
        await renderProducts(prds)
    }
}


async function fetchData(params) {
    if (!params) {
        alert('khong ton tai')
        return false
    }
    let { apiUrl, endPoint, method, callback } = params

    try {
        let res = await fetch(apiUrl + endPoint, {
            method: method
        })

        let data = await res.json()
        
        await callback(data)
    }
    catch (error) {
        
    }

}
fetchData(productParams)

async function removeLoader() {
    if (document.querySelector('.placeHolder')) {
        document.querySelector('.placeHolder').remove()
    }
}



async function renderProducts(products) {
    // document.querySelector('.container').innerHTML = ''
    document.querySelector('.container').innerHTML = `
    <div class="optionFilter">
                <div class="clickShowFilter" onclick="toggleUnhideClass()">
                    <h4>TÌM THEO
                    <i class="fa-solid fa-plus" style="color: #000000;"></i>
                    </h4>
                </div>
                
                
                <div class="option">
                    <ul>
                        <li><button onclick="sortDescPrice()">Giá từ cao</button></li>
                        <li><button onclick="sortAscPrice()">Giá từ thấp</button></li>
                        <li><button onclick="filterByBackpack()">Backpack</button></li>
                        <li><button onclick="filterByBag()">Bag</button></li>
                        <li><button onclick="filterByWallet()">Wallet</button></li>
                    </ul>
                </div>

            </div>
    <div class="listItem"></div>

    `
    for (let product of products) {
        let { imgs, name, type, price, id } = product
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('col-3')
        div.innerHTML = `
        
            <div class="image" style="background-image: url(${imgs[0]});"></div>
            <h4><a href="detail.html" onclick="setIdPrd(${id})"></a>${name}</h4>
        
            <p>${formatPrice(price)}đ</p>
        
        `
        document.querySelector('.listItem').appendChild(div)
    }
}

function toggleUnhideClass() {
    document.querySelector('.option').classList.toggle('unhide')
}

function sortDescPrice() {
    let sortParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {
            // sort => sortedArr = [1 -> 10]
            let sortedArr = arr.sort(function (a, b) {
                return b.price - a.price
            })

            await renderProducts(sortedArr)
        }
    }
    fetchData(sortParams)
}

function sortAscPrice() {
    let sortParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {
            // sort => sortedArr = [1 -> 10]
            let sortedArr = arr.sort(function (a, b) {
                return a.price - b.price
            })

            await renderProducts(sortedArr)
        }
    }
    fetchData(sortParams)
}

function filterByBackpack() {
    let filterParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {

            let filteredArr = arr.filter(function (x) {
                return x.type === 'backpack'
            })

            await renderProducts(filteredArr)
        }
    }
    fetchData(filterParams)
}

function filterByBag() {
    let filterParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {

            let filteredArr = arr.filter(function (x) {
                return x.type === 'bag'
            })
            if (filteredArr.length === 0) {
                console.log('khong co')
            }
            await renderProducts(filteredArr)
        }
    }
    fetchData(filterParams)
}


function filterByWallet() {
    let filterParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {

            let filteredArr = arr.filter(function (x) {
                return x.type === 'wallet'
            })

            await renderProducts(filteredArr)
        }
    }
    fetchData(filterParams)
}


async function setIdPrd(id) {
    let idOfProduct = 'id'
    localStorage.setItem(idOfProduct , id)
    
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

const quantityProducts = getCartLocalStorage() === null ? 0 : getCartLocalStorage().length

document.querySelector('.cart').innerHTML = `
    
    <i class="fa-solid fa-cart-shopping" style="color: #fff;"></i>
    <p>Giỏ hàng | ${quantityProducts}</p>
`


function goToCart(){
    window.open("cart.html", "_self")
}


document.querySelector('.container').appendChild(loading.list())
