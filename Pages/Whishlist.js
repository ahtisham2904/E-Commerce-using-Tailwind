let itemData = JSON.parse(localStorage.getItem("arrayWish"))
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
        itemToAdd.setAttribute("class","bg-white w-[250px] h-[500px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2 transition-all hover:scale-105 ease-out duration-1000")
        itemToAdd.setAttribute("id",itemId)
        itemToAdd.innerHTML = `
            <img class="w-[90%] h-[250px]" src="${itemSrc}" alt="Error!">
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