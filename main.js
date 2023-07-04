let header = document.createElement('div')
header.classList.add('header')
header.innerHTML = `
<div class="header">
        
        <a href="index.html"><p><span style="color: red;">BBW</span>Store</p></a>
        <div class="options">
            <a href="">Backpack</a>
            <a href="">Bag</a>
            <a href="">Wallet</a>
        </div>
        <div class="others">
            <button><i class="fa-solid fa-magnifying-glass" style="color: #fff;"></i></button>
            <button><i class="fa-solid fa-cart-shopping" style="color: #fff;"></i></button>             
        </div>
    </div>
`
document.querySelector('header').appendChild(header)

let homePage = document.createElement('div')
homePage.classList.add('homePage')
homePage.innerHTML = `
<div class="image">
    <img src="photos/home-page/schoolkid-holding-her-backpack-shoulders.jpg" alt="">
        <div class="text">
            <h1>BBW Local Brand</h1>
            <p>Được thành lập vào năm 2016, với nguồn cảm hứng từ cuộc sống thường ngày của các bạn trẻ năng động, sản phẩm của BBW luôn tập trung vào sự đơn giản nhưng cũng không kém phần thời trang.</p>
        </div>
</div>

`
document.querySelector('main').appendChild(homePage)
