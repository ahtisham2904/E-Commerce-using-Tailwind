let itemData = JSON.parse(localStorage.getItem("arrayWish")) || []
function loadToWishList(){
    let containerToAdd = document.getElementById("main")
    if(itemData.length===0){
        containerToAdd.innerHTML = `
            <h1>There will bw no item in the WishList!</h1>
        `
        return
    }
    itemData.forEach(element => {
        let itemId = element.id
        let itemSrc = element.imgSrc
        let itemTitle = element.title
        let itemPrice = element.price
        let itemDescription = element.description
        let itemToAdd = document.createElement("div")
        itemToAdd.setAttribute("class","bg-white w-[250px] h-[450px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2")
        itemToAdd.setAttribute("id",itemId)
        itemToAdd.innerHTML = `
            <img class="w-[90%] h-[250px] transition-all hover:scale-115 ease-out duration-1500" src="${itemSrc}" alt="Error!">
            <h1 class="text-[20px] font-bold">${itemTitle}</h1>
            <h2 class="text-[#5045E6] font-bold">${itemPrice}</h2>
            <p class="text-center text-[#494a4b] text-[13px]">${itemDescription}</p>
            <button id="rBtn" onclick="RemoveFromWishList('${itemId}')" class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Remove from Wishlist</button>
        `
        containerToAdd.appendChild(itemToAdd)
    })
}
loadToWishList()

function RemoveFromWishList(itemId){
    itemData = itemData.filter(item => item.id!==itemId)
    localStorage.setItem("arrayWish",JSON.stringify(itemData))
    alert("Removed successfully")
    document.getElementById(itemId).remove()
    let Hide = document.getElementById("SearchSection")
    let Opacity = document.getElementById("main")
    Hide.style.display = "none"
    Opacity.style.opacity = "1"
    document.getElementById("SearchBox").value = ""
    countWish()
    countCart()
}

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
        <button id="rBtn" onclick="RemoveFromWishList('${item.id}')" class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Remove from Wishlist</button>
    `
    searchResultContainer.appendChild(itemToAdd)
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