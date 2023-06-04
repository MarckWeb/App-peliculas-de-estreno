//evento del menu desplaze
eventMenuButton()
function eventMenuButton(){
    let boton = document.getElementById("btn-menu")
let menu = document.getElementById("menu-nav")

boton.addEventListener("click", function(){
    menu.classList.toggle("open")
})
}


let botones = document.getElementById("site-contador")
let page = 1;

//sector eventos botones siguiente anterior
sectionButtonsNextAndBefore()
function sectionButtonsNextAndBefore(){
    let next = document.getElementById("btn-siguiente");
    let anterior = document.getElementById("btn-anterior");
    next.addEventListener("click", () => {
        if (page < 1000) {
            page++;
            callApiFilm()
            botones.innerHTML = `<span>${page}<span>`
        } else {
            alert("por ahora no tenemos mas peliculas")
        }
    });

    anterior.addEventListener("click", () => {
        if (page > 1) {
            page--;
            callApiFilm()
            botones.innerHTML = `<span>${page}<span>`
        }
    })
} 

//llamada a la api principal
callApiFilm()
function callApiFilm() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4c721357074c4e54e3f25878d8eee898&language=es-ES&page=${page}`)
        .then(resp => resp.json())
        .then(date => {
            printEtiquetsHtml(date.results)
        })
}

//imprimir etiquetas al escritorio
function printEtiquetsHtml(data) {
    let listMovie = '';
    data.forEach(movies => {
        listMovie += `
        <li class="items">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${movies.poster_path}">
            <h3 class="title"> ${movies.title}</h3>
            <p> Estreno: ${movies.release_date}</p>
            <p class="description">${movies.overview}</p>
            
        </li>`
    })
    document.querySelector("#galery-movies").innerHTML = listMovie;

    //para hacer la funcion de titulos
    let itemsLi = document.querySelectorAll(".items")
    
    itemsLi.forEach(item => {
        item.addEventListener("click", () => {
            let image = item.querySelector('.items img').src
            let title = item.querySelector('.title').innerHTML
            let description = item.querySelector(".description").innerHTML
            let date = item.querySelector(".items p").innerHTML
            
            const moviesObjet = {
                image,
                title,
                description,
                date   
            }
            arrayOfObjets(moviesObjet)
            
        })
    })
}

// guardar datos a localStorage
function arrayOfObjets(moviesObjet) {
    let exist = false
    let arrayMoviesAll =[];
    if(localStorage.getItem("results")){
        arrayMoviesAll = JSON.parse(localStorage.getItem("results"));
        for(i = 0; i < arrayMoviesAll.length; i++){
            if(arrayMoviesAll[i].title === moviesObjet.title){
                exist = true
            }
        }
        if(exist == false){
            arrayMoviesAll.push(moviesObjet)
            console.log(arrayMoviesAll)

            let stringiMovies = JSON.stringify(arrayMoviesAll)
            localStorage.setItem("results", stringiMovies)
        }
        else{
            alert('Esta pelicula ya tienes seleccionado como favoritos')
        }  

    }
    else{
        arrayMoviesAll.push(moviesObjet)
        console.log(arrayMoviesAll)

        let stringiMovies = JSON.stringify(arrayMoviesAll)
        localStorage.setItem("results", stringiMovies)
    }
}


















