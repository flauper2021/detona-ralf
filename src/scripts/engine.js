const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        },
    
    values: {
        lives: 3,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }

};

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.mp3 && ./src/sounds/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if( state.values.currentTime <= 0) {
        alert("Game Over! Seus score foi " + state.values.result);
        clearInterval(state.actions.timeId);
        clearInterval(state.actions.countDownTimerId);
    }
    
}

function randomSquare() {
    state.view.squares.forEach(square => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.lives--;
                state.view.lives.textContent = state.values.lives;
                playSound("miss");
                if (state.values.lives <= 0) {
                    playSound("game-over");
                    alert("Game Over! Seu score foi " + state.values.result);
                    clearInterval(state.actions.timeId);
                    clearInterval(state.actions.countDownTimerId);
                    state.view.squares.forEach((square) => {
                        square.classList.remove("enemy");
                    });
                }
            }
        });
    });
}
    
function initialize() {       
    addListenerHitBox();    
}

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});
