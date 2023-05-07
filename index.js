const currentTime = document.getElementsByClassName('current-time');
const currentDay = document.getElementsByClassName('current-day');
const currentDate = document.getElementsByClassName('current-date');
const hourHand = document.getElementsByClassName('hour-hand');
const minuteHand = document.getElementsByClassName('minute-hand');
const secondHand = document.getElementsByClassName('second-hand');
const alarmPopupButton = document.getElementById('alarm-popup-button');
const createAlarmScreen = document.getElementById('create-alarm-screen');
const humanImage = document.getElementById('human-image');
const inputTags = document.getElementsByTagName('input');
const popupCreateAlarm = document.getElementById('popup-create-alarm');
const alarmList = document.getElementsByClassName('alarm-list');

// will contain all the individual alarms 
let listItems = '';

// putting the hands of the clock to the desired location 
let today = new Date();
let secondHandDegree = 6 * today.getSeconds();
let minuteHandDegree = 6 * today.getMinutes() + (secondHandDegree / 60);
let hourHandDegree = 15 * (today.getHours());

// checking if there's already an alarm in local storage
if (localStorage.length != 0) {
    renderAlarms();
}

// function that renders the list of alarms
function renderAlarms() {
    listItems = '';
    for (let i in localStorage) {
        if (i != undefined && localStorage.getItem(i) != undefined && localStorage.getItem(i)[2] == ':') {
            // console.log(i);
            listItems += `<li class="individual-alarm" >
                <p class="individual-alarm-name">${i}</p>
                <p class="individual-alarm-time">${localStorage.getItem(i)}</p>
                <p class='individual-alarm-background'>88:88</p>
                <i data-value='${i}' class="fa-solid fa-trash-can trash-can"></i>
                </li> `;
        }
    }
    alarmList[0].innerHTML = listItems;
    trashIconWorking();
}


// providing functionality to the trash icon 
function trashIconWorking() {
    const trashIcon = document.getElementsByTagName('i');
    for (let i of trashIcon) {
        i.addEventListener('click', () => {
            localStorage.removeItem(i.getAttribute('data-value'));
            renderAlarms();
        })
    }
}

// functionality when the createa alarm button is pressed 
popupCreateAlarm.onclick = (e) => {
    for (let i of inputTags) {
        if (i.value == '') {
            popupCreateAlarm.style.animation = 'headshake 1s';
            setTimeout(() => {
                popupCreateAlarm.style.animation = 'none';
            }, 2000);
            return;
        }
        else {
            e.preventDefault();
            let hours = inputTags[1].value;
            let minutes = inputTags[2].value;
            if (hours < 10 && hours.length < 2) {
                hours = '0' + hours;
            }
            if (minutes < 10 && minutes.length < 2) {
                minutes = '0' + minutes;
            }
            localStorage.setItem(`${inputTags[0].value}`, `${hours}:${minutes}`);
            popupCreateAlarm.style.animation = 'button-press 0.5s';
            setTimeout(() => {
                popupCreateAlarm.style.animation = 'none';
                createAlarmScreen.style.animation = 'fade-out-down 1.4s';
                setTimeout(()=>{
                    document.getElementsByTagName('form')[0].reset();
                    createAlarmScreen.style.animation = 'fade-in-up 1.4s';
                    createAlarmScreen.style.display = 'none';
                },1400);
            }, 500);
            renderAlarms();
        }
    }
}

// displaying the hands once they are at the desired position 
let showHand = setTimeout(() => {
    hourHand[0].style.opacity = 1;
    minuteHand[0].style.opacity = 1;
    secondHand[0].style.opacity = 1;
}, 10);

// showing popup screen once button is pressed 
alarmPopupButton.addEventListener('click', () => {
    setTimeout(() => {
        createAlarmScreen.style.display = 'flex';
    }, 100)
})

// function for the working of the analog clock 
let clockMovement = setInterval(() => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let milliseconds = today.getMilliseconds();
    hourHand[0].style.transform = `rotate(${30 * (hours + (minutes / 60))}deg)`;
    minuteHand[0].style.transform = `rotate(${6 * (minutes + (seconds / 60))}deg)`;
    secondHand[0].style.transform = `rotate(${6 * (seconds + (milliseconds / 1000))}deg)`;
}, 10);

/* Temporary date and time, so that the alarm rings only once, and stops when the window alert is addressed! */
let tempTime;
let tempDate;

// function that keeps updating the time, and checks for alarms 
let updateClock = setInterval(() => {
    let today = new Date();
    // day of the week 
    let day = today.toLocaleDateString('en-us', { weekday: 'long' });
    let month = today.getMonth() + 1;
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let shortDate = today.getDate();
    // converting single digit numbers to double digits 
    if (shortDate < 10) {
        shortDate = '0' + shortDate;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    // displaying the new values of date and time 
    let date = shortDate + '-' + month + '-' + today.getFullYear();
    let time = hours + ':' + minutes + ':' + seconds;
    currentTime[0].innerText = time;
    currentDay[0].innerText = day + ',';
    currentDate[0].innerHTML = `&nbsp;${date}`;
    // checking if there is an alarm at the particular time and giving an alert when the alarm goes off 
    for (let i in localStorage) {
        if (localStorage.getItem(i) == hours + ':' + minutes) {
            if (tempTime != minutes || tempDate != today.getDate()) {
                tempTime = minutes;
                tempDate = today.getDate();
                setTimeout(()=>{
                    window.alert(i);
                },100);
            }
        }
    }
}, 100);
