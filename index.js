var score = 0;
var count = 15;
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
            console.log("hit on target id ---> : ", evt.target.getAttribute("id"));
            switch (evt.target.getAttribute("id")) {
                case "at-st":
                    this.updateScore(5);
                    this.playSound();
                    break;
                case "darthvader":
                    evt.target.visible = false;
                    evt.target.parentNode.removeChild(evt.target);

                    this.updateScore(5);
                    break;
                case "boba-fett":
                    evt.target.visible = false;
                    evt.target.parentNode.removeChild(evt.target);
                
                    this.updateScore(25);
                    this.playSound();
                    break;
                default:
                    evt.target.visible = false;
                    evt.target.parentNode.removeChild(evt.target);
                    this.updateScore(1);
                    this.playSound();
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
        // this.playSound();
    },
    tick: function() {
        // Values update on update cycle;
        var scoreEl = document.querySelector('#scoreBoard');
        scoreEl.setAttribute('value', score);

    },
    playSound: function() {
        // This is a generic way of playing sound in html5. 
        // I was having trouble with A-Frame sound by the time of this demo.
        var hitEl = document.querySelector('#hit');
        hitEl.pause();
        hitEl.play();
    }
});

/*Timer*/
var count = 42;
var interval = setInterval(function(){
  test = document.getElementById('count');
  test.setAttribute('value',count)
  count--;
  if (count === 0){
    clearInterval(interval);
    document.getElementById('count').innerHTML='Done';
    alert("You're out of time!"+ "Score:"+score);
    location.reload();
  }
}, 1000);