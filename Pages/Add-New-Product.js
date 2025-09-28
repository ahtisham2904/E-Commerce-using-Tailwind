function makeObject(item){
    return{
        id : item.id,
        imgSrc : item.querySelector("img").getAttribute("src"),
        title : item.querySelector("h1").textContent,
        price : item.querySelector("h2").textContent,
        description : item.querySelector("p").textContent,
    }
}


let addForm = document.getElementById("addForm")
addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let productTitle = document.getElementById("Title").value
    let productPrice = document.getElementById("Price").value
    let productDescription = document.getElementById("Description").value
    let productCategory = document.getElementById("Category").value
    let productFile = document.getElementById("fileInput").value
    let productPhoto = document.getElementById("photoInput").files[0]
    if(productTitle==="" || productPrice==="" || productDescription==="" || productCategory==="" || !productPhoto){
        alert("Plz fill the details!")
        return
    }
    let arrayAddNewProducts = JSON.parse(localStorage.getItem("arrayAddNewProducts")) || []
    let AddProduct = document.createElement("div")
    AddProduct.setAttribute("id",`${arrayAddNewProducts.length+1}`)
    AddProduct.setAttribute("class","bg-white w-[250px] h-[500px] shadow-xl border border-[#a0a2a8] rounded-2xl flex flex-col justify-between items-center p-2 my-2 mx-2 transition-all hover:scale-105 ease-out duration-1000")
    AddProduct.innerHTML = `
        <img src="../Resoures/Page1-1.png" alt="">
        <h1>${productTitle}</h1>
        <h2>$${productPrice}</h2>
        <p>${productDescription}</p>
        <button>Add to Cart</button>
        <button>Add to Wishlist</button>
    `
    arrayAddNewProducts.push(makeObject(AddProduct))
    localStorage.setItem("arrayAddNewProducts",JSON.stringify(arrayAddNewProducts))
    alert("Item is successfully added.")
})


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