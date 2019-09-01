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

    startGame();// responsável pela inicialização do jogo
    /*chamada da função para embaralhar as figuras*/
         imagens =randomSort(imagens);  //organização aleatória

    function startGame(){

        var frontFaces = document.getElementsByClassName("front");

        for(var i = 0; i < 16; i++){
            var card = document.querySelector("#card" + i);
            console.log( i % 8);
           card.style.left =  i % 8 === 0 ?  5 + "px" : i % 8 * 165 + 5 + "px";
           card.style.top = i < 8 ? 5 + "px" : 250 + "px";
       
           //Atribuir evento do movimento das figuras

           card.addEventListener("click", flipCard, false);

           frontFaces[i].style.background = "url('"+ imagens[i].src +"')";
           frontFaces[i].setAttribute("id", imagens[i].id);
           console.log(frontFaces[i].id);
        }
    }

    function randomSort(oldArray){
        Math.floor(Math.random()*11);
        var arrTeste = ["uva", "morango", "goiaba"];
        console.log(arrTeste.length);

        var newArray = [];
        /*Estrutura de repetição 1-Criar um array vazio
        2-Avaliar o número de elementos do array
        3-Criar um índice com valor aleatório
        4-Avaliar se o elemento indicado já existe nonovo array
        5-Inserir o elemento indicado no novo array */
        while(newArray.length != oldArray.length){
            var i = Math.floor(Math.random()*oldArray.length);

            if(newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i]);
           }
        }
        return newArray;
    }
    
    function flipCard(){
        var faces = this.getElementsByClassName("face");
        /*console.log(faces[0]);*/
        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");
        /*console.log(faces[0].classList);*/
    }
}());