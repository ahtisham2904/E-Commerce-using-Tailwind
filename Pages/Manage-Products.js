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


function ShowHamburgerMenu() {
    let existingMenu = document.getElementById("hamburgerMenu")
    if (existingMenu) {
        existingMenu.remove()
        return
    }

    let links = document.createElement("div")
    links.setAttribute("id", "hamburgerMenu")
    links.setAttribute("class", "w-[200px] fixed top-2 right-20 bg-white rounded-sm shadow-lg z-40")
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

