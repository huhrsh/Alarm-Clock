const currentTime = document.getElementsByClassName('current-time');
const currentDay = document.getElementsByClassName('current-day');
const currentDate = document.getElementsByClassName('current-date');
const hourHand=document.getElementsByClassName('hour-hand');
const minuteHand=document.getElementsByClassName('minute-hand');
const secondHand=document.getElementsByClassName('second-hand');
const alarmPopupButton=document.getElementById('alarm-popup-button');
const createAlarmScreen=document.getElementById('create-alarm-screen');
const humanImage=document.getElementById('human-image');
const inputTags=document.getElementsByTagName('input');
const popupCreateAlarm=document.getElementById('popup-create-alarm');
const alarmList=document.getElementsByClassName('alarm-list');
let listItems='';

let today=new Date();
let secondHandDegree=6*today.getSeconds();
let minuteHandDegree=6*today.getMinutes()+(secondHandDegree/60);
let hourHandDegree=15*(today.getHours());

for(let i of inputTags){
    i.onclick=()=>{
        i.classList.add('animate__animated');
        i.classList.add('animate__flash');
        i.classList.add('animate__fast');
    }
    i.onanimationend=()=>{
        i.classList.remove('animate__flash');
    }
}

if(localStorage.length!=0){
    renderAlarms();
}

function renderAlarms(){
    listItems='';
    for(let i in localStorage){
        if(i!=undefined && localStorage.getItem(i)!=undefined){
            console.log(i);
            listItems+=`<li class="individual-alarm" >
                <p class="individual-alarm-name">${i}</p>
                <p class="individual-alarm-time">${localStorage.getItem(i)}</p>
                <p class='individual-alarm-background'>88:88</p>
                <i data-value='${i}' class="fa-solid fa-trash-can trash-can animate__animated"></i>
                </li> `;
            }
        }
        alarmList[0].innerHTML=listItems;
        trashIconWorking();
    }



    function trashIconWorking(){
        const trashIcon=document.getElementsByTagName('i');
        for(let i of trashIcon){
            i.addEventListener('click',()=>{
                localStorage.removeItem(i.getAttribute('data-value'));
                renderAlarms();
            })
            
            i.addEventListener('mouseover',()=>{
                i.classList.add('animate__swing');
            })
            
            i.addEventListener('mouseout',()=>{
                i.classList.remove('animate__swing');
            })
        }
    }
    
    
    popupCreateAlarm.onclick=(e)=>{
        for(let i of inputTags){
            if(i.value==''){
                popupCreateAlarm.classList.add('animate__headShake');
                popupCreateAlarm.onanimationend=()=>{
                    popupCreateAlarm.classList.remove('animate__headShake');
                }
                return;
            }
            else{
                e.preventDefault();
                let hours=inputTags[1].value;
                let minutes=inputTags[2].value;
                if(hours<10 && hours.length<2){
                    hours='0'+hours;
                }
                if(minutes<10 && minutes.length<2){
                    minutes='0'+minutes;
                }
                localStorage.setItem(`${inputTags[0].value}`,`${hours}:${minutes}`);
                popupCreateAlarm.classList.add('animate__pulse');
                popupCreateAlarm.onanimationend=()=>{
                    popupCreateAlarm.classList.remove('animate__pulse');
                    createAlarmScreen.classList.add('animate__fadeOutDown');
                    setTimeout(function(){
                        createAlarmScreen.classList.remove('animate__fadeOutDown');
                    createAlarmScreen.style.display='none';
                    document.getElementsByTagName('form')[0].reset();
                },1000);
                renderAlarms();
                // createAlarmScreen.onanimationend=function(){
                    //     createAlarmScreen.classList.remove('animate__fadeOutDown');
                    //     createAlarmScreen.style.display='none';
                    // }
                }
        }
    }
}


let showHand=setTimeout(()=>{
    hourHand[0].style.opacity=1;
    minuteHand[0].style.opacity=1;
    secondHand[0].style.opacity=1;
},10);

alarmPopupButton.addEventListener('click',()=>{
    alarmPopupButton.classList.add('animate__pulse');
    alarmPopupButton.onanimationend=()=>{
        createAlarmScreen.style.display='flex';
        createAlarmScreen.classList.add('animate__fadeInUp');
        createAlarmScreen.onanimationend=()=>{
            createAlarmScreen.classList.remove('animate__fadeInUp');
        }
        alarmPopupButton.classList.remove('animate__pulse');
    }
})

// function for the working of the analog clock 
let clockMovement=setInterval(()=>{
    let today = new Date();
    let hours= today.getHours();
    let minutes=today.getMinutes();
    let seconds=today.getSeconds();
    let milliseconds=today.getMilliseconds();
    hourHand[0].style.transform=`rotate(${30*(hours+(minutes/60))}deg)`;
    minuteHand[0].style.transform=`rotate(${6*(minutes+(seconds/60))}deg)`;
    secondHand[0].style.transform=`rotate(${6*(seconds+(milliseconds/1000))}deg)`;
},10);

let temp;

// function that keeps updating the time 
let updateClock=setInterval(()=>{
    let today = new Date();
    let day=today.toLocaleDateString('en-us', { weekday: 'long' });  
    let month=today.getMonth()+1;
    let shortDate=today.getDate();
    if(shortDate<10){
        shortDate='0'+shortDate;
    }
    // converting single digit numbers to double digits 
    if(month<10){
        month='0'+month;
    }
    let date=shortDate+'-'+month+'-'+today.getFullYear();
    let hours= today.getHours();
    let minutes=today.getMinutes();
    let seconds=today.getSeconds();
    // converting hours minutes and seconds to double digits 
    if(hours<10){
        hours='0'+hours;
    }
    if(minutes<10){
        minutes='0'+minutes;
    }
    if(seconds<10){
        seconds='0'+seconds;
    }
    // displaying the new values of date and time 
    let time = hours+':'+minutes+':'+seconds;
    currentTime[0].innerText=time;
    currentDay[0].innerText=day+',';
    currentDate[0].innerHTML=`&nbsp;${date}`;

    for(let i in localStorage){
        if(localStorage.getItem(i)==hours+':'+minutes){
            if(temp!=minutes){
                temp=minutes;
                window.alert(i);
            }
        }
    }

},100);
