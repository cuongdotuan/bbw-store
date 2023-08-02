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
        // await renderProducts(prds)
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