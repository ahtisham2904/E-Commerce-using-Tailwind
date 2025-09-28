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

let itemData = JSON.parse(localStorage.getItem("arrayCart")) || []
let totalAmount = parseFloat(0)
function loadItemsToCart(){
    let containerToAdd = document.getElementById("TableBody")
    if(itemData.length !== 0){
        let hide = document.getElementById("CheckOut")
        hide.style.display = "block"
    }
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
        document.getElementById("total").textContent = `Total : $${totalAmount}`
    })
    if (itemData.length === 0) {
        document.getElementById("total").innerHTML = "Total : $0.00"
    }
}
loadItemsToCart()

function RemoveFromCart(itemId){
    itemData = itemData.filter(item => item.id!==itemId)
    localStorage.setItem("arrayCart",JSON.stringify(itemData))
    alert("Removed successfully")
    document.getElementById(itemId).remove()
    let Hide = document.getElementById("SearchSection")
    let Opacity = document.getElementById("main")
    Hide.style.display = "none"
    Opacity.style.opacity = "1"
    document.getElementById("SearchBox").value = ""
    UpdateTotalAmount()
    countWish()
    countCart()
}


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
    }
    UpdateTotalAmount()
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
    })
    document.getElementById("total").textContent = `Total : $${totalAmount.toFixed(2)}`
}



let searchBox = document.getElementById("SearchBox")
searchBox.addEventListener("input", SearchItems)
function SearchItems() {
    let searchedTitle = document.getElementById("SearchBox").value.replace(/\s+/g, "").toLowerCase()
    let results = itemData.filter(el => el.title.replace(/\s+/g, "").toLowerCase().includes(searchedTitle))
    let Hide = document.getElementById("SearchSection")
    let Opacity = document.getElementById("main")
    let container = document.getElementById("SearchedItems")
    container.innerHTML = ""
    if (searchedTitle === "") {
        Hide.style.display = "none"
        Opacity.style.opacity = "1"
        return
    }
    Opacity.style.opacity = "0.2"
    Hide.style.opacity = "1"
    Hide.style.display = "block"
    if (results.length === 0) {
        container.innerHTML = `<p class="text-center text-red-500 mt-4">No items found!</p>`
        return
    }
    loadToSearchList(results)
}

function loadToSearchList(elements){
    let containerToAdd = document.getElementById("SearchedItems")
    elements.forEach(element => {
        let itemTitle = element.title
        let itemToAdd = document.createElement("button")
        itemToAdd.setAttribute("onclick",`ShowSearchedItem('${element.id}')`)
        itemToAdd.innerHTML = `
            ${itemTitle.slice(0,20)}
        `
        containerToAdd.appendChild(itemToAdd)
    })
}
function ShowSearchedItem(id){
    let searchResultContainer = document.getElementById("SearchedItems")
    searchResultContainer.innerHTML = ""
    let itemToAdd = document.getElementById(id)
    let item = itemData.find(item => item.id == id)
    itemToAdd.setAttribute("class","mx-auto mb-[25px] bg-white w-[250px] h-[450px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 mt-7")
    itemToAdd.setAttribute("id",item.id)
    itemToAdd.innerHTML = `
        <img class="w-[90%] h-[200px] transition-all hover:scale-115 ease-out duration-1500" src="${item.imgSrc}" alt="Error!">
        <h1 class="text-[20px] font-bold">${item.title.slice(0,20)}</h1>
        <h2 class="text-[#5045E6] font-bold">$${item.price}</h2>
        <p class="text-center text-[#494a4b] text-[13px]">${item.description.slice(0,60)}</p>
        <button id="rBtn" onclick="RemoveFromCart('${item.id}')" class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Remove from Wishlist</button>
    `
    searchResultContainer.appendChild(itemToAdd)
}

function CheckOutItems(){
    if(itemData.length===0){
        alert("Plz add items in cart!")
        return
    }
    let main = document.getElementById("main")
    let Hide = document.getElementById("CheckOut")
    Hide.style.display = "block"
    main.style.opacity = "0.2"
    Hide.style.opacity = "1"
    let box = document.createElement("div")
    box.setAttribute("id","checkOutBox")
    box.setAttribute("class","absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 overflow-x-auto max-[510px]:overflow-x-auto bg-white p-[10px]")
    box.innerHTML = `
        <table class="border-2 border-[#d4d4d6] max-[700px]:w-[90vw] w-[600px] m-auto">
            <thead>
                <tr>
                    <th class="border border-[#dfe0e2] bg-[#d9dbe1] py-2 px-4 flex justify-between"><button onclick="RemoveCheckBox()" class="text-white bg-red-600 p-[5px] rounded-[40%]">X</button>Image</th>
                    <th class="border border-[#dfe0e2] bg-[#d9dbe1] py-2 px-4">Title</th>
                    <th class="border border-[#dfe0e2] bg-[#d9dbe1] py-2 px-4">Amount</th>
                </tr>
            </thead>
            <tbody id="TableBody" class="bg-[#1E90FF]">

            </tbody>
        </table>
    `
    itemData.forEach(item => {
        let row = document.createElement("tr")
        row.setAttribute("class","h-[100px] text-center")
        let itemId = item.id
        let itemSrc = item.imgSrc
        let itemTitle = item.title
        let itemPrice = document.getElementById("subTotal-"+item.id).textContent
        row.innerHTML = `
                    <td>
                        <img class="w-[60px] m-auto" src="${itemSrc}" alt="">
                    </td>
                    <td class="border-l border-[#dfe0e2] text-white">${itemTitle}</td>
                    <td id="price-${itemId}" class="border-l border-[#dfe0e2] text-white">${itemPrice}</td>
            `
        box.querySelector("tbody").appendChild(row)
    })

    let TotalAmount = document.getElementById("total").textContent
    console.log(TotalAmount)
    box.innerHTML += `
        <h2 class="text-3xl pl-[20px] my-[20px] mx-[20px] flex justify-center text-[#1E90FF]">${TotalAmount}</h2>
        <button onclick="ConfirmItems()" class="bg-green-600 p-[5px] rounded-md text-white relative left-1/2 -translate-x-1/2">Confirm</button>
    `
    document.getElementById("CheckOut").appendChild(box)
}
function ConfirmItems() {
    localStorage.setItem("arrayCart",JSON.stringify([]))
    alert("Your Order has been successfully placed.")
    location.reload()
}
function RemoveCheckBox(){
    let main = document.getElementById("main")
    let Hide = document.getElementById("CheckOut")
    main.style.opacity = "1"
    Hide.innerHTML = ""
    Hide.style.display = "none"
}

function ShowHamburgerMenu() {
    let existingMenu = document.getElementById("hamburgerMenu")
    if (existingMenu) {
        existingMenu.remove()
        return
    }

    let links = document.createElement("div")
    links.setAttribute("id", "hamburgerMenu")
    links.setAttribute("class", "w-[200px] absolute top-2 right-20 bg-white rounded-sm shadow-lg z-40")
    links.innerHTML = `
        <nav class="flex flex-col text-[#1E90FF] text-[20px]">
            <a class="px-3 py-2 transition-all duration-500 ease-in-out hover:bg-[#1E90FF] text-[#58595f] hover:text-white rounded" href="../index.html">Home</a>
            <a class="px-3 py-2 transition-all duration-500 ease-in-out hover:bg-[#1E90FF] text-[#58595f] hover:text-white rounded" href="../Pages/About.html">About</a>
            <a class="px-3 py-2 transition-all duration-500 ease-in-out hover:bg-[#1E90FF] text-[#58595f] hover:text-white rounded" href="../Pages/Contact.html">Contact</a>
            <a class="px-3 py-2 transition-all duration-500 ease-in-out hover:bg-[#1E90FF] text-[#58595f] hover:text-white rounded" href="../Pages/Admin-Dashboard.html">Admin Dashboard</a>
            
        </nav>
    `
    document.getElementById("header").appendChild(links)

    // Close menu when clicking outside
    document.addEventListener("click", function handleClickOutside(event) {
        const menu = document.getElementById("hamburgerMenu")
        const button = document.querySelector("#Hamburger button")
        if (menu && !menu.contains(event.target) && !button.contains(event.target)) {
            menu.remove();
            document.removeEventListener("click", handleClickOutside)
        }
    })
}