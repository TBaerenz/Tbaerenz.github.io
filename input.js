export class InputHandler {
    constructor(game){
        this.keys = [];
        this.game = game;
        window.addEventListener('keydown', e => {
            this.game.start = true;
            if ((   e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' '
                ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            if (    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === ' '
                    ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}