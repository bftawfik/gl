(function(){
    'use strict'

    var piecesClickedCount = 0, piecesTotal = 7;

    document.addEventListener('DOMContentLoaded', function (event){
        var pieces = this.querySelectorAll('.piece');
        var piecesArray = Array.prototype.slice.call(pieces);
        for (var i = 0; i < piecesArray.length; i++) {
            piecesArray[i].addEventListener('click', function(event){
                if(!event.currentTarget.classList.contains('clicked')){
                    event.currentTarget.parentNode.appendChild(event.currentTarget);
                    event.currentTarget.classList.add('clicked');
                    piecesClickedCount++;
                    if(piecesClickedCount == piecesTotal){
                        // event.currentTarget.classList.add('show');
                        this.querySelector('.separator').classList.add('show');
                        console.log(this.querySelector('.separator').classList)
                    }
                }
            }.bind(this));
        }
        
    });
})();