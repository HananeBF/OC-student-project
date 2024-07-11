// API categories via fetch
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {


        let display = ``
        for (li of data) {
            display += `
            <li data-id="${li.id}">${li.name}</li>
            `

        }
        document.querySelector(".category").insertAdjacentHTML("beforeend", display)
    })

    .catch(err => { console.log(err) }
    )


// API works via fetch
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {

        let display = ``

        for (let figure of data) {

            display += `

            <figure data-categoryId="${figure.categoryId}">
                <img src="${figure.imageUrl}" alt="${figure.title}"/>
                <figcaption>${figure.title}</figcaption>
            </figure>

          `

        }
        document.querySelector(".gallery").insertAdjacentHTML("beforeend", display)
    })
    .catch(err => {
        console.log(err)
    })

//listener categories buttons
/*
1 quand je clique je veux qu'il change de classe ->  addEvenListener click classlist add
2   s'il n'est pas cliqué je veux qu'il revienne à sa classe initiale  addEvenListener classlist remove
3   s'il est cliqué, je veux un filtre sur les numéro de catégories -> click event 
4   si c'est "tous" je veux que toutes les catégories apparaissent
*/
//listener categories buttons
let categoryList = document.querySelector(".category")
categoryList.addEventListener("click", () => {
    let currentIndexCategory = 0
    let categoryArrayLength = categoryList.length
    let categoryFilter = document.querySelector(".category")
    for (let i = 0; i < categoryArrayLength; i++) {
        console.log("categoryArrayLength", i)
        categoryFilter.insertAdjacentHTML("beforeend", `<div class="category li" id="category_${i}"></div>`)
    }
    //category ajouter fonction si clic filtre des images avec le filtre et add classlist category_selected
    document.querySelector("#category_0").classList.add("category_selected")

    /*else () => {
        return   
    }
    document.querySelector("#category_0").classList.remove("category_selected")*/
})
//category ajouter fonction si clic filtre des images avec le filtre et add classlist category_selected


// Add category class click create class
//document.querySelector("#category").classList.add("nav li")

//import { ajouterWorksImages } from "./works_script.js";
//import { ajouterCategory } from "./categories_script.js";







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