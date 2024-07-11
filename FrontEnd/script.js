//import { ajouterWorksImages } from "./works_script.js";
//import { ajouterCategory } from "./categories_script.js";


// Add category class cliquee create class 
//document.querySelector("#category").classList.add("nav li")


//listener categories buttons
/*let categoryList = document.querySelector(".category")
categoryList.addEventListener("click", () => {
    console.log(categoryList.textContent)
})

//empecher rechargement page après upload photo Add dans admin - structure
/*const form = document.querySelector('form')
form.addEventListener("submit", (event) =>{
    event.preventDefault()
    console.log("pas de rechargement de page")
    // a refine recuperer aussi le nom de la nouvelle image uploadee via alt par exemple
    const imageRecupere = document.querySelector("#nouvelleImage").alt
    console.log(imageRecupere)
    })
*/

//category ajouter fonction si clic filtre des images avec le filtre et add classlist category_selected

/*let currentIndexCategory = 0
let categoryArrayLength = categoryList.length
let categoryFilter = document.querySelector(".category")
for (let i = 0; i < categoryArrayLength; i++) {
	console.log("categoryArrayLength", i)
	categoryFilter.insertAdjacentHTML("beforeend", `<div class="category li" id="category_${i}"></div>`)
}
document.querySelector("#category_0").classList.add("category_selected")

/*categoryFilter.addEventListener("click", (event) =>{
    console.log(categoryFilter).textContent
})
*/