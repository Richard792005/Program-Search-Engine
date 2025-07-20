// buat function dulu
// FUNCTION ELEMENT CARD
function elementCard (h) {
    return `<div class="container-card">
                    <section class="image">
                        <img src="${h.Poster}"
                            alt="" srcset="">
                    </section>
                    <section class="body-card">
                        <p id="text-judul">${h.Title}</p>
                        <p id="text-years">${h.Year}</p>
                        <input class="show-button" data-imdbid="${h.imdbID}" type="button" value="Show Details">
                    </section>
                </div>`
}
// SELESAI //

function getDataFilm (url, success, error) {
    let xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.response)    
            }
            if (xhr.status === 404) {
                error(xhr.responseText)
            }
        }
    }
    xhr.open('get', url)
    xhr.send()
}

function success (results){
    const hasil = JSON.parse(results)
    // kita looping
    let cards = ''
    hasil.Search.forEach(function(h, indeks) {
        cards += elementCard(h)
    });
    const parent = document.querySelector('.container')
    parent.innerHTML = cards
    
    const tombolShowDetail = Array.from(document.querySelectorAll('.show-button'))
    tombolShowDetail.forEach(function (t, i) {
        t.addEventListener('click', function () {
            getDataDetailShow(`http://www.omdbapi.com/?apikey=8fc5d6f8&i=${t.dataset.imdbid}`, s, e)
            function s (results) {
                const hasil = JSON.parse(results)
                getMovieDetailBox (hasil)
            }
            function e (results) {}
        })
    })

}
function getMovieDetailBox (data) {
    const movieDetail = `<div class="modal-icon"><img src="${data.Poster}" alt=""></div>
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
    const parent = document.querySelector('.modal-body')
    const modalContainer = document.querySelector('.modal-container')
    const modalBody = document.querySelector('.modal')
    modalBody.classList.add('active2')
    modalContainer.classList.add('active')
    parent.innerHTML = movieDetail
}


function getDataDetailShow (url, s, e) {
    let xhr = new XMLHttpRequest
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                s(xhr.response)
            }
            if (xhr.status === 404) {
                e(xhr.responseText)
            }
        }
    }
    xhr.open('get', url) 
    xhr.send()
}

function error (results){
    console.log(results.responseText)
}

// event bundling
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('search-button')) {
        const inputSearch = document.querySelector('#search1')    
        getDataFilm(`http://www.omdbapi.com/?apikey=8fc5d6f8&s=${inputSearch.value}`, success, error)
    }
})
