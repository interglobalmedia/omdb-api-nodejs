const resultsBtn = document.querySelector('[name="results-submit"]')

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
	// eslint-disable-next-line no-console
	console.log(window.pageYOffset + 100)
}

scrollButton.addEventListener('click', scrollStep)

// remove img src broken links

// eslint-disable-next-line prefer-arrow-callback
document.addEventListener('DOMContentLoaded', function () {
	// eslint-disable-next-line prefer-arrow-callback
	document.querySelectorAll('img').forEach(function (img) {
		img.onerror = function () {
			this.style.display = 'none'
		}
	})
})
