var cardOne = { name:"Aragorn", imagem:'https://geeksinaction.com.br/wp-content/uploads/2022/02/Aragorn-Strider-Dunedain-Lord-of-the-Rings-752x440.jpg', attributes: {force: 40, agility: 30, inteligence: 35}}
var cardTwo = { name:"Legolas", imagem:'https://pm1.narvii.com/6843/a8e223538f2ccae66e3eb950ad3d6d9dd281f529v2_hq.jpg', attributes: {force: 28, agility: 48, inteligence: 30}}
var cardThree = { name:"Gandalf", imagem:'https://cdn.pensador.com/img/authors/ga/nd/gandalf-l.jpg', attributes: {force: 25, agility: 25, inteligence: 50}}
var cardFour = { name:"Faramir", imagem:'https://www.omelete.com.br/imagens/cinema/artigos/o_senhor_dos_aneis_2/faramir.jpg', attributes: {force: 38, agility: 32, inteligence: 28}}
var cardFive = { name:"Gimli", imagem:'https://www.ufrgs.br/tesauros/_acervo/image/2019/12/img-0019446-2b7b9ba666.jpg', attributes: {force: 45, agility: 22, inteligence: 20}}
var cardSix = { name:"CommomOrc", imagem:'https://ovicio.com.br/wp-content/uploads/2022/06/20220621-ovicio-orc-o-senhor-dos-aneis-555x555.jpg', attributes: {force: 35, agility: 25, inteligence: 20}}
var cardSeven = { name:"CaveTroll", imagem:'http://pm1.narvii.com/6929/308a8193d18355ad44d3bcb9bc51ab2e434e5c45r1-258-198v2_uhq.jpg', attributes: {force: 50, agility: 20, inteligence: 18}}
var cardEight = { name:"Urukhai", imagem:'http://4.bp.blogspot.com/-c1Th58oIeDs/U4On1Wp2aSI/AAAAAAAAAyM/qDj6B_0-hwI/s280/Lord_of_the_rings_Lurtz.jpg', attributes: {force: 40, agility: 30, inteligence: 25}}  

var cards = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven, cardEight];
var playerCard, pcCard;
var cardNumber;
var playerPoints = 0, pcPoints = 0;

showCardAmount ();

function showCardAmount () {
    var divShowCardAmount = document.getElementById("card-amount");
    divShowCardAmount.innerHTML = `<p>Quantidade de cartas disponíveis: ${cards.length}</p>`;
}

function drawCard () {
    document.getElementById("result").innerHTML = "";

    pcCard = receiveDrawCard();
    cards.splice(cardNumber, 1);

    playerCard = receiveDrawCard();
    cards.splice(cardNumber, 1);

    showCardAmount();
    showPlayerCard();
    document.getElementById("bttDraw").disabled = true;
    document.getElementById("btnPlay").disabled = false;
}

function receiveDrawCard () {
    cardNumber = parseInt(Math.random() * cards.length);
    return cards[cardNumber];
}

function showPlayerCard () {
    var divPlayerCard = document.getElementById("player-card");
    divPlayerCard.style.backgroundImage=`url(${playerCard.imagem})`;
    insertCardName(divPlayerCard, playerCard);
    showAttributesPlayerCard(divPlayerCard, playerCard);
}

function insertCardName (divCard, card) {
    var frame = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    var name = `<p class="card-subtitle">${card.name}</p>`;

    divCard.innerHTML = frame + name;
}

function showAttributesPlayerCard (divCard, card) {
    var divOptions = `<div id="options" class="statusClass">`;

    for (var attribute in card.attributes) {
        divOptions += `<input type="radio" id="${attribute}" name="attribute" value="${attribute}"> <label for="${attribute}">${attribute} ${card.attributes[attribute]}</label> <br>`;
    }
    divOptions += "</div>"
    divCard.innerHTML += divOptions;
}

function play () {
    var selectedAttribute = chosenAttribute()

    showResult(selectedAttribute)
    showScoreBoard()
    showPcCard()

    document.getElementById("btnPlay").disabled = true;

    cards.length < 2 ? showFinalResult() : document.getElementById("btnNextRound").disabled = false;
}

function chosenAttribute () {
    var attributesRadio = document.getElementsByName("attribute");
    var selectedAttribute = "";

    for (var i = 0; i < attributesRadio.length; i++) {
        if (attributesRadio[i].checked) {
          selectedAttribute = attributesRadio[i].value;
        }
    }
    return selectedAttribute;
}

function showResult(selectedAttribute) {
    var divResult = document.getElementById("result");

    if (playerCard.attributes[selectedAttribute] > pcCard.attributes[selectedAttribute]) {
        divResult.innerHTML = `<p class="finalResult">Você Ganhou!</p>`;  
        playerPoints++;
      } else if (pcCard.attributes[selectedAttribute] > playerCard.attributes[selectedAttribute]) {
        divResult.innerHTML = `<p class="finalResult">Você Perdeu!</p>`;  
        pcPoints++;
      } else { 
        divResult.innerHTML = `<p class="finalResult">Empate!</p>`;
      }
}

function showScoreBoard () {
    var divScoreBoard = document.getElementById("scoreboard");
    divScoreBoard.innerHTML = `<p>Player ${playerPoints} x ${pcPoints} Pc</p>`;
}

function showPcCard () {
    var divPcCard = document.getElementById("pc-card");

    divPcCard.style.backgroundImage=`url(${pcCard.imagem})`;
    insertCardName(divPcCard, pcCard)
    showAttributesPcCard(divPcCard, pcCard)
}

function showFinalResult() {
    document.getElementById("btnNextRound").disabled = true;

    if (playerPoints > pcPoints) {
        document.getElementById("result").innerHTML = "<p class='finalResult'>Você venceu do Adversário!</p>";
    } else if (playerPoints < pcPoints) {
        document.getElementById("result").innerHTML = "<p class='finalResult'>Você perdeu para o Adversário, tente novamente...</p>";
    } else {
        document.getElementById("result").innerHTML = "<p class='finalResult'>Empatou! vai outra tentativa?</p>";
    }
}

function showAttributesPcCard (divCard, card) {
    var divOptions = `<div class="statusClass">`;
  
  for (var attribute in card.attributes) {
    divOptions += `<span class="pc-card">${attribute} ${card.attributes[attribute]}</span> <br>`;
  }
  divOptions += "</div>";
  divCard.innerHTML += divOptions;
}

function nextRound() {
    document.getElementById("btnNextRound").disabled = true;   
    document.getElementById("result").innerHTML = "<p class='finalResult'>Sortear outra carta</p>";
    
    document.getElementById("cards").innerHTML = `<div id="player-card" class="card"></div> <div id="pc-card" class="card"></div>`;
    
    document.getElementById("bttDraw").disabled = false;
}
