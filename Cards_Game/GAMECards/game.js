import cards from './cards-array.js'
import {
    shuffle,
    uuidv4
} from './helpers.js'

export default class Game {

    isSecondClick = false
    timerID = null

    constructor(gameRow) {
        this.gameCards = JSON.parse(JSON.stringify([...cards, ...cards]))
        this.gameRow = gameRow
    }
    count = 0
    start() {
        this.generateUuids()
        shuffle(this.gameCards)
        this.fillRowsWithCards()
        
        //  console.log(this.gameCards)
    }


    fillRowsWithCards(){
        this.gameCards.forEach(cardData=>{
            const wrapper = document.createElement('div')
            wrapper.classList.add('col-lg-2')
            const card = document.createElement('div')
            card.classList.add('card')
            const icon = document.createElement('i')
            icon.classList.add(cardData.className.split(' '))

            card.append(icon)
            wrapper.append(card)

            cardData.card = card
            cardData.icon = icon


            const classes = cardData.className.split(' ')
            cardData.icon.classList.remove('fab','fa-android')
            cardData.icon.classList.add(...classes)

            this.gameRow.append(wrapper)

            setTimeout(() => {
              cardData.icon.classList.remove(...classes)
                cardData.icon.classList.add('fab','fa-android')
               
                this.handUpClickListener(card,cardData)
            },1000)

        })
    }
    generateUuids() {
        this.gameCards.forEach((el, idx) => {
            el.id = uuidv4()
        })
    }

    handUpClickListener(card, cardData) {
        card.addEventListener('click', (e) => {
            const classes = cardData.className.split(' ')

            if (!this.isSecondClick) {

                this.isSecondClick = true
                cardData.isClicked = true

                this.showCard(cardData)

                console.log('У тебя 5 секунд чтоб найти карточку')

                this.timerID = setTimeout(() => {
                    this.hideCard(cardData, classes)
                    console.log('У вас истекло время для поиска')
                    this.isSecondClick = false
                    cardData.isClicked = false
                }, 5000)
            } else {
                const firstClickedCard = this.gameCards.find((el) => el.isClicked)

                if (firstClickedCard.id === cardData.id) {
                    this.hiden(cardData, classes)

                    return console.log('Один и тот же элемент не удалить )))')
                } else if (firstClickedCard.className === cardData.className) {
                    console.log('Поздравляем вы нашли одинаковые карточки')
 
                    firstClickedCard.card.style.display = 'none'
                   
                    cardData.card.style.display = 'none'
                } else if (firstClickedCard.className !== cardData.className) {
                    clearTimeout(this.timerID)
                    firstClickedCard.isClicked = false
                    this.hideCard(firstClickedCard, firstClickedCard.className.split(' '))
                    console.log('Вы не нашли одинаковые карточки')
                }
                this.isSecondClick = false
            }

        })
    }

    showCard(cardData) {
        const classes = cardData.className.split(' ')
        cardData.icon.classList.remove('fab', 'fa-android')
        cardData.icon.classList.add(...classes)
    }
    hideCard(cardData, classes) {

        cardData.icon.classList.remove(...classes)
        cardData.icon.classList.add('fab', 'fa-android')
    }
    hiden(cardData, classes) {

        cardData.icon.classList.remove(...classes)
        cardData.icon.classList.add('fab', 'fa-android')
    }
}