var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var eggs;
var eggGroup;
var eggimg1,eggimg2;
var brokenwhiteimg;
var brokengoldenimg;
var player_img;
var player1score =0;
var player2score =0;
var invisibleground;
var winner;
var level="one";

//****************AI********************** */

var back_imgai;

var player1ai,player2ai;
var eggsai;
var eggGroupai;
var eggimg1ai,eggimg2ai;
var brokenwhiteimgai;
var brokengoldenimgai;
var player_imgai;
var player1scoreai =0;
var player2scoreai =0;
var invisiblegroundai;
var PLAYai=1;
var ENDai=0;
var gameStateai =PLAYai;
var winnerai;
var levelai="one";

var gameMode=null

function preload(){
  back_img = loadImage("background.jpg");
  player_img = loadImage("nest.png");
  eggimg1=loadImage("whiteegg.png");
  eggimg2=loadImage("goldenegg.png");
  brokenwhiteimg=loadImage("brokenegg.png");
  brokengoldenimg=loadImage("brokengolden.png");
  eggGroup = new Group();

  //**********************AI************************* */
  back_imgai = loadImage("background.jpg");
  player_imgai = loadImage("nest.png");
  eggimg1ai=loadImage("whiteegg.png");
  eggimg2ai=loadImage("goldenegg.png");
  brokenwhiteimgai=loadImage("brokenegg.png");
  brokengoldenimgai=loadImage("brokengolden.png");
  eggGroupai = new Group();


}
function setup() {
  createCanvas(1000, 600);
 background(0);
  
  //*****************************AI***************************************** */
  

  text("WELCOME TO EGG CATCHER",500,50);
  text("PRESS 1 FOR SINGLE PLAYERE",500,100)
  text("PRESS 2 FOR DOUBLED PLAYERE",500,150)

}

function draw() {

  if(keyDown('1') && gameMode===null)
  {
     gameMode='one'
     invisiblegroundai=createSprite(500,580,1000,20)

      player1ai = createSprite(200,500);
      player1ai.addImage("player1",player_imgai);
      player1ai.scale=0.5;
      
      player2ai = createSprite(800,500);
      player2ai.addImage("player2", player_imgai);
      player2ai.scale=0.5;
      
  }

  if(keyDown('2') && gameMode===null)
  {
    gameMode='two'

    database = firebase.database();

    invisibleground=createSprite(500,580,1000,20)
    game = new Game();
    game.getState();
    game.start();
  
  }

  if(gameMode==='one')
  {
    if(gameStateai===PLAYai)
    {
      background(back_imgai);
      textSize(25);
      fill("black");
      text("player1 score:" +player1scoreai,50,50);
      text("player2 score:" +player2scoreai,50,100);
  
         if (keyIsDown(RIGHT_ARROW) ) 
          {
  
              player2ai.x+=10;
          }
     
     
              if (keyIsDown(LEFT_ARROW) ) {
                
                player2ai.x-=10;
              }
  
              spawnEggs();
    
    for(var i=0;i<eggGroupai.length;i++)
    {
        if(eggGroupai.get(i).isTouching(player1ai))
        {
            eggGroupai.get(i).destroy();
         player1scoreai=player1scoreai+1;
        
        }
  
        if(eggGroupai.get(i).isTouching(player2ai))
        {
            eggGroupai.get(i).destroy();
         player2scoreai=player2scoreai+1;
        
        }
  
        if(eggGroupai.get(i).isTouching(invisiblegroundai))
        {
            eggGroupai.get(i).velocityY=0;
            eggGroupai.get(i).addImage("egg1",brokenwhiteimgai);
          
            eggGroupai.get(i).addImage("egg2",brokengoldenimgai);
           
  
        }
  
    }
  
    if(player1scoreai>=10 || player2scoreai>=10)
  {
    gameStateai=ENDai;
  }
  
  
    drawSprites();
    }
  
    if(gameStateai===ENDai)
  {
    clear();
         
         textSize(25);
         fill("black");
       text("player1 score:" +player1scoreai,400,350);
       text("player2 score:" +player2scoreai,400,400);
  
       if(player1scoreai>player2scoreai)
       {
         winnerai="player1"
       }
  
       else
       {
         winnerai="player2"
       }
      
  
       if(levelai==="one" )
       {
        fill("red");
        textSize(35)
        text("THE WINNER OF LEVEL1 IS : "+winnerai,250,450)
  
        fill("green")
        textSize(30)
        text("PRESS SPACEKEY TO ENTER LEVEL2",250,500)
   
        if(keyDown("space"))
        {
          levelai="two";
          player1scoreai=0;
          player2scoreai=0;
          gameStateai=PLAYai;
        }
       }
  
       if(levelai==="two" && gameStateai===ENDai)
       {
        fill("red");
        textSize(35)
        text("THE WINNER OF LEVEL2 IS : "+winnerai,250,450)
  
        fill("green")
        textSize(30)
        text("PRESS SPACEKEY TO ENTER LEVEL3",250,500)
   
        if(keyDown("space"))
        {
          levelai="third";
          player1scoreai=0;
          player2scoreai=0;
          gameStateai=PLAYai;
        }
       }
  
       if(levelai==="third" && gameStateai===ENDai)
       {
        fill("red");
        textSize(35)
        text("THE WINNER OF LEVEL3 IS : "+winnerai,250,450)
  
        fill("blue");
         textSize(100);
         text("GAME OVER!",200,300)
  
  
       }
  
      
       
  }
    
  }
  
  if(gameMode==='two')
  {
    background(back_img);

    if (gameState === 1) {
      clear(); 
      game.play();
    }
    if (gameState === 2) {
      game.end();
    }
    if (playerCount === 2) {
      game.update(1);
    }  

  }
 
  
}

function spawnEggs()
{
  if (frameCount % 20 === 0) {
    eggsai = createSprite(random(100, 1000), 0, 100, 100);
    player1ai.x=eggsai.x
    eggsai.scale=0.2;
    if(levelai==="one")
    {
      eggsai.velocityY = 6;
    }

    if(levelai==="two")
    {
      eggsai.velocityY = 8;
    }
    
    if(levelai==="third")
    {
      eggsai.velocityY = 10;
    }
    var rand = Math.round(random(1,2));
    switch(rand){
        case 1: eggsai.addImage("egg1",eggimg1ai);
        break;
        case 2: eggsai.addImage("egg2", eggimg2ai);
        break;
       
    }
    eggGroupai.add(eggsai);
    
    
} 
}






