var player = document.getElementById('player');
var game = document.getElementById('game');
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function getPlayerStyleProp(propName=String){
    var style = window.getComputedStyle(player);
    var propVal = style.getPropertyValue(propName);
    return propVal;
}
function moveLeft(){
    left = parseInt(getPlayerStyleProp('left'));
    if(left > 0){
        player.style.left = left - 2 + 'px'
    }
}
function moveRight(){
    left = parseInt(getPlayerStyleProp('left'));
    player.style.left = left + 2 + 'px'
    if(left > 380){
        player.style.left = left - 2 + 'px'
    }
}

document.addEventListener('keydown', event => {
    if(both == 0){
        both++;
        if(event.key=='ArrowLeft'){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key=='ArrowRight'){
            interval = setInterval(moveRight, 1);
        }
    }
});
document.addEventListener('keyup', event => {
    clearInterval(interval);
    both = 0;
});

var blocks = setInterval(function(){
    var prevBlock = document.getElementById('block'+(counter-1));
    var prevHole = document.getElementById('hole'+(counter-1));
    if (counter > 0){
        var prevBlockTop = parseInt(window.getComputedStyle(prevBlock).getPropertyValue('top'));
        var prevHoleTop = parseInt(window.getComputedStyle(prevHole).getPropertyValue('top'));
    }
    
    if(prevBlockTop < 400 || counter == 0){
        var block = document.createElement('div');
        var hole = document.createElement('div');
        block.setAttribute('class', 'block');
        block.setAttribute('id', 'block'+counter);
        hole.setAttribute('class', 'hole');
        hole.setAttribute('id', 'hole'+counter);
        block.style.top = prevBlockTop + 100 + 'px';
        hole.style.top = prevHoleTop + 100 + 'px';
        var random = Math.floor(Math.random() * 360 + 750);
        hole.style.left = random + 'px';
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
    var drop = 0;
    if(playerTop <= 0){
        alert("Game over. Score: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0; i < currentBlocks.length; i++){
        let current = currentBlocks[i];
        let ihole = document.getElementById('hole'+current);
        let iblock = document.getElementById('block'+current);
        let iblockTop = parseInt(window.getComputedStyle(iblock).getPropertyValue('top'));
        iblock.style.top = iblockTop - 0.1 + 'px';
        ihole.style.top = iblockTop - 0.1 + 'px';
        if(iblockTop <= 0){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
            game.removeChild(iblock)
        }
        if(iblockTop - 20 < playerTop && iblockTop > playerTop){
            drop++;
            iholeLeft = parseInt(window.getComputedStyle(ihole).getPropertyValue('left'));
            if(iholeLeft - 750 <= playerLeft && iholeLeft - 750 + 20 >= playerLeft){
                drop = 0;
            }
        }
    }
    if(drop == 0){
        if(playerTop < 480){
            player.style.top = playerTop + 2 + 'px';
        }
    }
    else{
        player.style.top = playerTop - 0.5 + 'px';
    }
}, 1);