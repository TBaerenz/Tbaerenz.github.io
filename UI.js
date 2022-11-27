export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 100;
        this.fontFamily = 'Helvetica';
        this.livesImage = document.getElementById("lives");
    }
    draw(context){
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        context.font='30px Arial';

        context.fillText('Score: ' +this.game.score, 20, 65);

        context.font = this.fontsize +'px' + this.fontFamily;
        let timeRemaining = Math.round((this.game.maxTime - this.game.time)*0.001)
        if (timeRemaining < 0) timeRemaining = 0;
        context.fillText('Zeit: ' + timeRemaining, 20, 95);

        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 30 * i + 20, 15, 25, 25);            
        }
        if(this.game.time == 0){
        context.fillText('Pfeiltasten zum Bewegen, Leertaste zum Angreifen', 20, 130);
        context.fillText('Die orange Leiste stellt die Energie zum Angreifen dar.', 20, 160);
        context.fillText('wenn sie leer ist, ist Emma kurz gestunned.', 20, 190);
        context.fillText('-1 Leben, wenn Gegner berührt wird ohne anzugreifen.', 20, 210);
        context.fillText('+1 Score, wenn Gegner getötet wird', 20, 240);
        context.fillText('Ziel: nach 30s den höchsten Score haben.', 20, 270);
        }
        
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize *4 + 'px' + this.fontFamily;
            context.fillText('Your Score: '+ this.game.score, this.game.width *0.5, this.game.height * 0.6);

        }
        
    }
}