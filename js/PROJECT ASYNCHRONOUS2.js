/// ASYNCHRONOUS

function getDataFilm(url, success, error) {
    let xhr = new XMLHttpRequest

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.response)
            }
            if (xhr.status === 400) {
                error(xhr.responseText)
            }
        }
    }
    xhr.open('get', url)
    xhr.send()
}


function success(results) {
    let hasil = JSON.parse(results)

    // buat agar setiap hasil menghasilkan card
    let cards = ''
    hasil.Search.forEach(function (h, indeks) {
        cards += `<div class="container-card">
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
    })
    const parent = document.querySelector('.container')
    parent.innerHTML = cards

    const tombolShowDetail = Array.from(document.getElementsByClassName('show-button'))
    tombolShowDetail.forEach(function (t, indeks) {
        t.addEventListener('click', function (event) {

            function getData2(url, s, e) {
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

            function s(results) {
                const hasil = JSON.parse(results)
                const modalDetail = `<div class="modal-icon"><img src="${hasil.Poster}" alt=""></div>
                                        <ul class="li-group">
                                            <li>
                                                <p>${hasil.Title}</p>
                                            </li>
                                            <li>
                                                <p id="director">Director : </p>
                                                <p>${hasil.Director}</p>
                                            </li>
                                            <li>
                                                <p>Actors : </p>
                                                <p>${hasil.Actors}</p>
                                            </li>
                                            <li>
                                                <p>Writer : </p>
                                                <p>${hasil.Writer}</p>
                                            </li>
                                            <li>
                                                <p>Plot : </p>
                                                <p>${hasil.Plot}</p>
                                            </li>
                                        </ul>`
                const parent2 = document.querySelector('.modal-body')
                const modal2 = document.querySelector('.modal-container')
                const modal = document.querySelector('.modal')
                modal2.classList.add('active')
                modal.classList.add('active2')
                parent2.innerHTML = modalDetail
            }
            function e(results) {
                console.log(results.responseText)
            }
            getData2(`http://www.omdbapi.com/?apikey=8fc5d6f8&i=${t.dataset.imdbid}`, s, e)
        })
    })

}

function error(results) {
    console.log(results.responseText)
}

function closeModal() {
    const tombol = document.querySelector('.close-btn')
    const modal = document.querySelector('.modal-container')
    const modalbody = document.querySelector('.modal')
    tombol.addEventListener('click', function() {
        modal.classList.remove('active')
        modalbody.classList.remove('active2')

    })
}

const tombolSearch = document.querySelector('.search-button')
const inputSearch = document.getElementById('search1')

tombolSearch.addEventListener('click', function(event) {
    console.log(inputSearch.value)
    getDataFilm(`http://www.omdbapi.com/?apikey=8fc5d6f8&s=${inputSearch.value}`, success, error)
    
})


