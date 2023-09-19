import { menuArray } from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click",function(e){
    if(e.target.dataset.add){
        getYourOrder(e.target.dataset.add)
    } else if (e.target.dataset.removeItem){
        removeOrderedItem(e.target.dataset.removeItem)
    }
})


// Renders menu items to the order form
let yourOrder = []
let yourOrderHtml = ""
let totalPrice = 0;

function getYourOrder(menuId){
    
    const targetMenuObj = menuArray.filter(function(item){
        return item.id == menuId
    })[0]
    totalPrice = 0;
    yourOrder.push({name: targetMenuObj.name, price: targetMenuObj.price, orderid: uuidv4()})
    document.querySelector(".your-order").classList.remove("hidden")
    yourOrder.forEach(function(menu){
        yourOrderHtml += `
        <div class = "order-container">
            <div class="food-items">
                <div class = "item-choice">${menu.name}</div>
                <div class = "remove-food" data-remove-item="${menu.id}">remove</div>
            </div>
            <div class = "button-rm"
                <div class = "order-price">${menu.price}</div>
            </div
        </div>
        `
    })
    render()
}

function getTotalPrice(){
    for (const item of yourOrder){
        totalPrice += item.price
    }
    return "$" + totalPrice;
}

function removeOrderedItem(removeId){
    yourOrder = yourOrder.filter(function(item){
        return item.orderid !== removeId
    })
    totalPrice = 0;
    yourOrder.forEach(function(menu){
        yourOrderHtml += `
        <div class = "order-container">
            <div class="food-items">
                <div class = "item-choice">${menu.name}</div>
                <div class = "remove-food" data-remove-item="${menu.orderid}">remove</div>
            </div>
            <div class = "button-rm"
                <div class = "order-price">${menu.price}</div>
            </div
        </div>
        `
    })
    render()
}

// Renders the menu items
function getFeedHtml(){
    let menuHtml = ``
    
    menuArray.forEach(function(menu){
        const menuCurrency = "$" + menu.price
        menuHtml += 
`    <div class = "menu-inner">
        <img src="${menu.emoji}" class="item-pictures">
        <div class ="menu-description">
            <p class="menu-option">${menu.name}</p>
            <p class ="menu-item-variations">${menu.ingredients}</p>
            <p class ="item-price">${menuCurrency}</p>
        </div>
        <button class="add-btn" data-add="${menu.id}">+</button>
    </div>
`
    })
return menuHtml;
}

function render(){
    document.querySelector("#total-price").innerHTML = getTotalPrice();
    document.querySelector(".orders").innerHTML = yourOrderHtml;
    yourOrderHtml = "";
}

// Render modal //

const modalCloseBtn = document.getElementById('modal-close-btn')
const modal = document.getElementById('modal')

const completeOrderBtn = document.getElementById("complete-order")

completeOrderBtn.addEventListener("click", function(){
    modal.style.display = "flex"
})

modalCloseBtn.addEventListener("click", function(){
    modal.style.display = "none"
})

document.querySelector("#menu-items").innerHTML = getFeedHtml();
