// In the future we want to store the deck id as local storage so that each time the application is refreshed, the deck ID stays the same. Homework

let deckId = '';
let cardcounterPlayerOne = 0;
let cardcounterPlayerTwo = 0;

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      deckId = data.deck_id;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      document.getElementById('player1').src = data.cards[0].image;
      document.getElementById('player2').src = data.cards[1].image;

      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);

      if(player1Val > player2Val){
        document.getElementById('announce').innerText = 'Player 1 Wins!';
      }
      else if (player1Val < player2Val){
        document.getElementById('announce').innerText = 'Player 2 Wins!';
    }
      else{
        document.getElementById('announce').innerText = 'Time for War!';
        war();
      }
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


function convertToNum(val){
  if(val === "ACE"){
    return 14
  }
  else if (val === "KING"){
    return 13
  }
  else if (val === "QUEEN"){
    return 12
  }
  else if (val === "JACK"){
    return 11
  }
  else{
    return Number(val)
  }
}

//we want war to flip one card for each player four times and take the value of the fourth pull and compare those. The person that wins the last flip takes all the cards (8)

function war(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`;

  document.getElementById('warresults').innerHTML = "War Results"
  document.getElementById('warplayer1').innerHTML = "Player 1"
  document.getElementById('warplayer2').innerHTML = "Player 2"
  
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      
      //define the value of player 1's card
      let player1Val = convertToNum(data.cards[6].value)
      //define the value of player 2's card
      let player2Val = convertToNum(data.cards[7].value)

      document.getElementById('player1war').src = data.cards[6].image;
      document.getElementById('player2war').src = data.cards[7].image;

      if(player1Val > player2Val){
        document.getElementById('warannounce').innerText = 'Player 1 Wins!';
      }
      else if (player1Val < player2Val){
        document.getElementById('warannounce').innerText = 'Player 2 Wins!';
      }
      else{
        document.getElementById('warannounce').innerText = 'Time for War!';
        war();
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}