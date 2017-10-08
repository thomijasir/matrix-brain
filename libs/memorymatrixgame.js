function MemoryMatrixGame() {

}

MemoryMatrixGame.BOX_WIDTH = 100;
MemoryMatrixGame.BOX_HEIGHT = 100;
MemoryMatrixGame.XSPACE = 0;
MemoryMatrixGame.YSPACE = 0;

MemoryMatrixGame.screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
MemoryMatrixGame.screenHeight = (window.innerHeight) ? window.innerHeight : screen.height;

MemoryMatrixGame.level = 0;
MemoryMatrixGame.life = 3;
MemoryMatrixGame.score = 0;

MemoryMatrixGame.computerChooice = [];
MemoryMatrixGame.playerChooice = [];

MemoryMatrixGame.isPlayable = 0;

MemoryMatrixGame.init = function(){

    //MemoryMatrixGame.startNewGame();
    document.getElementById("game-over-container").style.display = "none";

}

MemoryMatrixGame.startButtonPressed = function(){
    
    MemoryMatrixGame.level = 0;
    MemoryMatrixGame.life = 3;
    MemoryMatrixGame.score = 0;
    
    document.getElementById("start-game-container").style.display = "none";
    document.getElementById("game-over-container").style.display = "none";
    MemoryMatrixGame.startNewGame();
    
}

//level ı arttır ve yeni oyunu başlat.
MemoryMatrixGame.startNewGame = function() {

    MemoryMatrixGame.score = MemoryMatrixGame.level * 550;
    //document.getElementById( 'game-score-text').innerHTML = MemoryMatrixGame.score;

    MemoryMatrixGame.isPlayable = 0;
    MemoryMatrixGame.level += 1;

    document.getElementById( 'game-level-text').innerHTML = MemoryMatrixGame.level;

    if( MemoryMatrixGame.level <= 2 ){

        MemoryMatrixGame.createScreen( 2, 2 );

    }else if( MemoryMatrixGame.level <= 5 ){

        MemoryMatrixGame.createScreen( 3, 4 );

    }else {

        MemoryMatrixGame.createScreen( 5, 6 );

    }

    //Random oyunu oluştur.
    MemoryMatrixGame.createGame();

    //show computer chooice
    MemoryMatrixGame.showChooice( MemoryMatrixGame.computerChooice );

    setTimeout( 'MemoryMatrixGame.startGame();', 2500 );

}

MemoryMatrixGame.createScreen = function( jTo, iTo ){
    
    MemoryMatrixGame.BOX_WIDTH = MemoryMatrixGame.screenWidth / jTo;
    MemoryMatrixGame.BOX_HEIGHT = MemoryMatrixGame.screenHeight / iTo; 

    MemoryMatrixGame.computerChooice = [];
    MemoryMatrixGame.playerChooice = [];

    var arrayNumber = 0;
    var screenDiv = document.getElementById( 'screen-container' );

    screenDiv.innerHTML = "";

    screenDiv.style.width = ( MemoryMatrixGame.BOX_WIDTH * jTo ) + "px";
    screenDiv.style.height = ( MemoryMatrixGame.BOX_HEIGHT * iTo ) + "px";

    for( var i = 0; i < iTo; i++  ){

        for( var j = 0; j < jTo; j++  ){

            MemoryMatrixGame.computerChooice.push( '1' );
            MemoryMatrixGame.playerChooice.push( '1' );

            arrayNumber++;

            screenDiv.appendChild(
                MemoryMatrixGame.createItem( arrayNumber,
                    MemoryMatrixGame.XSPACE + ( j * MemoryMatrixGame.BOX_WIDTH ),
                    MemoryMatrixGame.YSPACE + ( i * MemoryMatrixGame.BOX_HEIGHT ) ) );

        }

    }

}

MemoryMatrixGame.createItem = function( arrayNumber, x, y ){

    var itemImg = document.createElement( 'div' );
    itemImg.setAttribute( 'id', "box" + arrayNumber );
    itemImg.setAttribute( 'array-number', arrayNumber );
    itemImg.setAttribute('class', 'item empty');
    //itemImg.setAttribute( 'src', 'images/emptybox.png' );
    itemImg.setAttribute( 'onclick', 'MemoryMatrixGame.itemClicked(' + arrayNumber + ');' );
    
    itemImg.style.position = 'absolute';
    itemImg.style.top = y + "px";
    itemImg.style.left = x + "px"
    
    itemImg.style.width = MemoryMatrixGame.BOX_WIDTH + "px";
    itemImg.style.height = MemoryMatrixGame.BOX_HEIGHT + "px"

    return itemImg;

}

MemoryMatrixGame.createGame = function(){

    var isFinished = 0;
    var selectedItemsNumber = 0;

    while( isFinished == 0 ){

        var selectedItemNumber = Math.floor( ( Math.random() * MemoryMatrixGame.computerChooice.length ) );

        if( MemoryMatrixGame.computerChooice[selectedItemNumber] == 1 ){

            MemoryMatrixGame.computerChooice[selectedItemNumber] = '2';
            selectedItemsNumber++;

            if( selectedItemsNumber == MemoryMatrixGame.level ){
                isFinished = 1;
            }

        }

    }

}

MemoryMatrixGame.showChooice = function( matrix ){

    for( var i = 1; i <= matrix.length; i++ ){

        MemoryMatrixGame.changeItem( i, matrix[i - 1] );

    }

}

MemoryMatrixGame.startGame = function(){

    MemoryMatrixGame.showChooice( MemoryMatrixGame.playerChooice );
    MemoryMatrixGame.isPlayable = 1;

}

MemoryMatrixGame.changeItem = function( arrayNumber, type ){

    var typeName;

    switch ( type ){
        case '1':
            typeName = 'empty';
            break;
        case '2':
            typeName = 'correct';
            break;
        case '3':
            typeName = 'wrong';
            break;
    }

    document.getElementById( 'box' + arrayNumber ).setAttribute( 'class', 'item ' + typeName );

}

MemoryMatrixGame.itemClicked = function( arrayNumber ){

    if( MemoryMatrixGame.isPlayable ){

        var itemNumber = parseInt( arrayNumber ) - 1;

        if( MemoryMatrixGame.computerChooice[itemNumber] == '2' ) {
            MemoryMatrixGame.playerChooice[itemNumber] = '2';
        }else{
            MemoryMatrixGame.playerChooice[itemNumber] = '3';
        }

        //seçilen nesneyi doğrula
        MemoryMatrixGame.changeItem( arrayNumber, MemoryMatrixGame.playerChooice[ itemNumber ] );
        MemoryMatrixGame.checkCooice();

    }

}

MemoryMatrixGame.checkCooice = function(){

    var successNumber = 0;

    for( var i = 0; i < MemoryMatrixGame.computerChooice.length; i++ ){
        if( MemoryMatrixGame.computerChooice[i] == MemoryMatrixGame.playerChooice[i] &&
            MemoryMatrixGame.computerChooice[i] == '2' ){

            successNumber++;

        }else if( MemoryMatrixGame.playerChooice[i] == '3' ){

            MemoryMatrixGame.isPlayable = 0;
            setTimeout( 'MemoryMatrixGame.lostTheGame();', 1500 );

        }

    }

    if( successNumber == MemoryMatrixGame.level ){

        //alert("win");
        if( MemoryMatrixGame.level == 25 ){

            alert("you are the king");

        }else{

            MemoryMatrixGame.isPlayable = 0;
            setTimeout( 'MemoryMatrixGame.wonTheGame();', 1500 );
        }

    }

}

MemoryMatrixGame.wonTheGame = function(){
    MemoryMatrixGame.startNewGame();
}

MemoryMatrixGame.lostTheGame = function(){

    if( MemoryMatrixGame.life > 1 ){

        MemoryMatrixGame.life--;
        //document.getElementById( 'game-life-text').innerHTML = MemoryMatrixGame.life;

        MemoryMatrixGame.level--;
        MemoryMatrixGame.startNewGame();

    }else{

        document.getElementById("game-over-container").style.display = "-webkit-box";
        //alert( 'Game Over' );

    }
}

MemoryMatrixGame.levelUp = function(){

}

window.addEventListener( 'load', MemoryMatrixGame.init, false );