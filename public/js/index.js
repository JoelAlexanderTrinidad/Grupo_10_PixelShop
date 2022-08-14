console.log('index.js success');

let slider = $('slider');
let sliderSection = qsa('.slider__article');
let sliderSectionLast = sliderSection[sliderSection.length -1];
let btnRight = $('btn-right');
let btnLeft = $('btn-left');
let tempo = 5000

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next(){
    let sliderSection = qsa('.slider__article');
    let sliderSectionFirst = sliderSection[0];
    slider.style.marginLeft = '-150%';
    slider.style.transition = 'all .3s';
    setTimeout(function(){
        slider.style.transition = 'none'
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = '-100%';
    }, 600)
}

function Prev(){
    let sliderSection = qsa('.slider__article');
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = '-50%';
    slider.style.transition = 'all .3s';
    setTimeout(function(){
        slider.style.transition = 'none'
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = '-100%';
    }, 600)
}

btnRight.addEventListener('click' ,function(e){
        Next();
});

btnLeft.addEventListener('click' ,function(e){
    Prev();
});

setInterval(function(){
    Next();
}, tempo)