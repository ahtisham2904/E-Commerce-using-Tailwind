let arrayAddNewProducts = JSON.parse(localStorage.getItem("arrayAddNewProducts")) || []
function AddNewItems() {
    let containerToAdd = document.getElementById("items")
    arrayAddNewProducts.forEach(element => {
        let itemId = element.id
        let itemSrc = element.imgSrc
        if(!itemSrc.includes("../")){
            itemSrc = "../"+itemSrc
        }
        let itemTitle = element.title
        let itemPrice = element.price
        let itemDescription = element.description
        let itemToAdd = document.createElement("div")
        itemToAdd.setAttribute("id",itemId)
        itemToAdd.setAttribute("class","bg-white w-[250px] h-[500px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2 transition-all hover:scale-105 ease-out duration-1000")
        itemToAdd.innerHTML = `
            <img class="w-[90%] h-[250px]" src="${itemSrc}" alt="">
            <h1 class="text-[20px] font-bold">${itemTitle}</h1>
            <h2 class="text-[#5045E6] font-bold">${itemPrice}</h2>
            <p class="text-center text-[#494a4b] text-[13px]">${itemDescription}</p>
            <button id="wBtn" onclick="RemoveItem('${itemId}')"  class="w-[100%] text-white bg-red-500 py-2 rounded-md relative bottom-0 transition-all hover:scale-105 ease-out duration-1000">Remove item</button>
        `
        containerToAdd.appendChild(itemToAdd)
    })
}
AddNewItems()
function RemoveItem(value){
    arrayAddNewProducts = arrayAddNewProducts.filter(element => element.id !== value)
    localStorage.setItem("arrayAddNewProducts",JSON.stringify(arrayAddNewProducts))
    alert("Successfully Removed")
    location.reload()
}


