var trex;
var trexrun, trexcollide;
var edges;
var groundani;
var ground;
var highscore = 0;
var ground2;
var cloud;
var movingcloud, cloudgroup;
//for obstacles.
var obstacle, obstaclegroup;
var obstacleb1;
var animationobstacle1;
var obstacleb2;
var animationobstacle2;
var obstacleb3;
var animationobstacle3;
var obstacleb4;
var animationobstacle4;
var obstacleb5;
var animationobstacle5;
var obstacleb6;
var animationobstacle6;
var obstacleselector;
var score = 0;
var gameState = "play";
var restart, restartimage, gameover, gameoverimage;
var die, checkpoint, jump;


function preload() {
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundani = loadAnimation("ground2.png");
  movingclouds = loadAnimation("cloud.png");
  animationobstacle1 = loadAnimation("obstacle1.png");
  animationobstacle2 = loadAnimation("obstacle2.png");
  animationobstacle3 = loadAnimation("obstacle3.png");
  animationobstacle4 = loadAnimation("obstacle4.png");
  animationobstacle5 = loadAnimation("obstacle5.png");
  animationobstacle6 = loadAnimation("obstacle6.png");
  trexcollide = loadImage("trex_collide.png");
  restartimage = loadAnimation("restart.png");
  gameoverimage = loadAnimation("gameOver.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  trex_collided = loadAnimation("trex_collide.png")
  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite(50, height - 30, 40, 40);
  trex.addAnimation("running", trexrun);
  trex.scale = 0.6;

  ground = createSprite(width / 2, height - 20, width, 20);
  ground.addAnimation("ground", groundani);

  ground2 = createSprite(width / 2, height - 15, width, 5)
  ground2.visible = false;
  //to make a group for obstacles
  obstaclegroup = new Group();
  //to make a group for clouds
  cloudgroup = new Group();
  console.log(canvas);
  trex.setCollider("rectangle", 0, 0, 85, 90)
  restart = createSprite(width / 2, height / 2);
  restart.addAnimation("restart", restartimage);
  restart.scale = 0.7


  gameover = createSprite(width / 2, height / 2 - 50);
  gameover.addAnimation("gameover", gameoverimage);
  gameover.scale = 0.7;
}

function draw() {
  camera.position.x = trex.x +1000
  background('white')
  drawSprites();
  trex.collide(ground2);
  textSize(15);
  fill("black")
  if (mousePressedOver(restart) && gameState === "end") {
    reset();
  }
  if (score > highscore) {
    highscore = score;
  }
  text("Score: " + score, height-100, 20);
  text("High Score: " + highscore, height-300, 20)
  if (gameState === "play") {
    //to make the trex jump.
    restart.visible = false;
    gameover.visible = false;
    if (keyDown("space") && trex.y > height - 45) {
      trex.velocityY = -12;
      jump.play();
    }
    if (touches.length > 0 && trex.y > height - 45) {
      trex.velocityY = -12;
      jump.play();
      touches = []
    }

    
    if (score % 100 === 0 && score > 0) {
      checkpoint.play();
    }
    ground.velocityX = ground.velocityX - (score / 100) * 10;


    //to pull the trex down
    trex.velocityY = trex.velocityY + 0.7;
    //to make a infinite ground
    if (ground.x < 100) {
      ground.x = ground.width / 2;
    }

    ground.velocityX = -10
    clouds();
    obstaclespawn()

    //to calculate the score
    score = score + Math.round(frameRate() / 30);
    if (trex.isTouching(obstaclegroup)) {
      gameState = "end";
      die.play()

    }

  } else if (gameState === "end") {
    if(touches.lengths>0||keyDown("space")){
      reset();
      touches=[];
    }
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    restart.visible = true;
    gameover.visible = true;
  }


}


function clouds() {
  if (frameCount % 100 === 0) {

    cloud = createSprite(width, 0);

    cloud.addAnimation("clouds", movingclouds);

    cloud.scale = 0.2

    cloud.velocityX = -4

    cloud.y = Math.round(random(0, height - 100));

    cloud.lifetime = 172.5;

    trex.depth = cloud.depth + 2;
    //console.log(cloud.depth)
    //console.log(trex.depth)
    cloudgroup.add(cloud);
  }
}

function obstaclespawn() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(width, height - 40, 50, 50);
    obstacle.velocityX = -10;
    obstacleselector = Math.round(random(1, 6))
    switch (obstacleselector) {
      case 1:
        obstacle.addAnimation("cactus", animationobstacle1);
        break;
      case 2:
        obstacle.addAnimation("cactus", animationobstacle2);
        break;
      case 3:
        obstacle.addAnimation("cactus", animationobstacle3);
        break;
      case 4:
        obstacle.addAnimation("cactus", animationobstacle4);
        break;
      case 5:
        obstacle.addAnimation("cactus", animationobstacle5);
        break;
      case 6:
        obstacle.addAnimation("cactus", animationobstacle6);
        break;
      default:
        break;

    }
    obstacle.scale = 0.7;
    obstaclegroup.add(obstacle);
  }
}

function reset() {
  gameState = "play";
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  score = 0;
}