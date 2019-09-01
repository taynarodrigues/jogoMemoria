(function(){
    startGame();

    function startGame(){
        for(var i = 0; i < 16; i++){
            var card = document.querySelector("#card" + i);
            console.log( i % 8);
            card.getElementsByClassName.left = 500 + "px";
           card.style.left=  i % 8 === 0 ? + 5 + "px" : i%8 * 165 + 5 + "px";
           card.style.top = i < 8 ? 5 + "px" : 250 + "px";
           alert();

           //Atribuir evento do movimento da caixa

           card.addEventListener("click", flipCard, false);
        }
    }

    function flipCard(){
        var faces = this.getElementsByClassName("face");
        /*console.log(faces[0]);*/
        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");
        /*console.log(faces[0].classList);*/
    }
}());