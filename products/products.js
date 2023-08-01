const apiUrl = 'https://648704aabeba6297278facac.mockapi.io/'
const endPoint = {
    products: 'products'
}

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
        console.log(data)
        await callback(data)
    }
    catch (error) {
        console.log('error')
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
        <div>
            <div class="image" style="background-image: url(${imgs[0]});"></div>
            <h4><a href="#" onclick="detailProduct(${id})"></a>${name}</h4>
        
            <p>${formatPrice(price)}đ</p>
        </div>
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

let quantityValue = 1
async function detailProduct(id) {
    quantityValue = 1
    document.querySelector('.listItem').innerHTML = ''
    let product = null
    try {
        const res = await fetch(apiUrl + endPoint.products + "/" + id)
        product = await res.json()
        console.log(product)

    } catch (error) {
        console.log(error)

    }

    if (product === null) return

    let { imgs, name, price, type, stock } = product

    let imageArr = imgs.map(function (item) {
        return `<img onclick='changeImg("${item}")' src=${item} width='100' class='imagePreview' >`
    })
    let imageString = imageArr.join('')

    console.log(1, product)

    const buyButton = stock === 0
        ? `<div class="SoldOutBtn"><p>----Sold out----</p></div>`
        : `<div class="addBtn"><p>Add to cart</p></div>`

    document.querySelector('.container').innerHTML = `
    <div class="backToPrd"><a href="products.html">Back To Products </a></div>
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
    console.log(quantityValue)


}

function increaseInputNumber() {
    ++quantityValue
    document.querySelector('.quantityNumber').innerHTML = quantityValue
    console.log(quantityValue)

}

const CART = 'CART'

function addToCart(data) {
    let { id, name, price, imgs } = data
    console.log(data)
    const currentCart = localStorage.getItem(CART)
    if (!currentCart) {
        console.log("check")
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
}

document.querySelector('.container').appendChild(loading.list())
