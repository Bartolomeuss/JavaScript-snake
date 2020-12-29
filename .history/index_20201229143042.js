const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0



function createGrid() {

    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.classList.add('squares')
        grid.appendChild(square)
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    score = 0
    scoreDisplay.textContent = score
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    intervalTime = 1000
    direction = 1
    generateApples()
    timerId = setInterval(move, intervalTime)
    currentSnake.forEach(index => squares[index].classList.add("snake"))

}
startBtn.addEventListener('click', startGame)

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === - 1) ||
        (currentSnake[0] - width < 0 && direction === - width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)



    const back = currentSnake.pop()
    squares[back].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {

        squares[appleIndex].classList.remove('apple') //diferently done than in course but seems to work for now
        squares[back].classList.add('snake')
        currentSnake.push(back)
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime *= speed
        timerId = setInterval(move, intervalTime)



        generateApples()
    }




    squares[currentSnake[0]].classList.add('snake')
}



function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)

    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()

function control(e) {
    // if (e.keyCode === 39) {
    //     direction = 1
    // } else if (e.keyCode === 38) {
    //     direction = - width
    // } else if (e.keyCode === 37) {
    //     direction = -1
    // } else if (e.keyCode === 40) {
    //     direction = width
    // }

    switch(e.keyCode){
        case 40:
            direction = width
        break;
        case 39:
            direction = 1
        break;
        case 38:
            direction = - width
        break;
        case 37:
            direction = -1
        break;
    }


}
document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)