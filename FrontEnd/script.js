const cat = localStorage.getItem("token")
const modalGalery = document.querySelector(".modal_photo")
console.log(cat)
if (cat !== null) {
    document.querySelector("#logIn").textContent = "logout"
    document.querySelector(".category").style.display = "none"
    document.querySelector("#modify").style.display = "inline-block"
    document.querySelector("#edition-banner").style.display = "inline-block"

    //Add modal_container when I click on modify
    document.querySelector("#modify").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "flex"

    })
    document.querySelector(".modal_container").addEventListener("click", (event) => {
        if (event.target.className == "modal_container")
            document.querySelector(".modal_container").style.display = "none"
    })

    document.querySelector("#croix").addEventListener("click", () => {
        document.querySelector(".modal_container").style.display = "none"
    })

    //add new modal and addFigure
    document.querySelector("#addPhoto").addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelector(".galeriephoto").style.display = "none"
        document.querySelector(".modal_add_file").style.display = "flex"
        document.querySelector(".modal_photo").style.display = "none"
        document.querySelector("#addPhoto").style.display = "none"

    })

    //return to the previous modal
    document.querySelector("#back_arrow").addEventListener("click", (event) => {
        event.preventDefault()
        document.querySelector(".galeriephoto").style.display = "flex"
        document.querySelector(".modal_add_file").style.display = "none"
        document.querySelector(".modal_photo").style.display = "flex"
        document.querySelector("#addPhoto").style.display = "flex"
    })

}



// API categories via fetch
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {


        let display = ``
        for (li of data) {
            display += `
            <li data-id="${li.id}" class="categoryBtn">${li.name}</li>
            `

        }
        document.querySelector(".category").insertAdjacentHTML("beforeend", display)
        startFilterListener()
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

const startFilterListener = () => {
    const categoryFilter = document.querySelectorAll(".categoryBtn")

    for (elem of categoryFilter) {
        elem.addEventListener("click", (event) => {
            let productAll = document.querySelectorAll(".gallery > figure")

            for (item of productAll) {
                item.classList.remove("gallery_hidden")
                
                document.querySelector(".tout").classList.add("category_selected")

            }

            if (event.target.dataset.id !== "0") {
                const productFilter = document.querySelectorAll(".gallery > figure:not([data-categoryId='" + event.target.dataset.id + "'])")
                //console.log(event)
                //console.log(event.target.dataset.id)

                for (item of productFilter) {
                    item.classList.add("gallery_hidden")
                    document.querySelector(".tout").classList.remove("category_selected")
                    elem.dataset.id.classList.add("category_selected")
                }

            } else {
                categoryFilter.classList.remove("category_selected")
            }

        })
    }
}
// inject figure on modal for admin version
async function displayGaleryModal() {
    try {

        document.querySelector(".modal_photo").innerHTML = ""
        const galleryPhoto = await fetch("http://localhost:5678/api/works")
        const data = await galleryPhoto.json()


        let display = ``

        for (let figure of data) {

            display += `
                
                <figure data-categoryId="${figure.categoryId}" >
                    <img src="${figure.imageUrl}" alt="${figure.title}"/>
                    
                    <i class="fa-regular fa-trash-can" id="${figure.id}"></i>
                    
                </figure>

              `

        }
        document.querySelector(".modal_photo").insertAdjacentHTML("beforeend", display)
        deleteGaleryModal()


    } catch (err) {
        console.log(err)
    }
}

displayGaleryModal()

//add trash can and delete method
const deleteGaleryModal = async () => {
    const deletePhoto = document.querySelectorAll(".fa-trash-can")
    for (elem of deletePhoto) {
        elem.addEventListener("click", (event) => {
            //console.log(event.target.id)
            event.preventDefault()

            let idPhoto = event.target.id
            const deleteJson = {
                method: "DELETE",
                headers: {
                    "content-Type": "application.json",
                    "accept": "*/*",
                    "Authorization": "Bearer: " + cat
                },
            }
            fetch("http://localhost:5678/api/works/" + idPhoto, deleteJson)
                .then((res => {
                    if (!res.ok) {
                        console.log("delete failed")
                    }
                    event.preventDefault()
                }))

                .then((elem) => {
                    console.log("delete succeed", elem)
                    deleteGaleryModal()
                    displayGaleryModal()
                    event.preventDefault()
                })



        })

    }

}
// preview img on addFile and initialize 
let previewFile = document.querySelector("#apercu")
let addPreviewFile = document.querySelector(".addFile input")
let labelPreviewFile = document.querySelector(".addFile label")
addPreviewFile.addEventListener("change", (event) => {
    console.log(event)
    console.log(previewFile)
    previewFile.style.display = "flex"
    previewFile.src = URL.createObjectURL(event.target.files[0])
    //document.querySelector(".fa-image").style.display = "none"
    //document.querySelector(".format-image").style.display = "none"
})



//add category on form option category

fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {


        let display = ``
        for (option of data) {
            display += `
            <option value="${option.id}">${option.name}</option>
            `

        }
        document.querySelector("#category").insertAdjacentHTML("beforeend", display)
        
        postImage()
    })
    .catch(err => { console.log(err) }
    )



const postImage = async () => {
    const addImage = document.querySelectorAll("#validate")
    document.querySelector("#validation").addEventListener("submit", (event) => {
        event.preventDefault()
        let data = new FormData()
        data.append('image', document.querySelector("#file").files[0])
        data.append('title', document.querySelector("#title").value)
        data.append('category', document.querySelector("#category").value)   
        const addJson = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + cat
            },
            body: data
        }
        fetch("http://localhost:5678/api/works/", addJson)
            .then(blob => blob.json())
            .then(data =>{
                console.log(data)
                document.querySelector("#apercu").setAttribute("src","")
                document.querySelector("#apercu").style.display = "none"
                document.querySelector("#title").value=''
                document.querySelector("#category").value=''
            })
            .catch(err =>{
                console.log(err)
            })
    })

}


