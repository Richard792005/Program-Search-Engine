
// coba request api
const array = []
console.log(array)

function getDataFilm(url, success, error) {
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

function success(results) {
    console.log(JSON.parse(results))

    let data = JSON.parse(results)
    if (data.Error.includes('Movie')) {
        alert(data.Error)
        return
    }
    else if (data.Error.includes('Incorrect')) {
        alert('Please Enter words !')
        return
    }
    let cards = ''

    data.Search.forEach(function (d, indeks) {
        cards += ` <div class="container-card">
                        <section class="image">
                            <img src="${d.Poster}"
                                alt="" srcset="">
                        </section>
                        <section class="body-card">
                            <p id="text-judul">${d.Title}</p>
                            <p id="text-years">${d.Year}</p>
                            <input class="show-button" data-imdbid="${d.imdbID}" type="button" value="Show Details">
                        </section>
                    </div>`
    })

    const parent = document.querySelector('.container')
    parent.innerHTML = cards

    const tombolShow = document.getElementsByClassName('show-button')
    const tombolS = Array.from(tombolShow)
    const modal = document.querySelector('.modal-container')
    tombolS.forEach(function (t, i) {
        t.addEventListener('click', function (event) {
            modal.classList.add('active')
            // console.log(t.dataset.imdbid)
            function getdata2(url, s, e) {
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
                if (hasil.Response === "False") {
                    alert("Detail film tidak ditemukan!");
                    return;
                }
                const movieDetail = ` <div class="modal-icon"><img src="${hasil.Poster}" alt=""></div>
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
                const modal2 = document.querySelector('.modal')
                modal2.classList.add('active2')
                parent2.innerHTML = movieDetail
            }

            function e(results) {
                console.log(results.responseText)
            }

            getdata2(`http://www.omdbapi.com/?apikey=8fc5d6f8&i=${t.dataset.imdbid}`, s, e)

        })
    })


}

function error(results) {
    console.log(results.responseText)
}

const tombolSearch = document.querySelector('.search-button')
const inputSearch = document.getElementById('search1')
tombolSearch.addEventListener('click', function (event) {
    // kita buat agar hasilnya sesuai value pencarian
    // getDataFilm('http://www.omdbapi.com/?apikey=8fc5d6f8&s=Avengers', success, error)
    console.log(inputSearch.value)
    getDataFilm(`http://www.omdbapi.com/?apikey=8fc5d6f8&s=${inputSearch.value}`, success, error)

})


function closeModal() {
    const tombol = document.querySelector('.close-btn')
    const parent = document.querySelector('.modal-container')
    tombol.addEventListener('click', function (event) {
        parent.classList.remove('active')
    })
}



