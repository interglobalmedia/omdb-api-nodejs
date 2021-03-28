const dataBtn = document.querySelector('[name="data-submit"]')

dataBtn.addEventListener('mousedown', function () {
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
