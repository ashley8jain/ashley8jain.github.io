function init(){
    gameover = false;
    canvas = document.getElementById('canvas');
    pen = canvas.getContext('2d');
    canvas.height = (window.innerHeight || document.body.clientHeight)-30;
    canvas.width = (window.innerWidth || document.body.clientWidth)-30;
    W = canvas.width;
    H = canvas.height;
    score = 0;
    
    //snake JSON
    snake = {
        
        length: 20,
        particles: [],
        direction: "right",
        
        create: function(){
            for(var i=this.length-1;i>=0;i--){
                this.particles.push( {x:i,y:0});
            }
        },
        
        draw: function(){
            this.particles.forEach(function(particle){
                pen.fillStyle = "red";
                pen.strokeStyle = "white";
                pen.lineWidth = 5;
                pen.strokeRect(particle.x*20,particle.y*20,20,20); 
                pen.fillRect(particle.x*20,particle.y*20,20,20); 
            });
        },
        
        update: function(){  
            
            var newX = this.particles[0].x;
            var newY = this.particles[0].y;
            
            if(isCollide()){
                gameover = true;
            }
            
            if(newX==food.x && newY==food.y){
                food = generateFood();
                score++;
            }
            else{
                this.particles.pop();   
            }
            
            
            if(this.direction=="right"){
                newX++;
            }
            else if(this.direction=="left"){
                newX--;
            }
            else if(this.direction=="up"){
                newY--;
            }
            else if(this.direction=="down"){
                newY++;
            }
            this.particles.unshift({x:newX,y:newY});
            
        },
        
    };
    
    snake.create();
    
    function changeDir(e){
        
        switch(e.key){
            case "ArrowLeft":
                if(snake.direction!="right")
                    snake.direction = "left";
                break;
            case "ArrowRight":
                if(snake.direction!="left")
                    snake.direction = "right";
                break;
            case "ArrowUp":
                if(snake.direction!="down")
                    snake.direction = "up";
                break;
            case "ArrowDown":
                if(snake.direction!="up")
                    snake.direction = "down";
                break;
        }
    }

    function isCollide(){
        var x = snake.particles[0].x;
        var y = snake.particles[0].y;
        for(var i=1;i<snake.particles.length;i++){
            var xx = snake.particles[i].x;
            var yy = snake.particles[i].y;
            if(xx===x&&yy===y){
                return true;
            }
        }
        return false;
    }
    
    ///Listner for Keyboard Inputs
    document.addEventListener('keydown',changeDir);
    
    //create first food
    food = generateFood();
    
}

function draw(){
    //clear old screen
    pen.clearRect(0,0,W,H);
    
    snake.draw();
    
    //draw food
    pen.fillStyle = "blue"; pen.fillRect(food.x*20,food.y*20,20,20);
    
    //draw score
    pen.font = "30px Arial";
    pen.fillText("Score "+score,10,70);
   
}

function update(){
    snake.update();
}

function render(){
    if(!gameover){
        draw();
        update();
    }
    else{
        drawGO();
    }
}

init();
setInterval(render,60);








function generateFood(){
    var x = Math.round(Math.random()*(W - 20)/20);
    var y = Math.round(Math.random()*(H-20)/20);
    return {x:x,y:y};
}

function drawGO(){
    //clear old screen
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "green";
    //draw score
    pen.fillText("Score: "+score,W/2-20,H/2-10);
    pen.fillText("Game Over!",W/2-30,H/2+30);
}



