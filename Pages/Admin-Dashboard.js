let loginForm = document.getElementById("LogIn-Form")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(document.getElementById("loginEmail").value==="" || document.getElementById("loginPassword").value===""){
        alert("Plz fill the credentials!")
        return
    }
    let pass = 123
    let email = 123
    if(pass!==document.getElementById("loginEmail").value || email!==document.getElementById("loginPassword").value){
        alert("Email or password is wrong!")
        return
    }
    goToPage()
})

function goToPage() {
    window.location.href = "Dashboard-Main.html"
}
