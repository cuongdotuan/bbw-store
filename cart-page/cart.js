let CART = "CART"


function formatPrice(price) {
    return price.toLocaleString('vi-VN');
}
function renderCart() {
    let totalPrice = 0
    let result = getCartLocalStorage()
    if (result === null) return
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
        console.log('aaa')
        let result = getCartLocalStorage()
        if (result === null) return
        let arrAfterFiltered = result.filter(function(x){
            return x.id !== id.toString()
        })
        if(arrAfterFiltered === null) return
        localStorage.setItem(CART, JSON.stringify(arrAfterFiltered))
        renderCart()
    }

}
renderCart()
