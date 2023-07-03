let header = document.createElement('div')
header.classList.add('header')
header.innerHTML= `
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