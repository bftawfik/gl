'use strict'

var piecesClickedCount = 0, piecesTotal = 6;
var piecesArray, game, separator, product, logo;

(function(){
    document.addEventListener('DOMContentLoaded', function (event){
        piecesArray = Array.prototype.slice.call(document.querySelectorAll('.piece'));
        game = document.querySelector('.game');
        separator = document.querySelector('.separator');
        product = document.querySelector('.product');
        logo = document.querySelector('.topRight');
        activateThePuzzle();
    });
})();

function activateThePuzzle(){
    for (var i = 0; i < piecesArray.length; i++) {
        piecesArray[i].classList.remove('clicked');
        piecesArray[i].addEventListener('click', pieceClicked);
    }
}

function deactivateThePuzzle(){
    for (var i = 0; i < piecesArray.length; i++) {
        piecesArray[i].removeEventListener('click', pieceClicked);
    }
}

//-----------------------------

function pieceClicked(event){
    // console.log('pieceClicked');
    if(!event.currentTarget.classList.contains('clicked')){
        event.currentTarget.parentNode.appendChild(event.currentTarget);
        event.currentTarget.classList.add('clicked');
        piecesClickedCount++;
        if(piecesClickedCount == piecesTotal){
            deactivateThePuzzle();
            setTimeout(function(){
                game.addEventListener('click', endThePuzzle);
            }, 1000);
            
            // console.log(game);
        }
    }
}

function endThePuzzle(event){
    // console.log('endTheGame');
    game.removeEventListener('click', endThePuzzle);
    separator.classList.add('show');
    product.classList.add('show');
    logo.addEventListener('click', restartThePuzzle);
    // console.log(logo);
}

function restartThePuzzle(event){
    // console.log('restartThePuzzle');
    separator.classList.remove('show');
    product.classList.remove('show');
    activateThePuzzle();
    piecesClickedCount = 0;
    logo.removeEventListener('click', restartThePuzzle);
}

