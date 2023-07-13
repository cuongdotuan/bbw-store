const apiUrl = 'https://648704aabeba6297278facac.mockapi.io/'
const endPoint = {
    products: 'products'
}

function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}
let productParams = {
    apiUrl: apiUrl,
    endPoint: endPoint.products,
    method: 'GET',
    async callback(prds) {
        // sort => sortedArr = [1 -> 10]

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

async function renderProducts(products) {
    // document.querySelector('.container').innerHTML = ''
    document.querySelector('.container').innerHTML = `
    <div class="optionFilter">
                <h4>TÌM THEO
                    <button onclick="toggleUnhideClass()" style="border: none; background-color: #fff;">
                        <i class="fa-solid fa-plus" style="color: #000000;"></i>
                    </button>
                </h4>
                <div class="option">
                    <ul>
                        <li><button onclick="sortDescPrice()">Giá <i class="fa-solid fa-sort-down" style="color: #000000;"></i></button></li>
                        <li><button onclick="sortAscPrice()">Giá <i class="fa-solid fa-sort-up" style="color: #000000;"></i></button></li>
                        <li><button onclick="filterByBackpack()">Backpack</button></li>
                        <li><button onclick="filterByBag()">Bag</button></li>
                        <li><button onclick="filterByWallet()">Wallet</button></li>
                    </ul>
                </div>

            </div>
    <div class="listItem"></div>

    `
    for (let product of products) {
        let { imgs, name, price } = product
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('col-3')
        div.innerHTML = `
        <div>
            <div class="image" style="background-image: url(../photos/backpack/campus/thumbnail.jpg);"></div>
            <h4><a href="#"></a>${name}</h4>
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

function filterByBackpack(){
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

function filterByBag(){
    let filterParams = {
        apiUrl: apiUrl,
        endPoint: endPoint.products,
        method: 'GET',
        async callback(arr) {
            
            let filteredArr = arr.filter(function (x) {
                return x.type === 'bag'
            })
            if(filteredArr.length === 0){
                console.log('khong co')
            }
            await renderProducts(filteredArr)
        }
    }
    fetchData(filterParams)
}


function filterByWallet(){
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


