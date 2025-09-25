let arrayAddNewProducts = []

async function FetchData() {
    try{
        let response = await fetch("https://fakestoreapi.com/products")
        arrayAddNewProducts = await response.json()
        arrayAddNewProducts = arrayAddNewProducts.filter(item => item.id<=8)
        let containerToAdd = document.getElementById("items")
        arrayAddNewProducts.forEach(element => {
            let itemId = element.id
            let itemSrc = element.image
            let itemTitle = element.title
            let itemPrice = element.price
            let itemDescription = element.description
            let itemToAdd = document.createElement("div")
            itemToAdd.setAttribute("id",itemId)
            itemToAdd.setAttribute("class","bg-white w-[250px] h-[450px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2")
            itemToAdd.innerHTML = `
                <img class="w-[90%] h-[200px] transition-all hover:scale-115 ease-out duration-1500" src="${itemSrc}" alt="">
                <h1 class="text-[20px] font-bold">${itemTitle.slice(0,20)}</h1>
                <h2 class="text-[#5045E6] font-bold">$${itemPrice}</h2>
                <p class="text-center text-[#494a4b] text-[13px]">${itemDescription.slice(0,60)}</p>
                <button id="cBtn" onclick="addToCart('${itemId}')" class="w-[100%] text-white bg-green-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Cart</button>
                <button id="wBtn" onclick="addToWishList('${itemId}')"  class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Wishlist</button>
            `
            containerToAdd.appendChild(itemToAdd)
        })
    }
    catch(error){
        console.error("Error fetching data:",error)
    }
}
FetchData()

function makeObject(item){
    return{
        id : item.id,
        imgSrc : item.querySelector("img").src,
        title : item.querySelector("h1").textContent,
        price : item.querySelector("h2").textContent,
        description : item.querySelector("p").textContent,
    }
}

function countCart() {
    let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || []
    if(arrayCart.length!==0){
        let countCart = document.getElementById("countCart")
        countCart.style.display = "block"
        countCart.textContent = `${arrayCart.length}`
    }
}
countCart()

function countWish() {
    let arrayWish = JSON.parse(localStorage.getItem("arrayWish")) || []
    if(arrayWish.length!==0){
        let countWish = document.getElementById("countWish")
        countWish.style.display = "block"
        countWish.textContent = `${arrayWish.length}`
    }
}
countWish()

function addToCart(itemId){
    let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || []
    let item = document.getElementById(itemId)
    let cloneItem = item.cloneNode(true)
    let exists = arrayCart.find(element => element.id === cloneItem.id)
    if(!exists){
        truckMove()
        let itemAdd = makeObject(cloneItem)
        arrayCart.push(itemAdd)
        localStorage.setItem("arrayCart",JSON.stringify(arrayCart))
        let message = document.createElement("div")
        message.setAttribute("class","w-[300px] text-center fixed top-20 left-1/2 -translate-x-1/2 transform -translate-y-full " +
                                    "bg-green-500 text-white px-6 py-3 rounded shadow z-50 transition-all duration-500")
        message.innerHTML = `
            <p>Added to cart successfully.</p>
        `
        document.getElementById("Home").append(message)
        DelayMessage(message)
        countCart()
    }
    else{
        let truckShow = document.getElementById("truck")
        truckShow.style.display = "none"
        let message = document.createElement("div")
        message.setAttribute("class","w-[300px] text-center fixed top-20 left-1/2 -translate-x-1/2 transform -translate-y-full " + "bg-red-500 text-white px-6 py-3 rounded shadow z-50 transition-all duration-500")
        message.innerHTML = `
            <p>Already exists in cart!</p>
        `
        document.getElementById("Home").append(message)
        DelayMessage(message)
    }
}

function addToWishList(itemId) {
    let arrayWish = JSON.parse(localStorage.getItem("arrayWish")) || []
    let item = document.getElementById(itemId)
    let cloneItem = item.cloneNode(true)
    let exists = arrayWish.find(element => element.id === cloneItem.id)
    if(!exists){
        truckMove()
        let itemAdd = makeObject(cloneItem)
        console.log(itemAdd)
        arrayWish.push(itemAdd)
        localStorage.setItem("arrayWish",JSON.stringify(arrayWish))
        let message = document.createElement("div")
        message.setAttribute("class","w-[300px] text-center fixed top-20 left-1/2 -translate-x-1/2 transform -translate-y-full " +
                                    "bg-green-500 text-white px-6 py-3 rounded shadow z-50 transition-all duration-500")
        message.innerHTML = `
            <p>Added to wishlist successfully.</p>
        `
        document.getElementById("Home").append(message)
        DelayMessage(message)
        countWish()
    }
    else{
        let truckShow = document.getElementById("truck")
        truckShow.style.display = "none"
        let message = document.createElement("div")
        message.setAttribute("class","w-[300px] text-center fixed top-20 left-1/2 -translate-x-1/2 transform -translate-y-full " + "bg-red-500 text-white px-6 py-3 rounded shadow z-50 transition-all duration-500")
        message.innerHTML = `
            <p>Already exists in wishlist!</p>
        `
        document.getElementById("Home").append(message)
        DelayMessage(message)
    }
}

function DelayMessage(message){
    setTimeout(() => {
        message.classList.replace("-translate-y-full","translate-y-0")
    }, 50)
    setTimeout(() => {
        message.classList.replace("translate-y-0","-translate-y-full")
        message.classList.replace("top-20","top-0")
        // remove from DOM after animation ends
        setTimeout(() => {
            message.remove()
        }, 500)
    }, 3000)
    
}

async function truckMove(){
    let truckShow = document.getElementById("truck")
    truckShow.style.display = "block"
    await new Promise(resolve => setTimeout(resolve, 10000))
    truckShow.style.display = "none"
}

let searchBox = document.getElementById("SearchBox")
searchBox.addEventListener("input", SearchItems)
function SearchItems() {
    let searchedTitle = document.getElementById("SearchBox").value.replace(/\s+/g, "").toLowerCase()
    let results = arrayAddNewProducts.filter(el => el.title.replace(/\s+/g, "").toLowerCase().includes(searchedTitle))
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
        let itemId = element.id
        let itemSrc = element.image
        let itemTitle = element.title
        let itemPrice = element.price
        let itemDescription = element.description
        let itemToAdd = document.createElement("div")
        itemToAdd.setAttribute("class","mx-auto mb-[25px] bg-white w-[250px] h-[450px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 mt-7")
        itemToAdd.setAttribute("id",itemId)
        itemToAdd.innerHTML = `
            <img class="w-[90%] h-[200px] transition-all hover:scale-115 ease-out duration-1500" src="${itemSrc}" alt="Error!">
            <h1 class="text-[20px] font-bold">${itemTitle.slice(0,20)}</h1>
            <h2 class="text-[#5045E6] font-bold">$${itemPrice}</h2>
            <p class="text-center text-[#494a4b] text-[13px]">${itemDescription.slice(0,60)}</p>
            <button id="cBtn" onclick="addToCart('${itemId}')" class="w-[100%] text-white bg-green-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Cart</button>
            <button id="wBtn" onclick="addToWishList('${itemId}')"  class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Wishlist</button>
        `
        containerToAdd.appendChild(itemToAdd)
    })
}

// function LoadFromStorage(){
//     let arrayAddNewProducts = JSON.parse(localStorage.getItem("arrayAddNewProducts")) || []
//     let containerToAdd = document.getElementById("items")
//     arrayAddNewProducts = arrayAddNewProducts.filter(item => item.id<=8)
//     arrayAddNewProducts.forEach(element => {
//         let itemId = element.id
//         let itemSrc = element.imgSrc
//         let itemTitle = element.title
//         let itemPrice = element.price
//         let itemDescription = element.description
//         let itemToAdd = document.createElement("div")
//         itemToAdd.setAttribute("id",itemId)
//         itemToAdd.setAttribute("class","bg-white w-[250px] h-[500px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2 transition-all hover:scale-105 ease-out duration-1000")
//         itemToAdd.innerHTML = `
//             <img class="w-[90%] h-[250px]" src="${itemSrc}" alt="">
//             <h1 class="text-[20px] font-bold">${itemTitle}</h1>
//             <h2 class="text-[#5045E6] font-bold">${itemPrice}</h2>
//             <p class="text-center text-[#494a4b] text-[13px]">${itemDescription}</p>
//             <button id="cBtn" onclick="addToCart('${itemId}')" class="w-[100%] text-white bg-green-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Cart</button>
//             <button id="wBtn" onclick="addToWishList('${itemId}')"  class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Add to Wishlist</button>
//         `
//         containerToAdd.appendChild(itemToAdd)
//     })
// }
// LoadFromStorage()

// function makeObject1(item){
//     return{
//         id : item.id,
//         imgSrc : item.querySelector("img").getAttribute("src"),
//         title : item.querySelector("h1").textContent,
//         price : item.querySelector("h2").textContent,
//         description : item.querySelector("p").textContent,
//     }
// }

// function AddToStorage(){
//     let arrayAddNewProducts = JSON.parse(localStorage.getItem("arrayAddNewProducts")) || []
//     for(let i=1;i<=8;i++){
//         let item = document.getElementById(i)
//         if (item) {  // check that element exists
//             let object = makeObject1(item);
//             arrayAddNewProducts.push(object);
//         }
//     }
//     localStorage.setItem("arrayAddNewProducts",JSON.stringify(arrayAddNewProducts))
// }
// AddToStorage()