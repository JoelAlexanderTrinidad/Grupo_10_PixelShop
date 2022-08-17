console.log('header success!!');

document.getElementById('burger').addEventListener('click', function(e){
    $('nav').classList.toggle('header__nav')
    $('nav').classList.toggle('burger')
})