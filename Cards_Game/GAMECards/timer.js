export default class Timer {
    constructor(target) {
        this.target = target;
    }
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerID = null;
    start() {
        this.timerID = setInterval(this.handleTimerStart, 1000)
        this.target.style.display = 'block';

    }
    stop() {
        this.seconds = this.minutes = this.hours = 0
        clearInterval(this.timerID)

    }
    handleTimerStart = () => {
        this.seconds++


        if (this.seconds === 60) {
            this.minutes++
            this.seconds = 0
        }
        if (this.minutes === 60) {
            this.hours++
            this.minutes = 0
        }
        
        this.target.textContent = `${this.formatTimerNumbers(this.hours)}:${this.formatTimerNumbers(this.minutes)}:${this.formatTimerNumbers(this.seconds)}`
    }
formatTimerNumbers(number){
    return number > 9 ? number : `0${number}`
}
}