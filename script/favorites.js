
//inserta valores del busacdor siguiente y anterior
respMovies(JSON.parse(localStorage.getItem("results")))
function respMovies(data){
   
    let moviesCard = '';
    data.forEach(movies => {
        moviesCard += `
        <section class ="item-movie">
            <img width="150px" src="${movies.image}">
            <div class ="site-descript">
                <h3>${movies.title}</h3>
                <p>DESCRIPTION: ${movies.description}</p>
                <p>${movies.date}</p>
                <a target="_blank" href="https://www.youtube.com/watch?v=FSyWAxUg3Go">Ver Trailer</a>
                <button id ="btn-delete">Eliminar</button>
            </div>
        </section>`
    });
    document.querySelector(".site-favorits").innerHTML= moviesCard
    
    let moviesAll = document.querySelectorAll(".item-movie")

    //funcion que tiene como parametro el array obtenido del localstotage y el array con los divs de cada  movies
    deleteValuesLocalstorage(data, moviesAll)
}

//funcion que borra datos del local storage y los vuelve a guardar
function deleteValuesLocalstorage(data, moviesAll){   
    console.log(moviesAll)
    moviesAll.forEach(movies =>{
        
        let btn = movies.querySelector("#btn-delete");
        btn.addEventListener("click", ()=>{
            let moviesTitle = movies.querySelector(".item-movie h3").innerHTML
            //console.log(moviesTitle)
            let newData = data.filter(moviesOfTheLocal =>
                moviesOfTheLocal.title !== moviesTitle
            )
            let saveData = JSON.stringify(newData)
            localStorage.setItem("results",saveData)

            respMovies(JSON.parse(localStorage.getItem("results")))
        }) 
    })
}










