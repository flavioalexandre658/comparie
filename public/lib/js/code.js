
// CONFIGURAÇÃO PARA QUANDO USAR SCROLL ALTERAR O NAV-BAR
$(function () {
    $('[data-toggle="popover"]').popover();
    $('.nav-item a').off().bind('click', function () {
        var $anchor = $(this);
        $('html,body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 0, 'easeInOutExpo');
        event.preventDefault();
    });


    $('.nav-item a').off().bind('click', function () {
        var $anchor = $(this);
    });

    /*$(window).scroll(function() {
        if($(document).scrollTop() > 10) {
          $('a').addClass('navbar-text');
      }
      else {
      $('a').removeClass('navbar-text');
      }
    });*/
})

$(document).ready(function(){
    window.sr = ScrollReveal();
    sr.reveal('#servicos-left', {
        duration: 1000,
        origin: 'left',
        distance: '100px'
    });
    sr.reveal('.servicos-right', {
        duration: 2000,
        origin: 'right',
        distance: '100px'
    });
})

// Permite apenas 1 CheckBox por vez
var inputs_preco = $('.cb-preco'); // colocar os inputs em cache
$('.cb-preco').off().bind('click', function() { // juntar auscultador de evento
    inputs_preco.get().forEach(function(el) { // iterar com a array nativa
        el.checked ? el.checked : el; // marcar ou desmarcar o elemento iterado
    }, this);
});

var inputs_marca = $('.cb-marca'); // colocar os inputs em cache
$('.cb-marca').off().bind('click', function() { // juntar auscultador de evento
    inputs_marca.get().forEach(function(el) { // iterar com a array nativa
        el.checked ? el.checked : el; // marcar ou desmarcar o elemento iterado
    }, this);
});


//EXIBIR OS CONTENTS DE BUSCA AO CLICKA NOS BOTÕES
