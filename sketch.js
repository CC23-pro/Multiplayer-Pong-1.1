const database=firebase.database();
var y1, y2;
var spr1, spr2;
var ball;

var left;
var up;
var right;
var down;

var score1=0;
var score2=0;
var v=-5;
var bg;
function preload(){
    bg=loadImage("Board.jpg");
}
function setup(){
    createCanvas(400, 400);
    spr1=createSprite(10, 200, 10, 60);
    spr1.shapeColor='yellow';

    spr2=createSprite(390, 200, 10, 60);
    spr2.shapeColor='yellow';

    ball=createSprite(200, 200, 20, 20);
    
    ball.velocityX=v;
    ball.velocityY=v;

    left=createSprite(0, 200, 1, 400);
    right=createSprite(400, 200, 1, 400);

    up=createSprite(200, 0, 400, 1);
    down=createSprite(200, 400, 400, 1);
}

function draw(){
    background(bg);

    database.ref('players').update({player2:mouseY})

    database.ref('players').on('value', (data)=>{
        y1=data.val().player1;
        spr1.y=y1
    })

    database.ref('players').on('value', (data)=>{
        y2=data.val().player2;
        spr2.y=y2
    })
    
    ball.bounceOff(spr1);
    ball.bounceOff(spr2);

    ball.bounceOff(up);
    ball.bounceOff(down);

    if(ball.isTouching(left)){
        ball.x=200;
        ball.y=200;
        ball.velocityX=v;
        ball.velocityY=v;
        score2++;
        console.log(score2);
    }

    if(ball.isTouching(right)){
        ball.x=200;
        ball.y=200;
        ball.velocityX=v;
        ball.velocityY=v;
        score1++;
        console.log(score1);
    }
    for(var i=0;i<420;i+=20){
        line(200, i, 200, i-10);
    }

    textSize(30);
    text(score1, 100, 30);
    text(score2, 300, 30);
    drawSprites();
}