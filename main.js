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
document.querySelector('.container').appendChild(homePage)

let footer = document.createElement('div')
footer.classList.add('footer')
footer.innerHTML = `
<div>
    <h3>BBW Store</h3>
        <ul>
            <li><i class="fa-solid fa-truck-fast" style="color: #adadad;"></i>Ship COD toàn quốc</li>
            <li><i class="fa-solid fa-gift" style="color: #adadad;"></i>FREESHIP cho đơn hàng từ 500.000đ</li>
        </ul>
</div>
<div class="contact">
    <h3>Liên hệ</h3>
    <ul>
        <li><i class="fa-solid fa-location-dot" style="color: #adadad;"></i><b>Store</b>: 288 Giải Phóng - Thanh Xuân - Hà Nội</li>
        <li><i class="fa-solid fa-phone" style="color: #adadad;"></i>096 189 42 00</li>
        <li><i class="fa-regular fa-envelope" style="color: #adadad;"></i>bbwlocalbrand@gmail.com</li>
    </ul>
</div>
<div class="information">
    <h3>Thông tin</h3>
    <ul>
        <li><a href="policies/index.html">Chính sách bảo hành</a></li>
        <li><a href="policies/index.html">Hình thức vận chuyển</a></li>
        <li><a href="policies/index.html">Hình thức thanh toán</a></li>
        <li><a href="policies/index.html">Đổi trả sản phẩm</a></li>
    </ul>
</div>
<div class="link">
    <h3>Theo dõi</h3>
    <ul>
        <li><a href="https://www.facebook.com/" target="_blank"><i class="fa-solid fa-link" style="color: #adadad;"></i>Facebook</a></li>
        <li><a href="https://www.instagram.com/" target="_blank"><i class="fa-solid fa-link" style="color: #adadad;"></i>Instagram</a></li>
        <li><a href="https://www.youtube.com/" target="_blank"><i class="fa-solid fa-link" style="color: #adadad;"></i>Youtube</a></li>
    </ul>
</div>
`
document.querySelector('footer').appendChild(footer)