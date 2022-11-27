import {Player} from './player.js';
import {InputHandler} from './input.js';
import {Background} from './background.js';
import {FlyingEnemy, GroundEnemy, ClimbingEnemy} from './enemies.js';
import {UI} from './UI.js';

window.addEventListener('load', function(){
    document.getElementById("button1").onclick = restart;


    const canvas = document.getElementById('canvas1'); 
    const context = canvas.getContext('2d');
    canvas.width = document.body.clientWidth * 0.9;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;
            this.maxSpeed = 4;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.enemyTimer = 0;
            this.enemyInterval = Math.random() *  700 + 300;
            this.score = 0;
            this.start = false;
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.lives = 5;
            this.energy = 100;
            this.maxEnergy = canvas.width;
            this.PixEnergRatio = canvas.width / this.maxEnergy;
        }
        update(deltaTime){
            if(this.start){
            this.time += deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            if((this.player.currentState === this.player.states[4] ||this.player.currentState === this.player.states[5])){
                this.energy -= deltaTime*0.3

            }else if(this.energy < this.maxEnergy){
                    this.energy += deltaTime * 0.3;
                
                
            }
            this.player.update(this.input.keys, deltaTime);

            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
            })

            this.particles.forEach((particle, index) =>{
                particle.update();
            })

            this.collisions.forEach((collision, index) =>{
                collision.update(deltaTime);
                if (collision.markedForDeletion) this.collisions.splice(index, 1);
            } );

            this.floatingMessages.forEach(floatingMessage =>{
                floatingMessage.update();
            } );
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
        }
        }
        draw(context){
            this.background.draw(context);
            context.fillStyle ="orange";
            context.fillRect(0, 0, this.energy, 40);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.particles.forEach(particle =>{
                particle.draw(context);
            });
            this.collisions.forEach(collision =>{
                collision.draw(context);
            });
            this.floatingMessages.forEach(floatingMessage =>{
                floatingMessage.draw(context);
            } )
            this.UI.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() <0.5) this.enemies.push(new GroundEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    let game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0,0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(context);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);

    function restart(){
        location.reload();
        
    }


})