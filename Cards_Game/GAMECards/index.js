import Game from './game.js'
import Timer from './timer.js'
import {setElementsDisplay} from'./helpers.js'

document.addEventListener('DOMContentLoaded', () => {
    const timerHTML = document.querySelector('.time-tracker');
    const nav = document.querySelector('.nav')
    const gameRow = document.querySelector('.field .row')
  
    const myTimer = new Timer(timerHTML);

    const startButton = document.querySelector('.start__button')
    const fieldContainer = document.querySelector('.field_container')
    
    startButton.addEventListener('click', () => {
        setElementsDisplay('none',nav,startButton)
        setElementsDisplay('block',timerHTML,fieldContainer)
        const myGame = new Game(gameRow)
        myTimer.start()
        myGame.start()

    })

})