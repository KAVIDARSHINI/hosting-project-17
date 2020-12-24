var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_stand;
var banana ,bananaImage, rock, rockImage;
var FoodGroup, obstacleGroup;
var score;
var way;
var flower1,flower2,flower3;
var score = 0;
var survivalTime = 0;

function preload(){
    
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

    monkey_stand = loadAnimation("monkey.png");

    bananaImage = loadImage("banana-1.png");
    rockImage = loadImage("obstacle.png");

     flower1 = loadImage("flower1.png");
     flower2 = loadImage("flower2.png");
     flower3 = loadImage("flower3.png");
     
}

function setup() {
      createCanvas(599,460);

        monkey = createSprite(52,339,20,30);
        monkey.addAnimation("jumping",monkey_running);
        monkey.addAnimation("still",monkey_stand);
        monkey.scale = 0.2; 

        way = createSprite(300,430,599,70);
        way.shapeColor = "chartreuse";

        foodGroup = new Group();
        obstacleGroup = createGroup();
  
        monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
        monkey.debug = false;  
      }
                                   
function draw() {
      background("skyblue");
      
      textFont("algerian"); 
      textSize(20);
      text("Score :" + score,450,50);

        text("Survival Time :"+ survivalTime,100,50);


      if(gameState === PLAY){

        way.velocityX = - 3;
        way.x = way.width/2;

           if(way.x < 0){
              way.x = way.width/2;
              }

        if(keyDown("space") && monkey.y >= 333){
         monkey.velocityY = -17;
         }
      monkey.velocityY = monkey.velocityY + 0.8;

        if(monkey.isTouching(foodGroup)){
         foodGroup.destroyEach();
         score = score + 1;
        }

        monkey.collide(way);

        obstacles();
        food();
        garden();

        survivalTime = Math.ceil(frameCount/frameRate());

        if(monkey.isTouching(obstacleGroup)){
           gameState = END;
           }

         }else if(gameState === END){
           way.velocityX = 0;
           foodGroup.setVelocityXEach(0);
           obstacleGroup.setVelocityXEach(0);
           flowers.velocityX = 0;

           obstacleGroup.setLifetimeEach(-1);
           foodGroup.setLifetimeEach(-1);  
           flowers.lifetime = -1;

           monkey.changeAnimation("still",monkey_stand);
           }
      drawSprites();
    }

function obstacles(){
  
    if(frameCount % 300 === 0){
      rock = createSprite(599,378,20,30);
      rock.addImage(rockImage);
      rock.scale = 0.1;
      rock.velocityX = -5;
      rock.lifetime = 125;
      obstacleGroup.add(rock);
      }
  }

function food(){
  
    if(frameCount % 80 === 0){
       banana = createSprite(599,200,20,25);
       banana.addImage(bananaImage);
       banana.scale = 0.1;
       banana.velocityX = -6;
       banana.y = Math.round(random(100,200));
       banana.lifetime = 100;
       foodGroup.add(banana); 
        }
  }

function garden(){
   
      if(frameCount % 100 === 0){
         flowers = createSprite(599,385,30,40);
         flowers.velocityX = -6;
         flowers.scale = 0.3;
         flowers.collide(way);
         flowers.y = 400;
         flowers.lifetime = 150;

        rand = Math.round(random(1,3))

        if(rand === 1){
           flowers.addImage(flower1);
           } else if(rand === 2){
           flowers.addImage(flower2);
           } else if(rand === 3){
           flowers.addImage(flower3);   
           } 
    }
    }

