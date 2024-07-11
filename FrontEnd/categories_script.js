// API categories via fetch
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        console.log("categoriesList")
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
/*let categoryList = document.querySelector("#category")

    for (let i = 0; i < categoryList.length; i++) {
        categoryList[i].addEventListener("click", async function (event) {

        })
    }
}generercategories(categoryList) => {
    for (let i = 0; i < categoryList.length; i++) {

    }

    ajouterCategory();
}*/