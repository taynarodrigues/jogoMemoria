(function(){
    var imagens = [];
    for(var i = 0; i < 16; i++){
        var img = {
            src:"img/" + i + ".jpg",
            id: i%8
        };
        imagens.push(img);
    }
    console.log(imagens);

    startGame();

    function startGame(){

        var frontFaces = document.getElementsByClassName("front");

        for(var i = 0; i < 16; i++){
            var card = document.querySelector("#card" + i);
            console.log( i % 8);
            /*card.getElementsByClassName.left = 500 + "px";*/
           card.style.left=  i % 8 === 0 ?  5 + "px" : i % 8 * 165 + 5 + "px";
           card.style.top = i < 8 ? 5 + "px" : 250 + "px";
        //   alert();

           //Atribuir evento do movimento das figuras

           card.addEventListener("click", flipCard, false);

           frontFaces[i].style.background = "url('"+ imagens[i].src +"')";
           frontFaces[i].setAttribute("id", imagens[i].id);
           console.log(frontFaces[i].id);
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