

/// MENGGUNAKAN FETCH 


function getDataFilm(keyword) {
   return fetch(`https://www.omdbapi.com/?apikey=8fc5d6f8&s=${keyword}`) // pakai return untuk mengembalikan nilai
        .then(function (response) {
            if (response.ok === false) {
                throw new Error (response.statusText)
            }
            else {
                return response.json()
            }
            // return response.json()
        })
        .then(function (response) {
            console.log(response)
            if (response.Error && response.Error.includes('Incorrect')) {
                throw new Error('Input Word Please !')
            } else if (response.Error && response.Error.includes('Movie')) {
                throw new Error(response.Error)
            }
            else {
                return response
            }
        })
}

function elementCard(e) {
    return `<div class="container-card">
                            <section class="image">
                                <img src="${e.Poster}"
                                    alt="" srcset="">
                            </section>
                            <section class="body-card">
                                <p id="text-judul">${e.Title}</p>
                                <p id="text-years">${e.Year}</p>
                                <input class="show-button" data-imdbid="${e.imdbID}" type="button" value="Show Details">
                            </section>
                        </div>`
}

function elementModal (data) {
    return `<div class="modal-icon"><img src="${data.Poster}" alt=""></div>
                             <ul class="li-group">
                             <li>
                                <p>${data.Title}</p>
                             </li>
                             <li>
                                <p id="director">Director : </p>
                                <p>${data.Director}</p>
                            </li>
                             <li>
                                <p>Actors : </p>
                                <p>${data.Actors}</p>
                            </li>
                             <li>
                                <p>Writer : </p>
                                <p>${data.Writer}</p>
                            </li>
                            <li>
                                <p>Plot : </p>
                                <p>${data.Plot}</p>
                            </li>
                            </ul>`
}

function updateMovies(movies) {
    let cards = ''
    movies.Search.forEach(function (m, i) {
        cards += elementCard(m)
    })
    const parent = document.querySelector('.container')
    parent.innerHTML = cards
}


function getDataDetailShow (imdbid) {
    return  fetch (`https://www.omdbapi.com/?apikey=8fc5d6f8&i=${imdbid}`) 
    .then (function(response) {
        return response.json()
    })
    .then (function(response) {
        return response
    })
}
function updateDetailShow(data) {
    let movieDetail = ``
    movieDetail += elementModal(data)
    
    const modalBody = document.querySelector('.modal-body')
    const modalContainer = document.querySelector('.modal-container')
    const modal = document.querySelector('.modal')

    modalBody.innerHTML = movieDetail
    modalContainer.classList.add('active')
    modal.classList.add('active2')
}

const tombolSearch = document.querySelector('.search-button')
const inputSearch = document.getElementById('search1')

tombolSearch.addEventListener('click', async function (event) {
    try {
        let movies = await getDataFilm(inputSearch.value)
        updateMovies(movies)
    }
    catch (err) {
        // console.log(err)
        alert(err)
    }
})

document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('show-button')) {
        const imdbid = event.target.dataset.imdbid
        const data = await getDataDetailShow(imdbid)
        updateDetailShow(data)
        
    }
})

function closeModal() {
    // const close = document.querySelector('.close-btn')
    // close.addEventListener('click', function (event) {
    const modalContainer = document.querySelector('.modal-container')
    const modal = document.querySelector('.modal')
    modalContainer.classList.remove('active')
    modal.classList.remove('active2')
    // })
}