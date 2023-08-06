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
        // await removeLoader(prds)
        await renderProducts(prds)
        console.log(prds)
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
        console.log(error)
    }

}

fetchData(productParams)

async function renderProducts(products) {
    for (let i = 8; i <= 11; i++) {
        console.log(products[i])
        let { imgs, name, price, id } = products[i]
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('col-3')
        div.innerHTML = `
        <div class="image" style="background-image: url(${imgs});"></div>
            <h4 style="font-size: 20px;"><a href="./products/detail.html" onclick="setIdPrd(${id})"></a>${name}</h4>
        
            <p>${formatPrice(price)}đ</p>
        
        `
        document.querySelector('.renderPrds').appendChild(div)
        
    }
}

async function setIdPrd(id) {
    let idOfProduct = 'id'
    localStorage.setItem(idOfProduct , id)
    
}