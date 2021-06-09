var tower,towerImg
var door,doorImg,doorsGroup
var climber,climberImg,climbersGroup
var ghost,ghostImg
var invisibleBlock,invisibleBlockGroup
var gameState ="play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadAnimation("ghost-jumping.png", "ghost-standing.png")
  
}

function setup() {
  createCanvas(600, 600);
 
  tower=createSprite(300,300, 30,30)
  tower.addImage(towerImg)
  tower.velocityY = 1
  ghost = createSprite(200,200)
  ghost.addAnimation("ghost",ghostImg)
  ghost.scale= 0.3

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  
}

function draw() {
  background(0);

  if(gameState ==="play"){

      if(tower.y>400){
        tower.y = 300
      }

      if(keyDown("left")){
        ghost.x -=3
      }
      if(keyDown("right")){
        ghost.x +=3
      }

      if(keyDown("space")){
        ghost.velocityY = -10
      }

      ghost.velocityY += 0.8

      
      spawnDoors();


      if(ghost.isTouching(climbersGroup)){
        ghost.velocityY = 0
      }

      if (ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
        gameState = "end"
        ghost.destroy();
      }
      drawSprites();
  }
  if(gameState==="end"){
      stroke("yellow")
      fill("yellow")
      textSize(30)
      text("gameOver",230,250)
  }
  


  
}


function spawnDoors(){
  if(frameCount % 250 === 0){
      var door = createSprite(200,-50);
      var climber = createSprite(200,10);
      var invisibleBlock= createSprite(200,15)
      invisibleBlock.width = climber.width
      invisibleBlock.height = 2


      door.x=Math.round(random(80,520))
      climber.x = door.x
      invisibleBlock.x = door.x

      door.addImage(doorImg)
      climber.addImage(climberImg)
      
      door.velocityY = 1
      climber.velocityY = 1
      door.velocityY = 1
      

      door.lifetime = 800
      climber.lifetime = 800
      invisibleBlock.lifetime = 800
      invisibleBlockGroup.add(invisibleBlock)
      ghost.depth = door.depth+1

      doorsGroup.add(door)
      climbersGroup.add(climber)
      

  }
}

