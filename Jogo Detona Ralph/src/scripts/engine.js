const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        countDownTimerId: null,
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        loseLife();
    }
}

function loseLife() {
    state.values.lives--; 
    state.view.lives.textContent = state.values.lives; 

    if (state.values.lives > 0) {
        state.values.currentTime = 60;
        state.view.timeLeft.textContent = state.values.currentTime;
    } else {
        playSound('game-over');

        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        
        Swal.fire({
            title: 'Game Over!',
            text: 'Você ficou sem vidas! O seu resultado foi: ' + state.values.result,
            confirmButtonText: 'OK',
            confirmButtonColor: '#008b8b',
            customClass: {
                title: 'title-custom',
                content: 'text-custom',
                confirmButton: 'button-custom'
            }
        });
        
        
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
    state.view.lives.textContent = state.values.lives;
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

init();
