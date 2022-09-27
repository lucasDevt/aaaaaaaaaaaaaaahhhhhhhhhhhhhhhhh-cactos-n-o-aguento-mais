var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obs1, obs2, obs3, obs4, obs5, obs6

var newImage;

var obsgroup, clgroup

var PLAY=1

var END=0

var game=PLAY

var score=0

var overimg, over

var restartimg, restart

var save

var die

var jump
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
  obs1=loadImage("obstacle1.png")
  obs2=loadImage("obstacle2.png")
  obs3=loadImage("obstacle3.png")
  obs4=loadImage("obstacle4.png")
  obs5=loadImage("obstacle5.png")
  obs6=loadImage("obstacle6.png")

  overimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")

  save=loadSound("checkpoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.debug=true
  trex.setCollider("rectangle",0,0,40,trex.heght)


  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  over = createSprite(300, 100);
  over.addImage(overimg)
  over.visible=false
  restart = createSprite(300, 150)
  restart.addImage(restartimg)
  restart.visible=false


  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  
  obsgroup=new Group();

  clgroup=new Group()



}

function draw() {
  background(180);
  text("pontuação atual: "+score,480, 40)
  if(game===PLAY){

    ground.velocityX=-(3+3*score/100)
    score=score+Math.round(frameCount/60);
    if(score>0&&score%100===0){
    save.play();


    }
    if(keyDown("space")&& trex.y >= 145) {
      trex.velocityY = -10;
      jump.play()
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    sppam();

    if(trex.isTouching(obsgroup)){
      //game=END
      die.play()
      trex.velocityY=-10
    }
  }else if(game===END){
    ground.velocityX = 0;
    obsgroup.setVelocityXEach(0)
    trex.velocityY = 0;
    obsgroup.setLifetimeEach(-1)
    trex.changeAnimation("collided")
    over.visible=true
    restart.visible=true
  }
  
  spawnClouds();
  
  trex.collide(invisibleGround);
  
  //gerar as nuvens
  
  drawSprites();

}

function spawnClouds() {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //atribua tempo de vida à variável
    cloud.lifetime = 210
    
    //ajuste a profundidade
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    clgroup.add(cloud)
    }
}
function sppam(){
  if (frameCount % 60 === 0) {
    cacto = createSprite(600,170,40,10);
      cacto.velocityX=-(3+score/100)
        var r=Math.round(random(1,6));
        console.log(r)
        switch(r){
          case 1:cacto.addImage(obs1);
           break;
           case 2:cacto.addImage(obs2);
           break;
           case 3:cacto.addImage(obs3);
           break;
           case 4:cacto.addImage(obs4);
           break;
           case 5:cacto.addImage(obs5);
           break;
           case 6:cacto.addImage(obs6);
           break;
           default:break
        }
        cacto.scale=0.4;
        cacto.lifetime=210

        obsgroup.add(cacto)
  }
}
