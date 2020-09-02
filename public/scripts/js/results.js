const resultsBtn = document.querySelector('[name="results-submit"]')
const resultForm = document.querySelector('#results')

resultsBtn.addEventListener('mousedown', function () {
    if (this.innerHTML === `Submit`) {
        this.innerHTML = `Submitted`
        this.style.maxWidth = `70px`
        this.style.backgroundColor = `#045489`
        this.style.color = `#c7e9c0`
        this.style.outline = `none`
        this.style.border = `none`
    } else if ((this.innerHTML = `Submitted`)) {
        this.innerHTML = `Submit`
    }
})

/* Scroll to bottom button code */
const scrollButton = document.querySelector('.scroll')

function scrollStep() {
    window.scroll(0, window.pageYOffset + 100)
    console.log(window.pageYOffset + 100)
}

scrollButton.addEventListener('click', scrollStep)

// remove img src broken links

document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelectorAll('img').forEach(function (img) {
        img.onerror = function () {
            this.style.display = 'none'
        }
    })
})
