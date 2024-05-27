let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const ring = document.getElementById('ring');
function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {

        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            displayTimeLeft(0); 
            ring.play();     // Log 0 when the countdown reaches zero
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}
function pause(){
    ring.pause();
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // document.title = display;
    timerDisplay.textContent = display;}

function displayEndTime(timestamp){
     const end = new Date(timestamp);
     const hour = end.getHours();
     const minutes = end.getMinutes();
     const adjustHour = hour > 12 ? hour - 12 : hour;
     endTime.textContent = `Untill ${adjustHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
   timer(seconds);

}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.timeForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins *60);
    this.reset();
});
