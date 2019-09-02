(function () {

    var imagens = [];

    var flippedCards = [];

    var matches = 0;

    var modalGameOver = document.querySelector("#modalGameOver");

    var imgMatchSign = document.querySelector("#imgMatchSign");

    for (var i = 0; i < 16; i++) {
        var img = {
            src: "img/" + i + ".jpg",
            id: i % 8
        };
        imagens.push(img);
    }
    console.log(imagens);

    startGame();// responsável pela inicialização do jogo


    function startGame() {

        flippedCards = [];

        matches = 0;

        imagens = randomSort(imagens);  //organização aleatória

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");

        for (var i = 0; i < 16; i++) {
            frontFaces[i].classList.remove("flipped", "match");
            backFaces[i].classList.remove("flipped", "match");

            var card = document.querySelector("#card" + i);
            console.log(i % 8);

            card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
            card.style.top = i / 8 >= 1 ? 250 + "px" : 5 + "px";

            //Atribuir evento do movimento das figuras

            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('" + imagens[i].src + "')";
            frontFaces[i].setAttribute("id", imagens[i].id);
            console.log(frontFaces[i].id);
        }

        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click", startGame, false);
    }

    function flipCard() {
        if (flippedCards.length < 2) {
            var faces = this.getElementsByClassName("face");

            console.log(faces[0].classList.length);

            //aborta a execução dos métodos-> nõa chega a virar as imagens
            if (faces[0].classList[2]) {
                return;
            }
            /*console.log(faces[0]);*/
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            /*console.log(faces[0].classList);*/
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) {
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    matchCardSign();

                    flippedCards = [];

                    matches++;

                    if (matches >= 8) {
                        gameOver();
                    }
                }
            }

        } else {
            console.log(flippedCards);
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];
        }
    }
    /*   window.setTimeout(function(){
           gameOver();
       },1000);
   */


    function randomSort(oldArray) {

        var newArray = [];
        /*Estrutura de repetição 1-Criar um array vazio
        2-Avaliar o número de elementos do array
        3-Criar um índice com valor aleatório
        4-Avaliar se o elemento indicado já existe nonovo array
        5-Inserir o elemento indicado no novo array */
        while (newArray.length != oldArray.length) {
            var i = Math.floor(Math.random() * oldArray.length);

            if (newArray.indexOf(oldArray[i]) < 0) {
                newArray.push(oldArray[i]);
            }
        }
        return newArray;
    }


    function matchCardSign() {
        imgMatchSign.style.zIndex = "1";
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = "0";
        setTimeout(function () {
            imgMatchSign.style.zIndex = "-1";
            imgMatchSign.style.top = 250 + "px";
            imgMatchSign.style.opacity = "1";
        }, 1500);
    }
    function gameOver() {
        modalGameOver.style.zIndex = "99";
        modalGameOver.addEventListener("click", function () {
            startGame();
        }, false);
    }

}());