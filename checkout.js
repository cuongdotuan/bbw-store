const CART = 'CART'

renderCartNumber()
renderListItem()
renderSubmitForm()
renderPrices()

function formatPrice(price) {
    const formattedPrice = price.toLocaleString('vi-VN')
    return formattedPrice;
}


function getCartFromLocalStorage() {
    let localStorageCart = localStorage.getItem(CART)
    try {
        let products = JSON.parse(localStorageCart)
        return products
    } catch (error) {
        return null
    }
}

function renderCartNumber() {
    const quantityProducts = getCartCount()

    document.querySelector('.cart').innerHTML = `
        <i class="fa-solid fa-cart-shopping" style="color: #fff;"></i>
        <p>Giỏ hàng | ${quantityProducts}</p>
    `
}

function getCartCount() {
    const currentCart = getCartFromLocalStorage()
    return !currentCart ? 0 : currentCart.length
}


function goToCart() {
    window.open("cart.html", "_self")
}

function renderSubmitForm() {
    const shippingDetailBlock = document.querySelector('.shipping-details')
    if (!shippingDetailBlock) return

    shippingDetailBlock.innerHTML = `
    <h1><a href="index.html">Trang chủ</a></h1>
    <form action="#" id="form" method="POST">
        <h3>Địa chỉ giao hàng</h3>
    
        <div class="full-name d-flex mb-12">
            <input id="firstName" name="firstName" type="text" placeholder="Tên" >
            <input id="lastName" name="lastName" type="text" placeholder="Họ và Tên đệm" >
        </div>
    
        <div class="phone-number mb-12">
            <input id="phoneNumber" name="phoneNumber" type="text" placeholder="Số điện thoại">
        </div>
        
        <div class="city mb-12">
            <select id="city" name="city" >
                <option disabled selected value>Chọn Thành phố</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
            </select>
        </div>
    
        <div class="town-ward d-flex mb-12">
            <input id="town" name="town" type="text" placeholder="Quận - Huyện">
            <input id="ward" name="ward" type="text" placeholder="Phường - Xã">
        </div>
    
        <div class="note mb-12">
            <input id="note" name="note" type="text" placeholder="Ghi chú về: Số nhà, Ngõ, Xóm...">
        </div>
    
        
    
        <button class="pay">Thanh toán</button>
    </form>
    `

    document.getElementsByTagName("select")[0].addEventListener("change", function (e) {
        let shippingFee = getShippingFee(e.target.value)
        const finalPrice = getToTalPrice() + shippingFee

        document.getElementById('shippingFee').innerHTML = `
        <span>Phí ship</span><span>${formatPrice(shippingFee)} đ</span>
        `
        document.getElementById('finalPrice').innerHTML = `
        <h5>TỔNG THIỆT HẠI</h5><h5><b>${formatPrice(finalPrice)} đ</b></h5>
        `
    })


    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const submitData = {}
        for (const arr of formData.entries()) {
            submitData[arr[0]] = arr[1]
            console.log(submitData)
        }
        try {
            validate(submitData)
            const products = getCartFromLocalStorage()
            
            const filterProducts = products.map(function(item){
                return ({id: item.id, quantity: item.quantity})
            })
            submitData.products = filterProducts

            postOrder(submitData)

            alert('Bạn đã đặt hàng thành công!!')
            window.open("index.html", "_self")
            localStorage.clear();


        } catch (error) {
            console.log(error.message)
        }

    })

}

function getShippingFee(city) {
    switch (city) {
        case "Hà Nội":
            return 20000
        case "TP Hồ Chí Minh":
            return 30000
        case "Đà Nẵng":
            return 25000
        default:
            return 0
    }
}



function renderListItem() {
    let listItem = getCartFromLocalStorage()
    if (!listItem) return
    for (let item of listItem) {
        let { img, name, price, quantity } = item
        let div = document.createElement('div')
        div.classList.add('item')
        div.classList.add('d-flex')
        div.innerHTML = `
        <div class="img"><img src=${img} alt="" style="width: 75px;"></div>
        <div class="name d-flex"><p><b>${name}</b></p>x<p><b>${quantity}</b></p></div>
        <div class="price d-flex"><p>${formatPrice(price * quantity)} đ</p></div>
        `
        document.querySelector('.list-item').appendChild(div)
    }
}

function validate(data) {
    if (!data.firstName) {
        document.getElementById("firstName").style.borderColor = 'red'
        throw new Error("First name is required")
    } else {
        document.getElementById("firstName").style.borderColor = '#bbbbbb'
    }

    if (!data.lastName) {
        document.getElementById("lastName").style.borderColor = 'red'
        throw new Error("Last name is required")
    } else {
        document.getElementById("lastName").style.borderColor = '#bbbbbb'
    }
    const phoneNumber = data.phoneNumber
    const re = new RegExp('(84|0[3|5|7|8|9])+([0-9]{8})')
    if (!re.test(phoneNumber)) {
        document.getElementById("phoneNumber").style.borderColor = 'red'
        throw new Error("Wrong phone number format")
    } else {
        document.getElementById("phoneNumber").style.borderColor = '#bbbbbb'
    }
    if (!data.city) {
        document.getElementById("city").style.borderColor = 'red'
        throw new Error("City is required")
    } else {
        document.getElementById("city").style.borderColor = '#bbbbbb'
    }
    if (!data.town) {
        document.getElementById("town").style.borderColor = 'red'
        throw new Error("Town is required")
    } else {
        document.getElementById("town").style.borderColor = '#bbbbbb'
    }
    if (!data.ward) {
        document.getElementById("ward").style.borderColor = 'red'
        throw new Error("Ward is required")
    } else {
        document.getElementById("ward").style.borderColor = '#222222'
    }
}

function renderPrices() {
    const totalPrice = getToTalPrice()
    document.querySelector('.total-price').innerHTML = `
    <div><span>Tổng tiền</span><span>${formatPrice(totalPrice)} đ</span></div>
    <div id="shippingFee"><span>Phí ship</span><span></span></div>
    <div id="finalPrice"><h5>TỔNG THIỆT HẠI</h5><h5><b></b></h5></div>
`
}

function getToTalPrice() {
    let listItem = getCartFromLocalStorage()
    let totalPrice = 0
    for (const item of listItem) {
        totalPrice = totalPrice + item.price * item.quantity
    }
    return totalPrice
}

function getFinalPrice() {
    const totalPrice = getToTalPrice()
    const shippingFee = getShippingFee()
    return totalPrice + shippingFee
}

async function postOrder(order) {
    const apiUrl = 'https://648704aabeba6297278facac.mockapi.io/orders'
    try {
        await fetch(apiUrl,{
            method:"POST",
            headers: {'content-type':'application/json'},
            body: JSON.stringify(order)
    })
    } catch (error) {
        console.log(error)
    }
    
}

