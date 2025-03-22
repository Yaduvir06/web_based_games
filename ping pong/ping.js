const gameboard=document.querySelector("#board");
const ctx= gameboard.getContext("2d");
const score=document.querySelector("#score");
const resetbtn=document.querySelector("#reset");
const start=document.querySelector("#startgame");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const p1color="green";
const p2color="red";
const ballcolor="yellow";
const ballborder="black";
const ballradius=5.5;
const paddlespeed=10;
let intervalid;
let ballspeed=1;
let ballx=gamewidth/2;
let bally=gameheight/2;
let ballxdir=0;
let ballydir=0;
let player1score=0;
let player2score=0;
let p1={
    width:25,
    height:40,
    x:0,y:0
}
let p2={
    width:25,
    height:40,
    x:gamewidth-25,y:gameheight-40,
}

window.addEventListener("keydown",changedirection);
resetbtn.addEventListener("click",resetgame);
start.addEventListener("click",gamestart);

function gamestart(){
    createball();
    nexttick();
};
function nexttick(){
    intervalid=setTimeout(()=>{
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballx,bally);
        chkcolision();
        nexttick();
    },10)
};
function clearboard(){
    ctx.fillStyle="azure";
    ctx.fillRect(0,0,gamewidth,gameheight);
};
function drawpaddles(){
    ctx.strokeStyle=ballcolor ;

    ctx.fillStyle=p1color;
    ctx.fillRect(p1.x,p1.y,p1.width,p1.height);
    ctx.strokeRect(p1.x,p1.y,p1.width,p1.height);
    ctx.fillStyle=p2color;
    ctx.fillRect(p2.x,p2.y,p2.width,p2.height);    
    ctx.strokeRect(p2.x,p2.y,p2.width,p2.height);  
};
function createball(){
    ballspeed=1;
    if(Math.round(Math.random())==1){
        ballxdir=1;
    }
    else{
        ballxdir=-1;
    }
    if(Math.round(Math.random())==1){
        ballydir=1;
    }
    else{
        ballydir=-1;
    }
    ballx=gamewidth/2;
    bally=gameheight/2;
    drawball();
};
function moveball(){
    ballx +=(ballspeed*ballxdir);
    bally +=(ballspeed*ballydir);
    
};
function drawball(ballx,bally){
    
    ctx.fillStyle=ballcolor;
    ctx.strokeStyle=ballborder;
    ctx.linewidth=2;
    ctx.beginPath();
    ctx.arc(ballx,bally,ballradius,0,2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function chkcolision(){
   
    if(bally<=0+ballradius){
        ballydir*=-1;
    }
    if(bally>=gameheight-ballradius){
        ballydir*=-1;
    }
    if(ballx<0){
        player2score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx>=gamewidth){
        player1score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx<=(p1.width+p1.x+ballradius)){
        if(bally>p1.y&&bally<p1.y+p1.height){
            ballxdir*=-1;
        }
    }
    if(ballx>=(p2.x-ballradius)){
        if(bally>p2.y&&bally<p2.y+p2.height){
            ballxdir*=-1;
        }
    }
};
function changedirection(event){
    const keypressed=event.keyCode;
    console.log(keypressed);
    const paddle1up=87;
    const paddle1down=83;
    const paddle2up=38;
    const paddle2down=40;
    switch(keypressed){
        case(paddle1up):
        if(p1.y>0){
        p1.y-=paddlespeed;
        }
        break;
        case(paddle1down):
        if(p1.y<gameheight-p1.height){
        p1.y+=paddlespeed;}
        break;
        case(paddle2up):
        if(p2.y>0){
        p2.y-=paddlespeed;}
        break;
        case(paddle2down):
        if(p2.y<gameheight-p2.height){
        p2.y+=paddlespeed;}
        break;

    }

};
function updatescore(){
    score.textContent=player1score+":"+player2score;
};
function resetgame(){
    clearboard();
    ballspeed=1;
    ballx=gamewidth/2;
    bally=gameheight/2;
    ballxdir=0;
    ballydir=0;
    player1score=0;
    player2score=0;
    p1={
    width:25,
    height:40,
    x:0,y:0
}
    p2={
    width:25,
    height:40,
    x:gamewidth-25,y:gameheight-40,
}
clearInterval(intervalid);
updatescore();
};