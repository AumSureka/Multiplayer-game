var hypnoticBall, database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    // refer the location of the Database
    var hypnoticBallPosition = database.ref('ball/position');

    // create a virtual listener or watchman

      
    hypnoticBallPosition.on("value", readPosition, showError);




}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

// Update or write  to the Database 
function writePosition(x,y){
    database.ref('ball/position').set(
        {
      'x': position.x + x ,
      'y': position.y + y
    }
    )
  }

// Reading  to the Database 
function readPosition(data){
    // extract the value from the DB
    position = data.val();
    
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;
  }
  
  //show error if any 
  function showError(){
    console.log("Error in writing to the database");
  }


