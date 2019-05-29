(function(){
    'use strict'

    document.addEventListener('DOMContentLoaded', function (event){
        var pieces = this.querySelectorAll('.piece');
        var piecesArray = Array.prototype.slice.call(pieces);
        for (var i = 0; i < piecesArray.length; i++) {
            piecesArray[i].addEventListener('click', function(event){
                event.currentTarget.parentNode.appendChild(event.currentTarget);
                event.currentTarget.classList.add('clicked');
                // node.appendChild(textnode);  
            });
        }
        
    });
})();