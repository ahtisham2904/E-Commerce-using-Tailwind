let loginForm = document.getElementById("LogIn-Form")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if(document.getElementById("loginEmail").value==="" || document.getElementById("loginPassword").value===""){
        alert("Plz fill the credentials!")
        return
    }
    if(localStorage.getItem('email')!==document.getElementById("loginEmail").value || localStorage.getItem('password')!==document.getElementById("loginPassword").value){
        alert("Email or password is wrong!")
        return
    }
    goToPage()
})

function goToPage() {
    window.location.href = "Dashboard-Main.html"
}