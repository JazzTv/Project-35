var balloonImage, balloon;
var backgroundIMG;
var database;
var position;

function preload ()
{
  balloonImage = loadAnimation ("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png");
  backgroundIMG = loadImage ("pro-C35 images/BackGround.png");
}


function setup () 
{
  createCanvas(800,400);
  database = firebase.database ();

  balloon = createSprite(100, 295, 50, 50);
  balloon.addAnimation ("hot air balloon",balloonImage);
  balloon.scale = 0.4;

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition, showError);
}

function draw () 
{
  background(backgroundIMG); 
  textSize (25);
  fill ("black")
  text ("Use the Arrow Keys to Move",20,50);
  
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}
  drawSprites();
}  

function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
  database.ref("balloon/position").set({x : balloon.x, y : balloon.y})
} 

function readPosition (data)
{
  position = data.val ();
  balloonPosition.x = position.x;
  balloonPosition.y = position.y;
} 

function showError ()
{
  console.log ("Error in writing to the database");
}