var score = 0;
AFRAME.registerComponent('click-to-shoot', {
    init: function() {
        document.body.addEventListener('mousedown', () => {
            this.el.emit('shoot');
            this.playSound();
        });
        document.body.addEventListener('triggerdown', (evt) => {
            console.log("Evt", evt);
            //var whichGun = evt.target.getAttribute("id");
            evt.target.emit('shoot');
            this.playSound();
        });
    },
    playSound: function() {
        // This is a generic way of playing sound in html5. 
        // I was having trouble with A-Frame sound by the time of this demo.
        var sceneEl = document.querySelector('#shot');
        sceneEl.pause();
        sceneEl.play();
    }
});

/**
 * When hit.
 */
AFRAME.registerComponent('hit-handler', {
    init: function() {
        var el = this.el;
        el.addEventListener('hit', (evt) => {
            // console.log("hit on target id ---> : ", evt.target.getAttribute("id"));
            switch (evt.target.getAttribute("id")) {
                case "targetM":
                    this.updateScore(50);
                    break;
                case "targetL":
                    this.updateScore(10);
                    break;
                case "targetR":
                    this.updateScore(10);
                    break;
                default:
                    this.updateScore(5);
                    break;
            }
        });

        el.addEventListener('die', (evt) => {
            console.log("die on target id ---> : ", evt.target.getAttribute("id"));
            // use this to do some emitter (eg explosion)
        });
    },
    updateScore: function(value) {
        score += value;
    },
    tick: function() {
        // Values update on update cycle;
        var scoreEl = document.querySelector('#scoreBoard');
        scoreEl.setAttribute('value', score);
    }

});