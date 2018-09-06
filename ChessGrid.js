	var blank="";
	var bR="<img src=\"RookBlack.gif\" alt=\"black Rook\" height=\"60\" width=\"60\">";
	var bKn="<img src=\"KnightBlack.gif\" alt=\"black Knight\" height=\"60\" width=\"60\">";
	var bB="<img src=\"BishopBlack.gif\" alt=\"black bishop\" height=\"60\" width=\"60\">";
	var bQ="<img src=\"QueenBlack.gif\" alt=\"black queen\" height=\"60\" width=\"60\">";
	var bKing="<img src=\"KingBlack.gif\" alt=\"black king\" height=\"60\" width=\"60\">";
	var bP="<img src=\"PawnBlack.gif\" alt=\"black pawn\" height=\"60\" width=\"60\">";
	var wR="<img src=\"RookWhite.gif\" alt=\"white rook\" height=\"60\" width=\"60\">";
	var wKn="<img src=\"KnightWhite.gif\" alt=\"white knight\" height=\"60\" width=\"60\">";
	var wB="<img src=\"BishopWhite.gif\" alt=\"white bishop\" height=\"60\" width=\"60\">";
	var wQ="<img src=\"QueenWhite.gif\" alt=\"white queen\" height=\"60\" width=\"60\">";
	var wKing="<img src=\"KingWhite.gif\" alt=\"white king\" height=\"60\" width=\"60\">";
	var wP="<img src=\"PawnWhite.gif\" alt=\"white pawn\" height=\"60\" width=\"60\">";
	       
	var letter = '   abcdefgh';												//for use of naming top row
	var number = '12345678';												//naming side colums
	var square = 0;															//count for pattern
	//var tgrid = 'chessboard';                                               //gives the grid a style
	var grid// = '<table class="'+tgrid+'">';                                 //start of table
	var chessGrid;
	var row=0;
	var col=0;
	var cell;
	var msPerFrame;
	var moveDistance;
	var BPImg;
	var BPDivWidth;
	var BpawnLeft;
	var WPImage;
	var WPDivRightWidth;
	var WpawnRight;
	var setsUp=0;
	var colorSelect=0;
	var click=0;
	var piece;
	var piece2;
	var capture;
	var none;
	var firstClicked;
	var secondClicked;
	var whitePlayer="white"
	var blackPlayer = "black"
	var playerColor;
	var otherPlayer;
	var turn=0;
	var firstPlayer;
	var secondPlayer;
	var moveThisPiece;
	var goodMove=0;
	var firstClickedRow=0;
	var firstClickedCol=0;
	var secondClickedRow=0;
	var secondClickedCol=0;
	var colorCaptured="";
	var types=0;
	var pawnMoveB;
	var pawnMoveW;
	var BpawnCell;
	var WpawnCell;
	var goodcapture=0;
	var castle=0;
	var castleStat=0;
	var castleKing;
	var castleKingNew;
	var kingMoveB=0;
	var kingMoveW=0;
	var rookMoveRB=0;
	var rookMoveLB=0;
	var rookMoveRW=0;
	var rookMoveLW=0;
	var goodCastle=0;
	var browserName=navigator.appName; 
	var skip=0;
	var blackKingRow = 8;
	var blackKingCol = 7;
	var whiteKingRow = 1;
	var whiteKingCol = 7;
	var bKingTruoub=1;
	var wKingTroub=1;
	var bCheck=0;
	var wCheck=0;
	var capturess=0;
	
	
	
	
	// NO CALLBACK FUNCTION FOR SYNCHRONOUS REQUESTS
function loadSyncPost()
 {
 
 setsUp=1;
 colorSelect=1;
    var name = document.getElementById("name");
	var whosTurn = document.getElementById("whosTurn");
	var names=name.value;
	var name2 = document.getElementById("name2");
	var names2=name.value
    //var data = "name=" + name;
    var localRequest = new XMLHttpRequest();

    // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
    localRequest.open("POST", "JSON.txt", false);
    localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	localRequest.overrideMimeType("application/json");
    localRequest.send(names);

    // NOTE THAT THE status WILL NOT BE 200 IF THE REQUEST IS FOR A
    // LOCAL FILE.
    //if (localRequest.status == 200) {
	//var dataDiv = document.getElementById("data4Div");

	// FOR MORE INFORMATION ABOUT JSON SEE http://json.org
	var responseJson = JSON.parse(localRequest.responseText);
	names = responseJson["names"];
	names2= responseJson["names2"];
	var turn = responseJson["turn"];
	playerColor = responseJson["playerColor"];
	otherPlayer = responseJson["otherPlayer"];
	firstPlayer= responseJson["firstPlayer"];
	secondPlayer = responseJson["secondPlayer"];
	chessGrid = responseJson["chessGrid"];
	whosTurn.innerHTML=secondPlayer;
	name.value=names;
	name2.value=names2
	if(turn=="black")
	click=2;
	if(turn=="white")
	click=0;
	setUpPiece();
	playersTurn();
	addClickHandlers();
 }

 
 function audio()
{
var audio = new Audio("0.wav"); // audio file for hello  
/*/var audioElement = document.createElement('audio');
audioElement.setAttribute("preload", "auto");
audioElement.autobuffer = true;

var source = document.createElement('source');
source.type= 'audio/ogg';
source.src= "0.WAV";
audioElement.appendChild(source);*/

audio.play();
}


//------------------view--------------------------------------------------------------------------------------------------------------------------------------------------	
	

function getChessBoard()                                                    //function to put java-script into html page; use of get element by id and inner html
{

chessBoardDiv.innerHTML = genChessBoard();
if (browserName!="Microsoft Internet Explorer")
{
	var dataDiv = document.getElementById("dataDiv");
	dataDiv.innerHTML=localStorage.x2550timestamp;	
}
animation();

addClickHandlers();


} 

function genChessBoard()                                               		// function to create chess board
{	
		grid ='<tr>'                                                       //row for numbering
		for(col=0; col<14; col++)													//number of rows to be lettered, extra 3 on each side for the capturedd
		{
			if(col<4||col>>11)													//the boxes on the sides are not labled
				grid +='<td>'+""+'</td>'									//these boxes are not labled
			{
			}
			if(col>2&&col<11)													//for the labled boxes in the middle
			{
				grid+='<td>'+letter.charAt(col)+'</td>';						//gives them a name using the letters variable
			}
		}
																	// end of row for numbering
																			////rows and colums for grid
	for(row=0; row<8; row++)  												// the ammount og rows for grid
	{
		square+=1;															// count for use of checkerboard pattern alternates with rows
		if(square>1) square=0;												// makes the count go between 1 or 0 color will be on or off
		grid += '<tr>'														//starts the rows
		for(col=0; col<14; col++) 											//gives number of colums
		{	
			if((col==3)||(col==11))												//tells what to do if colum is on edge of board
			{ 
				grid+='<td>'+number.charAt(row)+'</td>';						//creates the letters to go inside colum 3 and 9
			}
			var color = 'white';
											//the square default color is white(light tan)
			//alert(types);
			if(types==1)
			{
				color= 'silver';
			}
			if(types==2)
			{
				color= 'blue';
			}
			if(types==3)
			{
				color= 'green';
			}
			square += 1;													//tells to move to next square and alternate color; colums
			if(square>1){ var color = 'dark'; square = 0;}					//sets the color for square and moves to next square/colum
			if(col<3 || col>10){ var color = 'remove';}							//sets color to orange and border to none for these colums
			grid += '<td class="'+color+'">'+""+ '</td>';							//use of class attributes for grid					
		}
																	//end of the rowss
	}
		grid +='<tr>'														//new row for lables on bottom
		for(col=0; col<14; col++)													//creaes colums for bottom
		{
			if(col<4||col>>11)													//tells which colums to not lable
			{
				grid +='<td>'+" "+'</td>'									//lables them blank
			}
			if(col>2&&col<11)													//tells which colums to lable
			{
				grid+='<td>'+letter.charAt(col)+'</td>';						//lables them with corisponding letter
			}
		}

		return grid;
	
 }


 function pieceSetup()
{

	 chessGrid=[
		[wR,wKn,wB,wKing,wQ,wB,wKn,wR],
		[wP,wP,wP,wP,wP,wP,wP,wP],
        [blank,blank,blank,blank,blank,blank,blank,blank], 
		[blank,blank,blank,blank,blank,blank,blank,blank],
		[blank,blank,blank,blank,blank,blank,blank,blank], 
		[blank,blank,blank,blank,blank,blank,blank,blank], 
		[bP,bP,bP,bP,bP,bP,bP,bP],
		[bR,bKn,bB,bKing,bQ,bB,bKn,bR],];
		setUpPiece();

}
function setUpPiece()
{
audio();
var chessBoardDiv = document.getElementById("chessBoardDiv");

		var four=4;
		var one=1;
		for(row=0; row<8;row++)
		{
			for(col=0;col<8;col++)
			{
				//if(chessGrid[row][col]==blank)
				//{	
				//}
				//else
				{
				 cell = chessBoardDiv.rows[one].cells[four]; 
				 none=cell.innerHTML;
				cell.innerHTML=chessGrid[row][col];		
					
				}
				four++;
			}
				four=4;
				one++;
		}
			setsUp=1;	

 }
 
 function Normal()
	{
	var value=document.getElementById("PieceType").value;
	if(setsUp==0)
	{
		if(value == "normal" )
		{
	 blank="";
	 bR="<img src=\"RookBlack.gif\" alt=\"black Rook\" height=\"60\" width=\"60\">";
	 bKn="<img src=\"KnightBlack.gif\" alt=\"black Knight\" height=\"60\" width=\"60\">";
	 bB="<img src=\"BishopBlack.gif\" alt=\"black bishop\" height=\"60\" width=\"60\">";
	 bQ="<img src=\"QueenBlack.gif\" alt=\"black queen\" height=\"60\" width=\"60\">";
	 bKing="<img src=\"KingBlack.gif\" alt=\"black king\" height=\"60\" width=\"60\">";
	 bP="<img src=\"PawnBlack.gif\" alt=\"black pawn\" height=\"60\" width=\"60\">";
	 wR="<img src=\"RookWhite.gif\" alt=\"white rook\" height=\"60\" width=\"60\">";
	 wKn="<img src=\"KnightWhite.gif\" alt=\"white knight\" height=\"60\" width=\"60\">";
	 wB="<img src=\"BishopWhite.gif\" alt=\"white bishop\" height=\"60\" width=\"60\">";
	 wQ="<img src=\"QueenWhite.gif\" alt=\"white queen\" height=\"60\" width=\"60\">";
	 wKing="<img src=\"KingWhite.gif\" alt=\"white king\" height=\"60\" width=\"60\">";
	 wP="<img src=\"PawnWhite.gif\" alt=\"white pawn\" height=\"60\" width=\"60\">";
	 types=0;
		}
	
	if(value == "mideaval")
	{
	 blank="";
	 bR="<img src=\"rookB.png\" alt=\"black Rook\" height=\"70\" width=\"70\">";
	 bKn="<img src=\"knightB.png\" alt=\"black Knight\" height=\"70\" width=\"70\">";
	 bB="<img src=\"bishopB.png\" alt=\"black bishop\" height=\"60\" width=\"60\">";
	 bQ="<img src=\"queenB.png\" alt=\"black queen\" height=\"60\" width=\"60\">";
	 bKing="<img src=\"kingB.png\" alt=\"black king\" height=\"60\" width=\"60\">";
	 bP="<img src=\"pawnB.png\" alt=\"black pawn\" height=\"60\" width=\"60\">";
	 wR="<img src=\"rookW.png\" alt=\"white rook\" height=\"70\" width=\"70\">";
	 wKn="<img src=\"knightW.png\" alt=\"white knight\" height=\"70\" width=\"70\">";
	 wB="<img src=\"bishopW.png\" alt=\"white bishop\" height=\"60\" width=\"60\">";
	 wQ="<img src=\"queenW.png\" alt=\"white queen\" height=\"60\" width=\"60\">";
	 wKing="<img src=\"kingW.png\" alt=\"white king\" height=\"60\" width=\"60\">";
	 wP="<img src=\"pawnW.png\" alt=\"white pawn\" height=\"60\" width=\"60\">";
	 types=1;
	}
	
	
	if(value == "christmas")
	{
	 blank="";
	 bR="<img src=\"chrookB.png\" alt=\"black Rook\" height=\"70\" width=\"70\">";
	 bKn="<img src=\"chknightB.png\" alt=\"black Knight\" height=\"70\" width=\"70\">";
	 bB="<img src=\"chbishopB.png\" alt=\"black bishop\" height=\"60\" width=\"60\">";
	 bQ="<img src=\"chqueenB.png\" alt=\"black queen\" height=\"60\" width=\"60\">";
	 bKing="<img src=\"chkingB.png\" alt=\"black king\" height=\"60\" width=\"60\">";
	 bP="<img src=\"chpawnB.png\" alt=\"black pawn\" height=\"60\" width=\"60\">";
	 wR="<img src=\"chrookW.png\" alt=\"white rook\" height=\"70\" width=\"70\">";
	 wKn="<img src=\"chknightW.png\" alt=\"white knight\" height=\"70\" width=\"70\">";
	 wB="<img src=\"chbishopW.png\" alt=\"white bishop\" height=\"60\" width=\"60\">";
	 wQ="<img src=\"chqueenW.png\" alt=\"white queen\" height=\"60\" width=\"60\">";
	 wKing="<img src=\"chkingW.png\" alt=\"white king\" height=\"60\" width=\"60\">";
	 wP="<img src=\"chpawnW.png\" alt=\"white pawn\" height=\"60\" width=\"60\">";
	 types=3;
	 }

	if(value == "cartoon")
	{
	 blank="";
	 bR="<img src=\"CRookB.png\" alt=\"black Rook\" height=\"70\" width=\"70\">";
	 bKn="<img src=\"CKnightB.png\" alt=\"black Knight\" height=\"70\" width=\"70\">";
	 bB="<img src=\"CBishopB.png\" alt=\"black bishop\" height=\"60\" width=\"60\">";
	 bQ="<img src=\"CQueenB.png\" alt=\"black queen\" height=\"60\" width=\"60\">";
	 bKing="<img src=\"CKingB.png\" alt=\"black king\" height=\"60\" width=\"60\">";
	 bP="<img src=\"CPawnB.png\" alt=\"black pawn\" height=\"60\" width=\"60\">";
	 wR="<img src=\"CRookW.png\" alt=\"white rook\" height=\"70\" width=\"70\">";
	 wKn="<img src=\"CKnightW.png\" alt=\"white knight\" height=\"70\" width=\"70\">";
	 wB="<img src=\"CBishopW.png\" alt=\"white bishop\" height=\"60\" width=\"60\">";
	 wQ="<img src=\"CQueenW.png\" alt=\"white queen\" height=\"60\" width=\"60\">";
	 wKing="<img src=\"CKingW.png\" alt=\"white king\" height=\"60\" width=\"60\">";
	 wP="<img src=\"CPawnW.png\" alt=\"white pawn\" height=\"60\" width=\"60\">";
	 types=2;
	 }
	}
}
	
	
function login()
{
	var userNames=document.getElementById("usersName").value;
	var passwords = document.getElementById("passwords").value;
	var data2 = "userName=" + userNames;
	var data1 ="password=" + passwords;
	var data = data2+"&"+data1;
    var localRequest = new XMLHttpRequest();
	 // PASSING false AS THE THIRD PARAMETER TO open SPECIFIES SYNCHRONOUS
	 var varify = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";
    localRequest.open("POST", varify, false);
	localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    localRequest.send(data);
	if (localRequest.status == 200) 
	{
	var responseJson = JSON.parse(localRequest.responseText);
	var loginInfo=0;
	//alert(data+"\n"+localRequest.responseText);
	 
	var timestamp=responseJson.userName+"   "+responseJson.timestamp;
	//alert(timestamp);
	localStorage.x2550timestamp=timestamp
	//alert(responseJson.result);
	if(responseJson.result=="valid")
	{
		loginInfo=1;

	}
	}
	var loginStatus=document.getElementById("loginStatus");

	if(loginInfo==0)
	{
		loginStatus.innerHTML=userNames + " your login is incorrect";
	}
	if(loginInfo==1)
	{
	//alert(key);

	
	window.location="chessgrid.html";
	//window.onload=getChessBoard(key);
	}
}

function loginReset()
{
//alert(localStorage.x2550timestamp);
localStorage.clear();
//alert(localStorage.x2550timestamp);
	var userName=document.getElementById("usersName");
	var passwords=document.getElementById("passwords");
	var loginStatus=document.getElementById("loginStatus");
	loginStatus.innerHTML="";
	userName.value="name";
	passwords.type="text";
	passwords.value="password";
}

function password()
{
	var passwords=document.getElementById("passwords");
	passwords.value="";
	passwords.type="password";
}
function submit()
{
	if(types>=1 && setsUp==0)
	{
	getChessBoard();
	}
	if(setsUp==1 && colorSelect>=1)
	{
	var names2 = document.getElementById("name2");
	var bob2 = names2.value;
	alert("game in progress "+ bob2);
	}
	
	if(setsUp==0 && colorSelect>=1)
	{
		var names2 = document.getElementById("name2");
		var names = document.getElementById("name");
		var joe1= names.value;
		var bob2 = names2.value;
		alert("Hello  "+ joe1  +" you will be "+ playerColor +"\nHello  " + bob2 +"  glad you could play, your color is " + otherPlayer +"\n"+ firstPlayer +" will go first")
		pieceSetup();
	}
	if(colorSelect==0)
	{
		alert("select a color");
	}
	playersTurn();
				
}

function startOver()
{
alert(chessGrid)
	var answer = confirm("Restart Game?")
	if (answer){
	var audio = new Audio("GOAWAY.wav"); // audio file for hello
	audio.play();
		clears();
	}
	else{
		alert("Thanks for sticking around!")
	}
}

function clears()
{	
		setsUp=0;
		types=0;
		bCheck=0;
		wCheck=0;
		grid ='<tr>'                                                       //row for numbering
		for(col=0; col<14; col++)													//number of rows to be lettered, extra 3 on each side for the capturedd
		{
			if(col<4||col>>11)													//the boxes on the sides are not labled
				grid ='<td>'+""+'</td>'									//these boxes are not labled
			{
			}
			if(col>2&&col<11)													//for the labled boxes in the middle
			{
				grid='<td>'+letter.charAt(col)+'</td>';						//gives them a name using the letters variable
			}
		}
																	// end of row for numbering
																			////rows and colums for grid
	for(row=0; row<8; row++)  												// the ammount og rows for grid
	{
		square+=1;															// count for use of checkerboard pattern alternates with rows
		if(square>1) square=0;												// makes the count go between 1 or 0 color will be on or off
		grid = '<tr>'														//starts the rows
		for(col=0; col<14; col++) 											//gives number of colums
		{	
			if((col==3)||(col==11))												//tells what to do if colum is on edge of board
			{ 
				grid='<td>'+number.charAt(row)+'</td>';						//creates the letters to go inside colum 3 and 9
			}
			var color = 'white';											//the square default color is white(light tan)
			square += 1;													//tells to move to next square and alternate color; colums
			if(square>1){ var color = 'dark'; square = 0;}					//sets the color for square and moves to next square/colum
			if(col<3 || col>10){ var color = 'remove';}							//sets color to orange and border to none for these colums
			grid = '<td class="'+color+'">'+""+ '</td>';							//use of class attributes for grid					
		}
																	//end of the rowss
	}
		grid ='<tr>'														//new row for lables on bottom
		for(col=0; col<14; col++)													//creaes colums for bottom
		{
			if(col<4||col>>11)													//tells which colums to not lable
			{
				grid ='<td>'+" "+'</td>'									//lables them blank
			}
			if(col>2&&col<11)													//tells which colums to lable
			{
				grid='<td>'+letter.charAt(col)+'</td>';						//lables them with corisponding letter
			}
		}
	getChessBoard();
}



function animation()
{
 BPImg = document.getElementById("PB");
 WPImg = document.getElementById("PW");
  msPerFrame = 30;
  moveDistance=20;
    var BPDiv = document.getElementById("PBDiv");
		BPDivWidth = BPDiv.offsetWidth; 
  BpawnLeft=0;
     var WPDiv = document.getElementById("PWDiv");
		WPDivWidth = WPDiv.offsetWidth; 
  WpawnRight=1200;
  setTimeout(moveSmallPawn, msPerFrame);
}

function moveSmallPawn()
{
	BpawnLeft+= moveDistance;
	WpawnRight+= -moveDistance;
	BPImg.style.left = BpawnLeft + "px";
	WPImg.style.left = WpawnRight + "px";
	if (BpawnLeft < (BPDivWidth - BPImg.width - 10)/3*2){
	 setTimeout(moveSmallPawn, msPerFrame);
}
} 

function printPosission (cell)
{
	var posision=document.getElementById("posision");
	//posision.innerHTML="Location of Click :  "
	posision.innerHTML="Row:  " +row+"  Collum: "+letter[col-1];
	secondClick();
}
function printPosission2 ()
{
	var posision=document.getElementById("posision2");

	posision.innerHTML="Row:  " +row+"  Collum: "+letter[col-1];
}



//------------------------model-------------------------------------------------------------------------------------------------------------------------------------- 


function addClickHandlers()
{	
	Check();
	if(goodMove==1 && goodcapture==1)
	{
	var audio = new Audio("NOOO.wav"); // audio file for hello
	audio.play();
	}
	goodMove=0;
	goodcapture=0;
	skip=0;
	var cells=chessBoardDiv.getElementsByTagName("td");
	for (var i=0; i<cells.length;i++) 
	{
		cells[i].onclick =function () 
		{ 
				bCheck=0;
				wCheck=0;
			col = this.cellIndex;
			row = this.parentNode.rowIndex;
			if(col>=4 && col <=11 && row >= 1 && row <=8 && setsUp==1)
			{
				var cell = chessBoardDiv.rows[row].cells[col];
				firstClickedRow=row;
				firstClickedCol=col;
				firstClicked = cell;
				piece=cell.innerHTML;
				determinePiece();
				if(piece!=bP &&piece!=wP && piece!=bR && piece!=wR && piece!=bKn && piece!=wKn && piece!=bB && piece!=wB && piece!=bQ && piece!=wQ && piece!=bKing && piece!=wKing)
				{
				click=click-1;
				}
				
				if(click==1 || click==3)
				{
					cell.style.backgroundColor=none;
				}
				click=click+1;
				if(click==1|| click==3)
				{
				cell.style.backgroundColor="yellow";
				printPosission();
				}
				
			}
		}
	}
}


function secondClick()                                              //move to
{
var cells=chessBoardDiv.getElementsByTagName("td");
	for (var i=0; i<cells.length;i++) 
	{

		cells[i].onclick =function () 
		{ 
			col = this.cellIndex;
			row = this.parentNode.rowIndex;
			var cell = chessBoardDiv.rows[row].cells[col];
			secondClickedRow=row;
			secondClickedCol=col;
			secondClicked = cell;
			if(firstClicked==cell)
			{
				click=click-1;
				firstClicked.style.backgroundColor="";
				secondClicked.style.backgroundColor="";
				addClickHandlers();			
			}
			if(col>=4 && col <=11 && row >= 1 && row <=8 &&firstClicked!=cell)
			{
				capture=cell.innerHTML;
				determinePiece();
	
				if(goodMove==1)
				{

				cell.innerHTML=piece;
				
				firstClicked.innerHTML="";
				firstClicked.style.backgroundColor="";
				addClickHandlers();
				click=click+1;
				Check2();
				//bCheck=0;
				//wCheck=0;
				printPosission2();
				

				if(click==4)
				{
					click=0;
					playersTurn();
				}
				if(click==2)
				{
					playersTurn();
				}
				}
				
			}
		}
	}
}

function playersTurn()
{
	var whosTurn=document.getElementById("whosTurn");
	
		if(click==0)
		{
			turn=1;
			whosTurn.innerHTML=firstPlayer;				
		}
		if(click==2)
		{
			whosTurn.innerHTML=secondPlayer;					
			turn=0;
		}
}



function black()
{
if(setsUp==0)
{
	var names = document.getElementById("name");
	var joe1= names.value;
	pawnMoveB=0;
	colorSelect=2;
	playerColor=blackPlayer;
	otherPlayer=whitePlayer;
	var names2 = document.getElementById("name2");
	var bob2= names2.value;
	firstPlayer=bob2+" (white)";
	secondPlayer=joe1+" (black)";
}
}
function white()
{
if(setsUp==0)
{
	var names = document.getElementById("name");
	var joe1= names.value;
	pawnMoveW=0;
	colorSelect=1;
	playerColor=whitePlayer;
	otherPlayer=blackPlayer;
	var names2 = document.getElementById("name2");
	var bob2= names2.value;
	firstPlayer=joe1+" (white)";
	secondPlayer=bob2+" (black)";
}
}

	
function determinePiece()
{
colorCaptured="";
if(capture==bP || capture == bR || capture == bB|| capture==bQ || capture == bKing || capture==bKn)
{colorCaptured="black";}
if(capture==wP || capture == wR || capture == wB|| capture==wQ || capture == wKing || capture==wKn)
{colorCaptured="white";}

	if(piece==wP)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1)
			{
				pawnMoveW=0;
				pawnW();
			}
		}
	}
	if(piece==bP)
	{
	
		if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3)
			{
				pawnMoveB=0;
				pawnB();
			}
		}
	}
	if(piece==wKn)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1)
			{
				pawnMoveW=0;
				KnightW();
			}
		}
	}
	if(piece==bKn)
	{
		if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3)
			{
				pawnMoveB=0;
				KnightB();
			}
		}
	}
	if(piece==wR)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1 && castle==1)
			{
				Castle();
			}
			if(click==1)
			{
				pawnMoveW=0;
				RookW();
			}
		}
	}
	if(piece==bR)
	{
		if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3 && castle==1)
			{
				Castle();
			}
			if(click==3)
			{
				pawnMoveB=0;
				RookB();
			}
		}
	}
	if(piece==wB)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1)
			{
				pawnMoveW=0;
				BishopW();
			}
		}
	}
	if(piece==bB)
	{
		if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3)
			{
				pawnMoveB=0;
				BishopB();
			}
		}
	}
	if(piece==wQ)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1)
			{
				pawnMoveW=0;
				QueenW();
			}
		}
	}
	if(piece==bQ)
	{
	if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3)
			{
				pawnMoveB=0;
				QueenB();
			}
		}
	}
	if(piece==wKing)
	{
		if(turn!=1)
		{
			click=click-1;
		}
		if(turn==1)
		{
			if(click==1)
			{
				pawnMoveW=0;
				KingW();
			}
		}
	}
	if(piece==bKing)
	{
	if(turn!=0)
		{
			click=click-1;
		}
		if(turn==0)
		{
			if(click==3)
			{
				pawnMoveB=0;
				KingB();
			}
		}
	}

}



function pawnW()
{
if (colorCaptured=="black")//capture==bP ||capture==bR  ||capture==bKn  || capture==bB  ||capture==bQ)
{
	if((firstClickedRow+1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow+1==secondClickedRow && firstClickedCol==secondClickedCol+1))
	{
	goodMove=1;
	goodcapture=1;
	
	}
}
 if(colorCaptured!="white" && colorCaptured!="black")//capture!=wP && capture!=wR &&capture!=wKn && capture!=wB &&capture!=wQ && capture!=wKing && capture!=bP && capture!=bR &&capture!=bKn && capture!=bB &&capture!=bQ && capture!=bKing)
 {
	if(firstClickedRow=="2" && secondClickedRow=="4" && firstClickedCol==secondClickedCol)
	{
	goodMove=1;
	pawnMoveW=1;
	WpawnCell= chessBoardDiv.rows[row].cells[col];
	}
	if(firstClickedRow+1==secondClickedRow && firstClickedCol==secondClickedCol)
	{
		goodMove=1;
	}	
	if(pawnMoveB == 1 && firstClickedRow == "5" && BpawnCell == chessBoardDiv.rows[row-1].cells[col])
	{
		goodMove=1;
		BpawnCell.innerHTML="";
			goodcapture=1;
	}
}
		
}

function pawnB()
{
if (capture==wP ||capture==wR  ||capture==wKn  || capture==wB  ||capture==wQ)
{
//the kill
	if((firstClickedRow-1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol==secondClickedCol+1))
	{
	goodMove=1;
	goodcapture=1;
	}
}

 if(capture!=bP && capture!=bR &&capture!=bKn && capture!=bB &&capture!=bQ && capture!=bKing && capture!=wP && capture!=wR &&capture!=wKn && capture!=wB &&capture!=wQ && capture!=wKing)
 {
 
 //first pawn move
 	if(firstClickedRow=="7" && secondClickedRow=="5" && firstClickedCol==secondClickedCol)
	{
	goodMove=1;
	pawnMoveB=1;
	 BpawnCell= chessBoardDiv.rows[row].cells[col];
	}
	
	//to move one place
	if(firstClickedRow-1==secondClickedRow && firstClickedCol==secondClickedCol)
	{
		goodMove=1;
	}
	
	//en passant
		if(pawnMoveW == 1 && firstClickedRow == "4" && WpawnCell == chessBoardDiv.rows[row+1].cells[col])
	{
		goodMove=1;
		WpawnCell.innerHTML="";
			goodcapture=1;
	}
}

}
function RookW()
{
	if(colorCaptured=="black")
	{capturess=1;}
	if(capture!=wP && capture!=wR &&capture!=wKn && capture!=wB &&capture!=wQ && capture!=wKing)
	{
		if(firstClickedCol==secondClickedCol)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow)
		{
			for(var i=1; i<((secondClickedRow+1)-firstClickedRow); i++)
			{
			//alert(secondClickedRow);
			//alert(firstClickedRow);
			//var r=((secondClickedRow+1)-firstClickedRow);
					//alert(r);
				move1=firstClickedRow+i;
				//alert(move1);
				newcell = chessBoardDiv.rows[move1].cells[firstClickedCol];
				newCells=newcell.innerHTML;
				//alert(newCells+ move1);
				if(move1==secondClickedRow && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==4)
					rookMoveLW=1;
					if(firstClickedCol==11)
					rookMoveRW=1;
				}
			
				if( newCells!=""&& newCells!=blank)
				{
					noProblems=0;
			
				}	
				
			}
		}
		if(secondClickedRow<firstClickedRow)
		{
		//alert("less");
			for(var i=1; i<((firstClickedRow+1)-secondClickedRow); i++)
			{
			move2=firstClickedRow-i;
			newcell2 = chessBoardDiv.rows[move2].cells[firstClickedCol];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells2!="" && newCells!=blank )
				{
					noProblems=0;
				}
			}
		}
	}
	if(firstClickedRow==secondClickedRow)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<((secondClickedCol+1)-firstClickedCol); i++)
			{
				move1=firstClickedCol+i;
				newcell = chessBoardDiv.rows[firstClickedRow].cells[move1];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedCol && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==4)
					rookMoveLW=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedCol<firstClickedCol)
		{
		//alert("less");
			for(var i=1; i<((firstClickedCol+1)-secondClickedCol); i++)
			{
			move2=firstClickedCol-i;
			newcell2 = chessBoardDiv.rows[firstClickedRow].cells[move2];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedCol && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==11)
					rookMoveRW=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}	
	}
}
function RookB()
{
	if(colorCaptured=="white")
	{capturess=1;}
if(capture!=bP && capture!=bR &&capture!=bKn && capture!=bB &&capture!=bQ && capture!=bKing)
	{
		if(firstClickedCol==secondClickedCol)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow)
		{
			for(var i=1; i<((secondClickedRow+1)-firstClickedRow); i++)
			{
				move1=firstClickedRow+i;
				newcell = chessBoardDiv.rows[move1].cells[firstClickedCol];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedRow<firstClickedRow)
		{
		//alert("less");
			for(var i=1; i<((firstClickedRow+1)-secondClickedRow); i++)
			{
			move2=firstClickedRow-i;
			newcell2 = chessBoardDiv.rows[move2].cells[firstClickedCol];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedRow && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==4)
					rookMoveLB=1;
					if(firstClickedCol==11)
					rookMoveRB=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}
		if(firstClickedRow==secondClickedRow)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<((secondClickedCol+1)-firstClickedCol); i++)
			{
				move1=firstClickedCol+i;
				newcell = chessBoardDiv.rows[firstClickedRow].cells[move1];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedCol && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==4)
					rookMoveLB=1;

				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedCol<firstClickedCol)
		{
	//	alert("less");
			for(var i=1; i<((firstClickedCol+1)-secondClickedCol); i++)
			{
			move2=firstClickedCol-i;
			newcell2 = chessBoardDiv.rows[firstClickedRow].cells[move2];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedCol && noProblems==1)
				{
					goodMove=1;
					if(firstClickedCol==11)
					rookMoveRB=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}	
  }
}
function KnightW()
{
	if(colorCaptured=="black")
	{capturess=1;}
	if(colorCaptured!="white")
	{

		if((((firstClickedRow+2)==secondClickedRow && (firstClickedCol+1)==secondClickedCol)  || ((firstClickedRow+2)==secondClickedRow && (firstClickedCol-1)==secondClickedCol) || ((firstClickedRow+1)==secondClickedRow && (firstClickedCol+2)==secondClickedCol)  || ((firstClickedRow+1)==secondClickedRow && (firstClickedCol-2)==secondClickedCol)) ||   (((firstClickedRow-2)==secondClickedRow && (firstClickedCol-1)==secondClickedCol)  || ((firstClickedRow-2)==secondClickedRow && (firstClickedCol+1)==secondClickedCol) || ((firstClickedRow-1)==secondClickedRow && (firstClickedCol-2)==secondClickedCol)  || ((firstClickedRow-1)==secondClickedRow && (firstClickedCol+2)==secondClickedCol))) 
		goodMove=1;
	}
		
}
function KnightB()
{
	if(colorCaptured=="white")
	{capturess=1;}
	if(colorCaptured!="black")
	{

		if((((firstClickedRow+2)==secondClickedRow && (firstClickedCol+1)==secondClickedCol)  || ((firstClickedRow+2)==secondClickedRow && (firstClickedCol-1)==secondClickedCol) || ((firstClickedRow+1)==secondClickedRow && (firstClickedCol+2)==secondClickedCol)  || ((firstClickedRow+1)==secondClickedRow && (firstClickedCol-2)==secondClickedCol)) ||   (((firstClickedRow-2)==secondClickedRow && (firstClickedCol-1)==secondClickedCol)  || ((firstClickedRow-2)==secondClickedRow && (firstClickedCol+1)==secondClickedCol) || ((firstClickedRow-1)==secondClickedRow && (firstClickedCol-2)==secondClickedCol)  || ((firstClickedRow-1)==secondClickedRow && (firstClickedCol+2)==secondClickedCol))) 
		goodMove=1;
	}
}
function BishopW()
{
	if(colorCaptured=="black")
	{capturess=1;}
	if(colorCaptured!="white")
	{
		var newcell;
		var newcells;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		
		if(secondClickedRow>firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(secondClickedRow+1)-firstClickedRow;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow-i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(firstClickedCol+1)-secondClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				if(firstClickedRow-i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
	}		
}			

function BishopB()
{
	if(colorCaptured=="white")
	{capturess=1;}
if(colorCaptured!="black")
	{
		var newcell;
		var newcells;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		
		if(secondClickedRow>firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(secondClickedRow+1)-firstClickedRow;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow-i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(firstClickedCol+1)-secondClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				if(firstClickedRow-i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
	}		
}			

function QueenW()
{
	if(colorCaptured=="black")
	{capturess=1;}
if(colorCaptured!="white")
	{
		var newcell;
		var newcells;
		var noProblems=1;
if(firstClickedCol==secondClickedCol)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow)
		{
			for(var i=1; i<((secondClickedRow+1)-firstClickedRow); i++)
			{
				move1=firstClickedRow+i;
				newcell = chessBoardDiv.rows[move1].cells[firstClickedCol];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedRow<firstClickedRow)
		{
		//alert("less");
			for(var i=1; i<((firstClickedRow+1)-secondClickedRow); i++)
			{
			move2=firstClickedRow-i;
			newcell2 = chessBoardDiv.rows[move2].cells[firstClickedCol];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}
		if(firstClickedRow==secondClickedRow)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<((secondClickedCol+1)-firstClickedCol); i++)
			{
				move1=firstClickedCol+i;
				newcell = chessBoardDiv.rows[firstClickedRow].cells[move1];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedCol<firstClickedCol)
		{
		//alert("less");
			for(var i=1; i<((firstClickedCol+1)-secondClickedCol); i++)
			{
			move2=firstClickedCol-i;
			newcell2 = chessBoardDiv.rows[firstClickedRow].cells[move2];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}
	if(secondClickedRow>firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		
		if(secondClickedRow>firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(secondClickedRow+1)-firstClickedRow;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow-i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(firstClickedCol+1)-secondClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				if(firstClickedRow-i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
	}
}
function QueenB()
{
	if(colorCaptured=="white")
	{capturess=1;}
if(colorCaptured!="black")
	{
		var newcell;
		var newcells;
		var noProblems=1;
if(firstClickedCol==secondClickedCol)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedRow>firstClickedRow)
		{
			for(var i=1; i<((secondClickedRow+1)-firstClickedRow); i++)
			{
				move1=firstClickedRow+i;
				newcell = chessBoardDiv.rows[move1].cells[firstClickedCol];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedRow<firstClickedRow)
		{
		//alert("less");
			for(var i=1; i<((firstClickedRow+1)-secondClickedRow); i++)
			{
			move2=firstClickedRow-i;
			newcell2 = chessBoardDiv.rows[move2].cells[firstClickedCol];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedRow && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}
		if(firstClickedRow==secondClickedRow)
		{
		var move1;
		var move2;
		var newcell;
		var newcell2;
		var newcells;
		var newcells2;
		var noProblems=1;
		if(secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<((secondClickedCol+1)-firstClickedCol); i++)
			{
				move1=firstClickedCol+i;
				newcell = chessBoardDiv.rows[firstClickedRow].cells[move1];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(move1==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
				
			}
		}
		if(secondClickedCol<firstClickedCol)
		{
		//alert("less");
			for(var i=1; i<((firstClickedCol+1)-secondClickedCol); i++)
			{
			move2=firstClickedCol-i;
			newcell2 = chessBoardDiv.rows[firstClickedRow].cells[move2];
			newCells2=newcell2.innerHTML;
			//alert(newCells2);
				if(move2==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells2!=""  )
				{
					noProblems=0;
				}
			}
		}
	}
	if(secondClickedRow>firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		
		if(secondClickedRow>firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(secondClickedRow+1)-firstClickedRow;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow+i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow+i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol>firstClickedCol)
		{
			for(var i=1; i<(secondClickedCol+1)-firstClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol+i];
				newCells=newcell.innerHTML;
				//alert(newCells);
				if(firstClickedRow-i==secondClickedRow && firstClickedCol+i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
		if(secondClickedRow<firstClickedRow && secondClickedCol<firstClickedCol)
		{
			for(var i=1; i<(firstClickedCol+1)-secondClickedCol;i++)
			{
				newcell = chessBoardDiv.rows[firstClickedRow-i].cells[firstClickedCol-i];
				newCells=newcell.innerHTML;
				if(firstClickedRow-i==secondClickedRow && firstClickedCol-i==secondClickedCol && noProblems==1)
				{
					goodMove=1;
				}
				if( newCells!=""  )
				{
					noProblems=0;
				}	
			}	
		}
	}
}
function KingW()
{
	if(colorCaptured=="black")
	{capturess=1;}
if(colorCaptured!="white")
{
	if((firstClickedRow+1==secondClickedRow && firstClickedCol==secondClickedCol)||(firstClickedRow+1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol-1==secondClickedCol)||(firstClickedRow==secondClickedRow && firstClickedCol-1==secondClickedCol)||(firstClickedRow+1==secondClickedRow && firstClickedCol-1==secondClickedCol))
	{
		goodMove=1;
		kingMoveW=1
		whiteKingRow = secondClickedRow;
		whiteKingCol = secondClickedCol;
	}
if(firstClickedRow==secondClickedRow && (firstClickedCol+2==secondClickedCol || firstClickedCol-2==secondClickedCol))
	{
	castleKing=firstClicked;
	castleKingNew=secondClicked;
	click=click-1;
	castle=1;
	addClickHandlers();
	}
}
}
function KingB()
{
	if(colorCaptured=="white")
	{capturess=1;}
if(colorCaptured!="black")

{
	if((firstClickedRow+1==secondClickedRow && firstClickedCol==secondClickedCol)||(firstClickedRow+1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol+1==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol==secondClickedCol)||(firstClickedRow-1==secondClickedRow && firstClickedCol-1==secondClickedCol)||(firstClickedRow==secondClickedRow && firstClickedCol-1==secondClickedCol)||(firstClickedRow+1==secondClickedRow && firstClickedCol-1==secondClickedCol))
	{
		goodMove=1;
		kingMoveB=1;
		blackKingRow = secondClickedRow;
		blackKingCol = secondClickedCol;
	}
	if(firstClickedRow==secondClickedRow && (firstClickedCol+2==secondClickedCol || firstClickedCol-2==secondClickedCol))
	{
	castleKing=firstClicked;
	castleKingNew=secondClicked;
	click=click-1;
	castle=1;
	addClickHandlers();
	}
}
}

function Castle()
{
	var temp=chessBoardDiv
	goodCastle=0;
	if(firstClicked.innerHTML==bR && firstClickedCol==4 && rookMoveLB==0 && kingMoveB==0 && (temp.rows[firstClickedRow].cells[firstClickedCol+1]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol+2]).innerHTML=="" )
	{
		castleStat=1;
			turn=turn+1;
			click=click-3;
			blackKingRow = 8;
			blackKingCol = 5;
	}
	if(firstClicked.innerHTML==bR && firstClickedCol==11  && rookMoveRB==0 && kingMoveB==0 && (temp.rows[firstClickedRow].cells[firstClickedCol-1]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol-2]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol-3]).innerHTML=="")
	{
		castleStat=1;
			turn=turn+1;
			click=click-3;
			blackKingRow = 8;
			blackKingCol = 9;
	}
	if(firstClicked.innerHTML==wR && firstClickedCol==4  && rookMoveLW==0 && kingMoveW==0 &&  (temp.rows[firstClickedRow].cells[firstClickedCol+1]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol+2]).innerHTML=="" )
	{
		castleStat=1;
			turn=0;
			click=2;
			whiteKingRow = 1;
			whiteKingCol = 5;
	}
	if(firstClicked.innerHTML==wR && firstClickedCol==11  && rookMoveRW==0 && kingMoveW==0 && (temp.rows[firstClickedRow].cells[firstClickedCol-1]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol-2]).innerHTML=="" && (temp.rows[firstClickedRow].cells[firstClickedCol-3]).innerHTML=="")
	{
		castleStat=1;
			turn=0;
			click=2;
			whiteKingRow = 1;
			whiteKingCol = 9;
	}
	
	if(castleStat==1)
	{
	castleKingNew.innerHTML=castleKing.innerHTML;
	castleKing.innerHTML="";
	secondClicked.innerHTML=firstClicked.innerHTML
	firstClicked.innerHTML="";
	castleKing.style.backgroundColor=none;
	firstClicked.style.backgroundColor=none;
	castle=0;
	castleStat=0;
	skip=1;
	}
	if(castleStat==0 && skip==0)
	{
		castleKing.style.backgroundColor=none;
		firstClicked.style.backgroundColor=none;
		click=click-1
		castle=0;
	}
			addClickHandlers();

}

function Check()
{
//black King
//vertical towards white
	bKTroub=1;
		for(var i=0; i<(blackKingRow);i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow-i].cells[blackKingCol];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wB || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wR))
				{
				bCheck=1;
		//		alert("black CHECK North.");
				}
			}
	//vertical towards black
	bKTroub=1;
		for(var i=0; i<(8-blackKingRow+1);i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow+i].cells[blackKingCol];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wB || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wR))
				{
				bCheck=1;
		//		alert("black CHECK South..");
				}
			}
	//horizontal towards right
	bKTroub=1;
		for(var i=1; i<(blackKingCol);i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow].cells[blackKingCol-i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wB || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wR))
				{
				bCheck=1;
		//		alert("black CHECK East...");
				}
			}
	//horizontal towards left
	bKTroub=1;
		for(var i=0; i<(12-blackKingCol);i++)
			{

				var kingCheck = chessBoardDiv.rows[blackKingRow].cells[blackKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wB || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wR))
				{
				bCheck=1;
		//		alert("black CHECK West....");
				}
			}
	
//diagnol towards white nd white
	bKTroub=1;
		for(var i=1; i<blackKingRow && i< 12-blackKingCol;i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow-i].cells[blackKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wR || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wB))
				{
				bCheck=1;
		//		alert("black CHECK North East.....");
				}
			}
	//diagnol towards white and left
	bKTroub=1;
		for(var i=1; i< blackKingRow && i< blackKingCol-3 ; i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow-i].cells[blackKingCol-i];
				var KCHECK=kingCheck.innerHTML;

				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wR || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wB))
				{
				bCheck=1;
		//		alert("black CHECK North West......");
				}
			}
	//diagnol towards black and right
	bKTroub=1;
		for(var i=1; i<9-blackKingRow && i<12-blackKingCol ;i++)
			{
				var kingCheck = chessBoardDiv.rows[blackKingRow+i].cells[blackKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wR || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wB))
				{
				bCheck=1;
		//		alert("black CHECK South East.......");
				}
			}
	//diagnol towards black left
	bKTroub=1;
		for(var i=0; i<9-blackKingRow && i <blackKingCol-3;i++)
			{

				var kingCheck = chessBoardDiv.rows[blackKingRow+i].cells[blackKingCol-i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == bR || KCHECK == bP  || KCHECK == bKn || KCHECK == bB || KCHECK == bQ || KCHECK == wP || KCHECK == wKn || KCHECK == wR || KCHECK == wKing)
				{
				bKTroub = 0;
				}
				if(bKTroub == 1 && (KCHECK==wQ || KCHECK==wB))
				{
				bCheck=1;
			//	alert("black CHECK South West........");
				}
			}
			//check for knight
		if((blackKingRow <=6 && blackKingCol <=10 && chessBoardDiv.rows[blackKingRow+2].cells[blackKingCol+1].innerHTML==wKn) || (blackKingRow <=6 && blackKingCol >=5 && chessBoardDiv.rows[blackKingRow+2].cells[blackKingCol-1].innerHTML==wKn) || (blackKingRow <=7 && blackKingCol >=6 && chessBoardDiv.rows[blackKingRow+1].cells[blackKingCol-2].innerHTML==wKn) || (blackKingRow <=7 && blackKingCol <=9 && chessBoardDiv.rows[blackKingRow+1].cells[blackKingCol+2].innerHTML==wKn) || (blackKingRow >=3 && blackKingCol <=10 && chessBoardDiv.rows[blackKingRow-2].cells[blackKingCol+1].innerHTML==wKn) || (blackKingRow >=3 && blackKingCol >=5 && chessBoardDiv.rows[blackKingRow-2].cells[blackKingCol-1].innerHTML==wKn) ||(blackKingRow >=2 && blackKingCol <=9 &&  chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol+2].innerHTML==wKn) ||(blackKingRow >=2 && blackKingCol >=6 && chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol-2].innerHTML==wKn))
		{
		bCheck=1;
		//alert("black CHECK Knight.........")
		}
		
		//check for pawn
		if(chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol+1].innerHTML==wP || chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol-1].innerHTML==wP )
		{
		bCheck=1;
		//alert("black CHECK Pawn..........")
		}
		
		//check for king
		if(chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol+1].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow].cells[blackKingCol+1].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow+1].cells[blackKingCol+1].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow+1].cells[blackKingCol].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow+1].cells[blackKingCol-1].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow].cells[blackKingCol-1].innerHTML==wKing ||chessBoardDiv.rows[blackKingRow-1].cells[blackKingCol-1].innerHTML==wKing)
				{
		bCheck=1;
		//alert("black CHECK King..........")
		}
		
		
//-----------------------------------------------------------------------------------------------------------------------------		
//white King
//vertical towards white
	wKTroub=1;
		for(var i=0; i<(whiteKingRow);i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow-i].cells[whiteKingCol];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bB || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bR))
				{
				wCheck=1;
		//		alert("white CHECK North.");
				}
			}
	//vertical towards black
	wKTroub=1;
		for(var i=0; i<(8-whiteKingRow+1);i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow+i].cells[whiteKingCol];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bB || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bR))
				{
				wCheck=1;
			//	alert("white CHECK South..");
				}
			}
	//horizontal towards right
	wKTroub=1;
		for(var i=1; i<(whiteKingCol);i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow].cells[whiteKingCol-i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bB || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bR))
				{
				wCheck=1;
			//	alert("white CHECK East...");
				}
			}
	//horizontal towards left
	wKTroub=1;
		for(var i=0; i<(12-whiteKingCol);i++)
			{

				var kingCheck = chessBoardDiv.rows[whiteKingRow].cells[whiteKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bB || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bR))
				{
				wCheck=1;
			//	alert("white CHECK West....");
				}
			}
	
//diagnol towards white and white
	wKTroub=1;
		for(var i=1; i<whiteKingRow && i< 12-whiteKingCol;i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow-i].cells[whiteKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bR || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bB))
				{
				wCheck=1;
			//	alert("white CHECK North East.....");
				}
			}
	//diagnol towards white and left
	wKTroub=1;
		for(var i=1; i< whiteKingRow && i< whiteKingCol-3 ; i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow-i].cells[whiteKingCol-i];
				var KCHECK=kingCheck.innerHTML;

				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bR || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bB))
				{
				wCheck=1;
			//	alert("white CHECK North West......");
				}
			}
	//diagnol towards black and right
	wKTroub=1;
		for(var i=1; i<9-whiteKingRow && i<12-whiteKingCol ;i++)
			{
				var kingCheck = chessBoardDiv.rows[whiteKingRow+i].cells[whiteKingCol+i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bR || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bB))
				{
				wCheck=1;
			//	alert("white CHECK South East.......");
				}
			}
	//diagnol towards black left
	wKTroub=1;
		for(var i=0; i<9-whiteKingRow && i <whiteKingCol-3;i++)
			{

				var kingCheck = chessBoardDiv.rows[whiteKingRow+i].cells[whiteKingCol-i];
				var KCHECK=kingCheck.innerHTML;
				if(KCHECK == wR || KCHECK == wP  || KCHECK == wKn || KCHECK == wB || KCHECK == wQ || KCHECK == bP || KCHECK == bKn || KCHECK == bR || KCHECK == bKing)
				{
				wKTroub = 0;
				}
				if(wKTroub == 1 && (KCHECK==bQ || KCHECK==bB))
				{
				wCheck=1;
				//alert("white CHECK South West........");
				}
			}
			//check for knight
		if((whiteKingRow <=6 && whiteKingCol <=10 && chessBoardDiv.rows[whiteKingRow+2].cells[whiteKingCol+1].innerHTML==bKn) || (whiteKingRow <=6 && whiteKingCol >=5 && chessBoardDiv.rows[whiteKingRow+2].cells[whiteKingCol-1].innerHTML==bKn) || (whiteKingRow <=7 && whiteKingCol >=6 && chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol-2].innerHTML==bKn) || (whiteKingRow <=7 && whiteKingCol <=9 && chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol+2].innerHTML==bKn) || (whiteKingRow >=3 && whiteKingCol <=10 && chessBoardDiv.rows[whiteKingRow-2].cells[whiteKingCol+1].innerHTML==bKn) || (whiteKingRow >=3 && whiteKingCol >=5 && chessBoardDiv.rows[whiteKingRow-2].cells[whiteKingCol-1].innerHTML==bKn) ||(whiteKingRow >=2 && whiteKingCol <=9 &&  chessBoardDiv.rows[whiteKingRow-1].cells[whiteKingCol+2].innerHTML==bKn) ||(whiteKingRow >=2 && whiteKingCol >=6 && chessBoardDiv.rows[whiteKingRow-1].cells[whiteKingCol-2].innerHTML==bKn))
		{
		wCheck=1;
		//alert("white CHECK Knight.........")
		}
		
		//check for pawn
		if(chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol+1].innerHTML==bP || chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol-1].innerHTML==bP )
		{
		wCheck=1;
		//alert("white CHECK Pawn..........")
		}
		
		//check for king
		if(chessBoardDiv.rows[whiteKingRow-1].cells[whiteKingCol].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow-1].cells[whiteKingCol+1].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow].cells[whiteKingCol+1].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol+1].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow+1].cells[whiteKingCol-1].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow].cells[whiteKingCol-1].innerHTML==bKing ||chessBoardDiv.rows[whiteKingRow-1].cells[whiteKingCol-1].innerHTML==bKing)
				{
		wCheck=1;
		//alert("white CHECK King..........")
		}
	}
	
function Check2()
	{
	if(bCheck==1 && turn==1)
	{
	alert("CHECK");	
	}
	if(wCheck==1 && turn==0)
	{
	alert("CHECK");	
	}
	if(bCheck==1 && turn==0)
	{
	firstClicked.innerHTML=piece;
	secondClicked.innerHTML=capture;
	click=click-2;
	}
	if(wCheck==1 && turn==1)
	{
	firstClicked.innerHTML=piece;
	secondClicked.innerHTML=capture;
	click=click-2;
	alert("CHECK");
	}
		Check();
		addClickHandlers();
	}
	
function Mate()
{

if(bCheck==1)
{
	var answer = confirm("Are you sure your in check mate");
	var audio = new Audio("COWARD.wav"); // audio file for hello
	audio.play();
	if (answer){
	alert("so you can't find a way out of check\nyou lose "+secondPlayer);
	var audio = new Audio("LAUGH.wav"); // audio file for hello
	audio.play();
		clears();
	}
	else{}
}
if(wCheck==1)
{
	var answer = confirm("Are you sure your in check mate")
	var audio = new Audio("COWARD.wav"); // audio file for hello
	audio.play();
	if (answer){
	alert("so you can't find a way out of check\nyou lose "+firstPlayer);
		var audio = new Audio("LAUGH.wav"); // audio file for hello
	audio.play();
		clears();
	}
	else{}
}
if(bCheck==0 && wCheck==0 && setsUp==1)
{
alert("no one is in check");
}


}

