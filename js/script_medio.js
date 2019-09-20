(function () {

    //variável que armazena a referência ao elemento HTML, que irá exibi-la
   var txtScore = document.querySelector('#score');
   //variável para armazenar pontuação na memória e será atualizada a cada acerto do jogador
   var score = 0;
   //variáveis que controlarar os aúdios
   var somAcerto = document.createElement('audio');
   somAcerto.src = '../audio/somAcerto.mp3';
   var somErro = document.createElement('audio');
   somErro.src = '../audio/somErro.mp3';

   //array que armazenará os objestos com src i id de 1 a 8
   var imagens = [];

   //array que armazena as cartas viradas
   var flippedCards = [];

   //variável contadora de acertos. ao chegar em 8 o jogo termina
   var matches = 0;

   //imagem do fim do jogo
   var modalGameOver = document.querySelector("#modalGameOver");

   //imagem a ser exibida em caso de acerto
   var imgMatchSing = document.querySelector("#imgMatchSing");

   //estrutura de atribuição da imagens aos card
   for (var i = 0; i < 16; i++) {
       //cria um objeto img com um src e um id
       var img_medio = {
           src: "../img/img_medio/" + i + ".jpg",
           id: i % 8
       };

       //insere o objeto criado no array
       imagens.push(img_medio);
   }
   // console.log(imagens);

   //chama a função de inicialização do jogo
   startGame();

   //os seguintes comandos fará com que o placar seja zerado e exibido sempre que iniciarmos uma partida
   score = 0;
   txtScore.innerHTML = 'PONTOS: ' + score;

   //função de inicialização do jogo
   function startGame() {

       //zera o array de cartas viradas
       flippedCards = [];

       //zera o contador de acertos
       matches = 0;

       //embaralhamento do array de imagens
       imagens = randomSort(imagens); 

       //lista de elementos div com as classes back r front
       var frontFaces = document.getElementsByClassName("front");
       var backFaces = document.getElementsByClassName("back");

       //posicioanamento das cartas e adição do evento click
       for (var i = 0; i < 16; i++) {
           //limpa as cartas marcadas
           frontFaces[i].classList.remove("flipped", "match");
           backFaces[i].classList.remove("flipped", "match");

           //posiciona as imagens no tabuleiro
           var card = document.querySelector("#card" + i);
           // console.log(i % 8);
           card.style.left = (i % 8) === 0 ? 5 + "px" : 5 + ((i % 8) * 165) + "px";
           card.style.top = i / 8 >= 1 ? 250 + "px" : 5 + "px";

           //adiciona às cartas o evento click chamando a função que vira as cartas
           card.addEventListener("click", flipCard, false);

           //adiciona as imagens às cartas
           frontFaces[i].style.background = "url('" + imagens[i].src + "')";
           frontFaces[i].setAttribute("id", imagens[i].id);
           // console.log(frontFaces[i].id);
       }

       //joga a imagem de game over para o plano de fundo
       modalGameOver.style.zIndex = -2;

       //remove o evento click da imagem de game over
       modalGameOver.removeEventListener("click", function(){
           startGame();
       }, false);
   }//fim da função de inicialização do jogo

   //função que vira as cartas
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

               //compara o id das imagens viradas para ver se houve um acerto
               if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) {

                   //o som será executado quando o jogador acertar uma combinação
                    somAcerto.play();

                   //em caso de acerto adiciona a classe match a todas as faces das duas cartas presente no array de cartas viradas
                   flippedCards[0].childNodes[1].classList.toggle("match");
                   flippedCards[0].childNodes[3].classList.toggle("match");
                   flippedCards[1].childNodes[1].classList.toggle("match");
                   flippedCards[1].childNodes[3].classList.toggle("match");

                   //chama a função que exibe a mensagem MATCH
                   matchCardSing();

                   //limpa o array das imagens  viradas
                   flippedCards = [];

                   //soma um ao contador de acertos
                   matches++;

                    //os seguintes comandos irá somar um ponto ao placar e exibirá na tela a pontuação atualizada
                   score++;
                   txtScore.innerHTML = 'PONTOS:' + score;

                   //verifica se o contador de acertos chegou a 8
                   if (matches >= 8) {
                       //caso haja 8 acertos, chama a função que finaliza o jogo
                       gameOver();
                   }
               // }estava dando bug aqui nesse fechamento '}' -> Ignorado com sucesso!!!
           }else{
               //caso não acerte a combinação, o som de erro será executado
               somErro.play();
           }
       }       
        } else {
           // console.log(flippedCards);

           //em caso de haver duas cartas viradas (terceiro click)-> delay
           flippedCards[0].childNodes[1].classList.toggle("flipped");
           flippedCards[0].childNodes[3].classList.toggle("flipped");
           flippedCards[1].childNodes[1].classList.toggle("flipped");
           flippedCards[1].childNodes[3].classList.toggle("flipped");
           
           //limpa o array de cartas viradas
           flippedCards = [];
       }
   }
   

   //função que embaralha as imagens recebendo um array de cartas por parâmetro
   function randomSort(oldArray) {
       //cria um array vazio
       var newArray = [];

       //executa a estrutura enquanto o novo array não atingir o mesmo múmero de elementos de array passado por parâmetro
       while (newArray.length != oldArray.length) {
           //cria uma variável i recebendo um número aleatório entre 0 e o número de elementos no array -1
           var i = Math.floor(Math.random() * oldArray.length);

           //verifica se o elemnto indicado pelo índice i já existe no array novo
           if (newArray.indexOf(oldArray[i]) < 0) {
               //caso não exista é inserido
               newArray.push(oldArray[i]);
           }
       }

       //retorna o array novo, que possui os elementos do array passado por parâmetros embaralhados
       return newArray;
   }//fim da função que embaralhas as imagens


   //função que gera o sinal de MATCH
   function matchCardSing() {
       //joga a mensagem de MATCH para o primeiro plano
       imgMatchSing.style.zIndex = "1";

       //move a mensagem para cima
       imgMatchSing.style.top = 150 + "px";

       //deixa a mensagem transparente
       imgMatchSing.style.opacity = "0";

       //função executada após 1.5 segundo
       setTimeout(function () {
           //joga a mensagem de MATCH para o plano de fundo
           imgMatchSing.style.zIndex = "-1";

           //move a mensagem para o centro da tela
           imgMatchSing.style.top = 250 + "px";

           //remove a transparência da mensagem
           imgMatchSing.style.opacity = "1";
       }, 1500);
   }//fim da função que exibe a mensagem de MATCH

   //função do fim do jogo
   function gameOver() {
       //joga a menagem de fim do jogo para o plano da frente
       modalGameOver.style.zIndex = "99";

       //adiciona o evento click à imagem de game over
       modalGameOver.addEventListener('click', function () {
           //chama a função que reinicia o jogo
           startGame();
       }, false);
   }

}());