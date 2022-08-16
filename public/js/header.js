console.log('header success!!');

document.getElementById('burger').addEventListener('click', function(e){
    $('nav').classList.add('menu-burger--block')
    $('home__main').classList.toggle('menu-burger')
})