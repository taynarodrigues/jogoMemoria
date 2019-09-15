(function () {

    var somAcerto = document.createElement('audio');
    somAcerto.src = 'somAcerto.mp3';
     var somErro = document.createElement('audio');
    somErro.src = 'somErro.mp3';

    var imagens = [];

    var flippedCards = [];

    var matches = 0;

    var modalGameOver = document.querySelector("#modalGameOver");

    var imgMatchSing = document.querySelector("#imgMatchSing");

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

        	//embaralhamento do array de imagens
        imagens = randomSort(imagens); 

        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");

        for (var i = 0; i < 16; i++) {
            frontFaces[i].classList.remove("flipped", "match");
            backFaces[i].classList.remove("flipped", "match");

            var card = document.querySelector("#card" + i);
            console.log(i % 8);

            //posiciona as cartas no tabuleiro
            card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
            card.style.top = i / 8 >= 1 ? 250 + "px" : 5 + "px";

            //adiciona às cartas o evento click chamando a função que vira as cartas
            card.addEventListener("click", flipCard, false);

            frontFaces[i].style.background = "url('" + imagens[i].src + "')";
            frontFaces[i].setAttribute("id", imagens[i].id);
            console.log(frontFaces[i].id);
        }

        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click", startGame, false);
    }

    function flipCard() {
        //verifica se o número de cartas viradas é menor que 2
        if (flippedCards.length < 2) {
            //pega as faces da carta clicada
            var faces = this.getElementsByClassName("face");

            // console.log(faces[0].classList.length);

            //confere se a carta já está virada, impedindo que a mesma carta seja virada duas vezes
            if (faces[0].classList[2]) {
                return;
            }
            /*console.log(faces[0]);*/
            //adiciona a classe fliped às faces da carta para que sejam virada
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            /*console.log(faces[0].classList);*/
            //adiciona a carta ao array de cartas viradas
            flippedCards.push(this);

            //verifica se o número de cartas no array de cartas virada é igual a 2
            if (flippedCards.length === 2) {

                //compara o id das cartas viradas para ver se houve um acerto
                if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) {

                    somAcerto.play();
                    //em caso de acerto adiciona a classe match a todas as faces das duas cartas presente no array de cartas viradas
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    //chama a função que exibe a mensagem MATCH
                    matchCardSing();
                    //limpa o array de cartas viradas
                    flippedCards = [];
                    //soma um ao contador de aceros
                    matches++;
                    //verifica se o contador de acertos chegou a 8
                    if (matches >= 8) {
                        //caso haja 8 acertos, chama a função que finaliza o jogo
                        gameOver();
                    }
                }else{
                    somErro.play();
                }
                
            } else {
                setTimeout(function(){
            // console.log(flippedCards);
            //em caso de haver duas cartas viradas (terceiro click)-> delay
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];
            },3000);
        }
    }else{
        somErro.play();
    }
}

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


    function matchCardSing() {
        imgMatchSing.style.zIndex = "1";
        imgMatchSing.style.top = 150 + "px";
        imgMatchSing.style.opacity = "0";
        setTimeout(function () {
            imgMatchSing.style.zIndex = "-1";
            imgMatchSing.style.top = 250 + "px";
            imgMatchSing.style.opacity = "1";
        }, 1500);
    }
    function gameOver() {
        modalGameOver.style.zIndex = "99";
        modalGameOver.addEventListener('click', function () {
            startGame();
        }, false);
    }

}());