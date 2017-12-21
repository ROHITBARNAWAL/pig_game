/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his Round Score
- But, if the player rolles a 1, all his Round score gets lost. After that, it's the next player's turn.
- The player can choose to 'HOLD', which means that his round score gets added to his Global score. After that, it's the next player's turn.
- The first player to reach 100 points on GLobal score wins the Game.

*/
var Score, roundScore, activePlayer, gamePlaying;
init();
/*
dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice)

document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
var x = document.querySelector('#current-' + activePlayer).textContent;
console.log(x);*/


function btnRoll(){
	if(gamePlaying)
	{
		// 1. random no.
		var dice = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		//3. update the round score if the rolled number was NOT a 1
		if(dice !== 1){
			//add score
			roundScore +=dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else{
			//Next player
			nextPlayer();
			
		}
	}
	
}

document.querySelector('.btn-roll').addEventListener('click',btnRoll);

document.querySelector('.btn-hold').addEventListener('click',function(){
	if(gamePlaying){
		//add Current score to Global score
		Scores[activePlayer] += roundScore;
		
		
		//update the UI
		document.querySelector('#score-'+ activePlayer).textContent = Scores[activePlayer];
		
		//check if player won the game
		if(Scores[activePlayer]>=100){
			
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying=false;
		}
		else{
			//Next player
			nextPlayer();
			//document.querySelector('.dice').style.display = 'none';
		}
	
	}
	
	
});


function nextPlayer(){
	//next player
	activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
		roundScore = 0;
		
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',function(){
	init();
});
function init(){
	gamePlaying=true;
	Scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
}

