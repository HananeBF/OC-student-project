// API works via fetch
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        console.log("worksList")
        console.log(data)

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