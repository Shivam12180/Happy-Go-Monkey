var backImage,backgr; 
var player, player_running; 
var ground,ground_img; 
var FoodGroup, bananaImage; 
var obstaclesGroup, obstacle_img; 
var gameState = "PLAY"; 
//var gameOver; 
var score=0; 

function preload(){ 
  backImage=loadImage("jungle1.jpg"); 
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  bananaImage = loadImage("banana.png"); 
  obstacle_img = loadImage("stone.png"); 
} 

function setup() { 
  createCanvas(windowWidth,windowHeight); 
  backgr=createSprite(width/2,height/2,width+300,height); 
  backgr.addImage(backImage); 
  backgr.scale=1.5; 
  backgr.x=backgr.width/2; 
  backgr.velocityX=-4; 
  
  player = createSprite(100,340,20,50); player.addAnimation("Running",player_running); 
  player.scale = 0.1; 
  
  ground = createSprite(400,350,800,10); 
  ground.velocityX=-4; 
  ground.x=ground.width/2; 
  ground.visible=false; 
  
  FoodGroup = new Group(); 
  obstaclesGroup = new Group(); 
  score = 0; 
} 

function draw() { 
  background(255); 
  drawSprites();
  
  stroke("white"); 
  textSize(20); 
  fill("white"); 
  text("Score: "+ score, 500,50); 
  
  if(gameState === "PLAY"){
    if(ground.x<0) { 
      ground.x=ground.width/2; 
    } 
    
    if(backgr.x<100){ 
      backgr.x=backgr.width/2; 
    } 
    
    if(FoodGroup.isTouching(player)){ 
      FoodGroup.destroyEach(); 
      score = score + 2; 
    } 
    
    switch(score){ 
      case 10: player.scale=0.12; 
        break; 
        case 20: player.scale=0.14; 
        break; 
        case 30: player.scale=0.16; 
        break; 
        case 40: player.scale=0.18; 
        break; 
        default: break; 
    } 
    
    if(keyDown("space") ) { 
      player.velocityY = -12; 
    } 
    player.velocityY = player.velocityY + 0.8; 
    player.collide(ground); 
    
    spawnFood(); 
    spawnObstacles(); 
    
    if(obstaclesGroup.isTouching(player)){ 
      player.scale=0.08; player.visible = false; 
      gameState = "END"; 
      // score=score-2; 
    } 
  } 
  
  if(gameState === "END"){ 
    stroke("White"); 
    fill("White"); 
    textSize(50); 
    text("Game over",230,200); 
    text("Press R to restart",200,250);
    
    FoodGroup.destroyEach(); 
    obstaclesGroup.destroyEach(); 
    
    backgr.velocityX = 0;
    
    if(keyDown("r")){
      reset();
    }
    
    
  } 
} 

function spawnFood() { 
  //write code here to spawn the food 
  if (frameCount % 80 === 0) { 
    var banana = createSprite(600,250,40,10); 
    banana.y = random(120,200); 
    banana.addImage(bananaImage); 
    banana.scale = 0.05; 
    banana.velocityX = -5; 
    
    //assign lifetime to the variable 
    banana.lifetime = 300; 
    player.depth = banana.depth + 1; 
    
    //add each banana to the group 
    FoodGroup.add(banana); 
  } 
} 

function spawnObstacles() { 
  if(frameCount % 300 === 0) { 
    var obstacle = createSprite(800,350,10,40); 
    obstacle.velocityX = -6; 
    obstacle.addImage(obstacle_img); 
    
    //assign scale and lifetime to the obstacle 
    obstacle.scale = 0.2; 
    obstacle.lifetime = 300; 
    
    //add each obstacle to the group 
    
    obstaclesGroup.add(obstacle); } 
}

function reset(){
  gameState = "PLAY";
  player.visible = true;
  score = 0;
  backgr.velocityX = -4;
  player.scale = 0.1;
}


