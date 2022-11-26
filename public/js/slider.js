const sliderElement = document.querySelectorAll('.slider-element');
const previous = document.querySelector('.prv');
const next = document.querySelector('.nxt');

const goOn = () => {

    const currentImage = document.querySelector('.active')
    currentImage.classList.remove('active')

    if(currentImage.nextElementSibling){
        currentImage.nextElementSibling.classList.add('active')
    }else {
        sliderElement[0].classList.add('active')
    }

}

const goBack = () => {

    const currentImage = document.querySelector('.active')
    currentImage.classList.remove('active')

    if(currentImage.previousElementSibling){
        currentImage.previousElementSibling.classList.add('active')
    }else {
        sliderElement[sliderElement.length -1].classList.add('active')
    }

}

next.addEventListener('click', () => {
    goOn()
})

previous.addEventListener('click', () => {
    goBack()
})

