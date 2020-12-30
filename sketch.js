var dog,dogImage,happyDog,database,foodS,foodStock;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);
}


function draw() {  
  background(46,139,87);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    dog.scale=0.2;
  }
  fill("white");
  text("Food remaining: "+foodS,50,100);
  fill("white");
  text("Note: Press up arrow key to feed Drago milk!",50,20);
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



