const CART ="CART"

function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}
function renderCart() {
    let totalPrice = 0
    let result = getCartLocalStorage()
    
    
    if(result === null || result.length === 0){
        document.querySelector('.container').innerHTML =`
        
        <h1 style="margin-bottom: 32px; text-align: center; font-weight: 500;">Giỏ hàng của bạn</h1>
        <h4 style="text-align: center; margin-bottom: 48px">Giỏ hàng hiện tại đang trống !!!</h4>
        <a href="products.html" style="color: #3232ff;" class="backToPrd"><i
                    class="fa-solid fa-backward" style="color: #3232ff; margin-right: 8px;"></i>Xem thêm sản phẩm</a>
        `
        return
    }
    document.querySelector('.list-item').innerHTML = ''
    for (let item of result) {
        let { id, name, price, img, quantity } = item
        let totalPriceOfOne = price * quantity
        totalPrice = totalPrice + totalPriceOfOne
        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td class="d-flex" style="align-items: center;">
                <i onclick="deleteItem(${id})" class="fa-solid fa-circle-xmark" style="color: #ee4a4a; padding-right: 8px; cursor: pointer;"></i>
                <div class="ava">
                    <img src="${img}" alt="" width = "100">
                </div>
            </td>
                
            <td>
                <div>
                        <b>${name}</b>
                </div>
            </td>

            <td class="text-center">
                <div>
                    <p>${formatPrice(price)}</p>
                </div>
            </td>

            <td class="quantity-column text-center">
                <div class="d-flex quantity">
                    <i class="fa-solid fa-minus" onclick="decreaseQuantity(${id})"></i><p>${quantity}</p><i class="fa-solid fa-plus" onclick="increaseQuantity(${id})"></i>
                </div>
            </td>

            <td class="text-center">
                <div>
                    <b>${formatPrice(totalPriceOfOne)}đ</b>
                </div>
            </td>
        `

        document.querySelector('.list-item').appendChild(tr)
    }
    document.getElementById('totalPrice').innerHTML = `
    <p style="margin-right:8px">Tổng tiền:</p> <b style="font-size: 18px; margin-right: 12px">${formatPrice(totalPrice)}đ</b>
    `

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

function decreaseQuantity(id) {

    let result = getCartLocalStorage()
    if (result === null) return
    let item = result.find(function (x) {
        return x.id === id.toString()
    })
    if (item === null) return
    if (item.quantity < 2) {
        alert('Lỗi số lượng sản phẩm')
        return
    }
    item.quantity = item.quantity - 1
    localStorage.setItem(CART, JSON.stringify(result))
    renderCart()
}

function increaseQuantity(id) {
    let result = getCartLocalStorage()
    if (result === null) return
    let item = result.find(function (x) {
        return x.id === id.toString()
    })
    if (item === null) return
    item.quantity = item.quantity + 1
    localStorage.setItem(CART, JSON.stringify(result))
    renderCart()

}

function deleteItem(id) {
    let confirmDelete = confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?')
    if (confirmDelete === true) {
        let result = getCartLocalStorage()
        if (result === null) return
        let arrAfterFiltered = result.filter(function(x){
            return x.id !== id.toString()
        })
        if(arrAfterFiltered === null) return
        localStorage.setItem(CART, JSON.stringify(arrAfterFiltered))
        renderCart()
        renderNumer()
    }

}



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
renderCart()
