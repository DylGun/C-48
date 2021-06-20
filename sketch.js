var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;
var ground;
var bird, birdImage1, birdImage2, birdImage3, birdImage4, birdGroup;
var airplane, airplaneImage1, airplaneImage2, airplaneImage3, airplaneGroup;
var cloud, cloudImage1, cloudImage2, cloudImage3, cloudGroup;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   
   birdImage1=loadImage("Birds/B1.png");
   birdImage2=loadImage("Birds/B2.png");
   birdImage3=loadImage("Birds/B3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight, showError);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  fill("blue");
  ground=createSprite(10, 600, 2600, 10);
  ground.velocityX=-4;

  birdGroup=new Group();
  airplaneGroup=new Group();
  cloudGroup=new Group();

  //bird=createSprite(250,450,150,150);
  //ground.x=ground.width/2;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  if(ground.x<0){
    ground.x=ground.width/2;
  }

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   // balloon.scale=balloon.scale -0.01;
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale +0.01;
    //write code to move air balloon in down direction
    spawnBirds();
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function spawnBirds(){
  if (frameCount % 60 === 0){
    var bird = createSprite(400,500,10,40);
    bird.velocityX = -6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: bird.addImage(birdImage1);
      break;
      case 2: bird.addImage(birdImage2);
      break;
      case 3: bird.addImage(birdImage3);
      break;
      default: break;
    }
  }
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
})
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

// function update(){
//   if(keyDown(UP_ARROW)){
//     updateHeight(0,-10);
//     balloon.addAnimation("hotAirBalloon",balloonImage2);
//     balloon.scale=balloon.scale -0.01;
//   }
// }
