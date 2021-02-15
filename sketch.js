var mario,ground;
var score = 0;
var gameState = "play";
var coingroup,brickgroup,enemygroup;
function preload() {
  marioimg = loadAnimation("mario.gif");
  bgimg = loadImage("background.jpg");
  enemy1img = loadAnimation("enemy2.gif");
  enemy2img = loadAnimation("enemy3.gif");
  enemy3img = loadAnimation("enemy4.gif");
coinimg = loadAnimation("coin img.gif");
brickimg = loadImage("brickimg2.png");
gameoverimg = loadImage("gameover.jpg");
coinSound = loadSound("smb_coin (1).wav");
gameoverSound = loadSound("smb_gameover.wav");
restartimg = loadImage("restart.png");

}



function setup() {
  createCanvas(windowWidth,windowHeight);
  background = createSprite(width/2,height/2,width,height);
  background.addImage(bgimg);
  mario = createSprite(50,380,20,20);
  mario.addAnimation("marioimg",marioimg);
  ground = createSprite(width/2,height-80,width,10);
  restart = createSprite(width/2,height/2+180);
  restart.addImage(restartimg);
  restart.visible = false;
  ground.visible = false;
  brickgroup = new Group ();
  coingroup = new Group ();
  enemygroup = new Group ();
  
}

function draw() {
  //background(bgimg);
  
  if (gameState === "play"){
    background.velocityX = -3;
    if(background.x<0){
      background.x = background.width/2;
    }
    if(keyDown("up_arrow")){
      mario.velocityY = -6;
    }
    if(keyDown("left_arrow")){
      mario.velocityX = -6;
    }
    if(keyDown("right_arrow")){
      mario.velocityX = 6;
    }
    if(keyDown("down_arrow")){
      mario.velocityY = +6;
    }

    mario.velocityY = mario.velocityY+0.08;
    mario.collide(ground);
    if(brickgroup.isTouching(mario)){
      mario.collide(brickgroup);
      score = score+1;
    }
    for(var i = 0;i<coingroup.length;i++){
      if(coingroup.get(i).isTouching(mario)){
        coingroup.get(i).destroy();
        score = score+5;
        coinSound.play();

      }
    }
    if(enemygroup.isTouching(mario)){
      
      gameState = "end";
      gameoverSound.play();
    }
      
    bricks();
    enemies();
    spawnbonus();
  }
  if(gameState === "end"){
    background.velocityX = 0;
    background.x = width/2;
    background.y = height/2;
    background.addImage(gameoverimg);
enemygroup.destroyEach(0);
brickgroup.destroyEach(0);
coingroup.destroyEach(0);
mario.setVelocity(0,0);  
mario.visible = false;
restart.visible = true;
if(mousePressedOver(restart)){
  gameState = "play";
  restart.visible = false;
mario.visible = true;
}
}
  
  drawSprites();
  textSize(35);
  fill("white");
  text("SCORE:- "+score,width/2,30);
}
function bricks(){
  if(frameCount%300 === 0){
     var brick = createSprite(width,380,50,5);
     brick.addImage(brickimg);
     brick.scale = 1.2;
  brick.velocityX = -3;
  brick.debug = false;
  brick.setCollider("rectangle",0,0,200,50);
  brick.y = Math.round(random(20,height-200))
  brickgroup.add(brick);
  brick.lifetime = 150;
  }
 
}
function enemies(){
  if(frameCount%170 === 0){
     var enemy = createSprite(400,380,20,20);
     enemy.velocityX = -3;
     enemy.scale = 0.2;
     enemy.y = Math.round(random(20,height-50))
     enemy.x = Math.round(random(20,width))
enemygroup.add(enemy);
     var rand = Math.round(random(1,3));
     switch(rand){
       case 1 : enemy.addAnimation("enemy1img",enemy1img);
       break;
       case 2 : enemy.addAnimation("enemy2img",enemy2img);
       break;
       case 3 : enemy.addAnimation("enemy3img",enemy3img);
       break;
       
       default:break;
     }
     
     
  }
}
function spawnbonus(){
  if(frameCount%150 === 0){
     var coin = createSprite(400,380,20,20);
     coin.addAnimation("coin img",coinimg);
     coin.velocityX = -3;
     coin.scale = 0.1;
     coin.y = Math.round(random(20,height-50))
     coingroup.add(coin);
     coin.x = Math.round(random(20,width))
  }
}