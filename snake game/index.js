const gameboard=document.querySelector("#gameboard");
const ctx=gameboard.getContext("2d");
const scoreText=document.querySelector("#score");
const resetbtn=document.querySelector("#resetbtn");
const incspeed=document.querySelector("#incspeed");
const decspeed=document.querySelector("#decspeed");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const boardBackgraound="black";
const snakecolor="lightgreen";
const snakeborder="grey";
const foodcolor="red";
const unitsize=25;
let running =false;
let xvelocity= unitsize;
let yvelocity= 0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize,y:0},
    {x:0,y:0},
];
let hardness=75;
window.addEventListener("keydown",changedirection);
resetbtn.addEventListener("click",resetgame);
incspeed.addEventListener("click",()=>{hardness-=10})
decspeed.addEventListener("click",()=>{hardness+=10})

gamestart();

function gamestart(){
    running=true;
    scoreText.textContent=score;
    createfood();
    drawfood();
    nextTick();
};
function nextTick(){
    if (running){
        setTimeout(()=>{clearBoard();
            drawfood();
            movesnake();
            drawsnake();
            chkgameover();
            nextTick();
        },hardness);
    }
    else{
        dispgameover();
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackgraound;
    ctx.fillRect(0,0,gamewidth,gameheight);
};
function createfood(){
    function randomfood(min,max){
        const randnum=Math.round((Math.random()*(max-min)+min)/unitsize)
        return randnum*unitsize;

    }
    foodx=randomfood(0,gamewidth-unitsize);
    foody=randomfood(0,gamewidth-unitsize);
    
};
function drawfood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodx,foody,unitsize,unitsize);
};
function movesnake(){
    const head ={x:snake[0].x +xvelocity,
        y:snake[0].y+yvelocity};

    snake.unshift(head);
    //if food is eaten
    if(snake[0].x== foodx&& snake[0].y==foody){
        score+=1;
        scoreText.textContent=score;
        createfood();
    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokStyle=snakeborder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x,snakePart.y,unitsize,unitsize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitsize,unitsize);
    })
};
function changedirection(event){
    const keypressed=event.keyCode;
    const up=38;
    const down=40;
    const left=37;
    const right=39;
    
    const goingup=(yvelocity== -unitsize);    
    const goingdown=(yvelocity== unitsize);    
    const goingright=(xvelocity== unitsize);
    const goingleft=(xvelocity== -unitsize);
    switch(true){
        case(keypressed==left && !goingright):
        xvelocity=-unitsize;
        yvelocity=0;
        break;
        case(keypressed==up && !goingdown):
        xvelocity=0;
        yvelocity=- unitsize;
        break;
        case(keypressed==right && !goingleft):
        xvelocity=unitsize;
        yvelocity=0;
        break;
        case(keypressed==down && !goingup):
        xvelocity=0;
        yvelocity=unitsize;
        break;

    }
};
function chkgameover(){
    switch(true){
        case(snake[0].x<0):
        running=false;
        break;
        case(snake[0].x>=gamewidth):
        running=false;
        break;
        case(snake[0].y<0):
        running=false;
        break;
        case(snake[0].y>=gameheight):
        running=false;
        break;
    }
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x==snake[0].x &&snake[i].y ==snake[0].y){
            running=false;
            break;
        }
    }
};
function dispgameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="yellow";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER!",gamewidth/2,gameheight/2);
    running=false;
};
function resetgame(){
    score=0;
    xvelocity=unitsize;
    yvelocity=0;
    snake=[
        {x:unitsize*4,y:0},
        {x:unitsize*3,y:0},
        {x:unitsize*2,y:0},
        {x:unitsize,y:0},
        {x:0,y:0},
    ];
    gamestart();
};
