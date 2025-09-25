function countCart() {
    let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || []
    let countCart = document.getElementById("countCart")
    countCart.style.display = "block"
    countCart.textContent = `${arrayCart.length}`
}
countCart()
function countWish() {
    let arrayWish = JSON.parse(localStorage.getItem("arrayWish")) || []
    let countWish = document.getElementById("countWish")
    countWish.style.display = "block"
    countWish.textContent = `${arrayWish.length}`
}
countWish()

let itemData = JSON.parse(localStorage.getItem("arrayCart"))
let totalAmount = parseFloat(0)
function loadItemsToCart(){
    let containerToAdd = document.getElementById("TableBody")
    itemData.forEach(element => {
        let itemId = element.id
        let itemSrc = element.imgSrc
        let itemTitle = element.title
        let itemPrice = element.price
        // let itemDescription = element.description
        let row = document.createElement("tr")
        row.setAttribute("id",itemId)
        row.setAttribute("class","h-[100px] text-center")
        row.innerHTML = `
                <td>
                    <img class="w-[60px] m-auto" src="${itemSrc}" alt="">
                </td>
                <td class="border-l border-[#dfe0e2]">${itemTitle}</td>
                <td id="price-${itemId}" class="border-l border-[#dfe0e2]">${itemPrice}</td>
                <td class="border-l border-[#dfe0e2]"><button onclick="decrement('${itemId}')" class="bg-[#dfe0e2] px-[10px] text-2xl">-</button>
                    <input class="w-[20px] ml-[10px]" type="text" id="qty-${itemId}" value="1">
                    <button onclick="increment('${itemId}')" class="bg-[#dfe0e2] px-[10px] text-2xl">+</button>
                </td>
                <td id="subTotal-${itemId}" class="border-l border-[#dfe0e2]">${itemPrice}</td>
                <td class="border-l border-[#dfe0e2]">
                    <button onclick="RemoveFromCart('${itemId}')" class="bg-red-500 text-white px-2 py-1 rounded-md">Remove</button>
                </td>
        `
        containerToAdd.appendChild(row)
        totalAmount+=parseFloat(itemPrice.replace(/[^0-9.]/g, ""))
        document.getElementById("total").textContent = `Total : ${totalAmount}`
    })
    if (itemData.length === 0) {
    document.getElementById("CheckOut").style.display = "none"
    document.getElementById("total").innerHTML = "Total : 0"
    }
}

function RemoveFromCart(itemId){
    itemData = itemData.filter(item => item.id!==itemId)
    localStorage.setItem("arrayCart",JSON.stringify(itemData))
    alert("Removed successfully")
    document.getElementById(itemId).remove()
    UpdateTotalAmount()
    countWish()
    countCart()
}

loadItemsToCart()

function increment(id) {
    let qty = document.getElementById("qty-"+id)
    qty.value = parseInt(qty.value) + 1
    UpdateSubTotal(id)
    UpdateTotalAmount()
}

function decrement(id) {
    let qty = document.getElementById("qty-"+id)
    if (parseInt(qty.value) > 1) {
        qty.value = parseInt(qty.value) - 1
        UpdateSubTotal(id)
        UpdateTotalAmount()
    }
}
function UpdateSubTotal(id){
    let totalSubtotal = parseFloat(0)
    let amount = parseFloat(document.getElementById("price-"+id).textContent.replace(/[^0-9.]/g, ""))
    let qty = parseInt(document.getElementById("qty-"+id).value)
    totalSubtotal = amount * qty
    document.getElementById("subTotal-"+id).textContent = `$${totalSubtotal.toFixed(2)}`
}

function UpdateTotalAmount(){
    totalAmount = 0
    itemData.forEach(element => {
        let itemId = element.id
        let price = parseFloat(document.getElementById("price-"+itemId).textContent.replace(/[^0-9.]/g, ""))
        let qty = parseInt(document.getElementById("qty-"+itemId).value)
        totalAmount += (price * qty)
        document.getElementById("total").textContent = `Total : ${totalAmount.toFixed(2)}`
    }) 
}
