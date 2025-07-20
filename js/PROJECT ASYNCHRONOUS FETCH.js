

/// MENGGUNAKAN FETCH 

const tombolSearch = document.querySelector('.search-button')
const inputSearch = document.getElementById('search1')

tombolSearch.addEventListener('click', function (event) {
    fetch(`http://www.omdbapi.com/?apikey=8fc5d6f8&s=${inputSearch.value}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            console.log(response)
            let cards = ''
            response.Search.forEach(function (r, indeks) {
                cards += `<div class="container-card">
                            <section class="image">
                                <img src="${r.Poster}"
                                    alt="" srcset="">
                            </section>
                            <section class="body-card">
                                <p id="text-judul">${r.Title}</p>
                                <p id="text-years">${r.Year}</p>
                                <input class="show-button" data-imdbid="${r.imdbID}" type="button" value="Show Details">
                            </section>
                        </div>`

            })
            const parent = document.querySelector('.container') 
            parent.innerHTML = cards

            const tombolShowDetail = Array.from(document.getElementsByClassName('show-button'))
            tombolShowDetail.forEach(function (t, i) {
                t.addEventListener('click', function(event) {
                        fetch (`http://www.omdbapi.com/?apikey=8fc5d6f8&i=${t.dataset.imdbid}`)
                        .then (function (response) {
                            return response.json()
                        })
                        .then (function (response) {
                            console.log(response)
                            let movieDetail = `<div class="modal-icon"><img src="${response.Poster}" alt=""></div>
                                                <ul class="li-group">
                                                <li>
                                                    <p>${response.Title}</p>
                                                </li>
                                                <li>
                                                    <p id="director">Director : </p>
                                                    <p>${response.Director}</p>
                                                </li>
                                                <li>
                                                    <p>Actors : </p>
                                                    <p>${response.Actors}</p>
                                                </li>
                                                <li>
                                                    <p>Writer : </p>
                                                    <p>${response.Writer}</p>
                                                </li>
                                                <li>
                                                    <p>Plot : </p>
                                                    <p>${response.Plot}</p>
                                                </li>
                                                </ul>`
                            const parent = document.querySelector('.modal-body') 
                            parent.innerHTML = movieDetail
                            const modalContainer = document.querySelector('.modal-container')
                            const modal = document.querySelector('.modal')
                            modalContainer.classList.add('active')
                            modal.classList.add('active2')
                        })
                })
            })
        })
})

function closeModal () {
    // const close = document.querySelector('.close-btn')
    // close.addEventListener('click', function (event) {
        const modalContainer = document.querySelector('.modal-container')
        const modal = document.querySelector('.modal')
        modalContainer.classList.remove('active')
        modal.classList.remove('active2')
    // })
}