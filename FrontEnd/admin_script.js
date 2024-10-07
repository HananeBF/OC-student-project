document.querySelector('form').addEventListener("submit", async (event) => {
    event.preventDefault()

    let emailInput = document.querySelector("#email").value
    let passwordInput = document.querySelector("#password").value
    let errorMessage = document.querySelector("#message-erreur")

    try {
        // POST request using fetch() 
        const response = await fetch("http://localhost:5678/api/users/login", {

            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
            }),

            // Adding headers to the request 
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!response.ok) {
            throw new Error(`Erreur dans l\'identifiant ou le mot de passe.`)

        }

        const data = await response.json()
        

        errorMessage.textContent = ""

        

        localStorage.setItem("token", data.token)
        window.location.href = "index.html"


    } catch (error) {
        errorMessage.textContent = error.message
    }
})