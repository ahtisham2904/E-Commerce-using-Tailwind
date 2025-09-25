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