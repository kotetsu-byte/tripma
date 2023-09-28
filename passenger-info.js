function pasteFirstName(input) {
    var firstNameCall = document.querySelector('#first-name-call');
    firstNameCall.innerHTML = input;
}

function pasteLastName(input) {
    var lastNameCall = document.querySelector('#last-name-call');
    lastNameCall.innerHTML = input;
}

function numberOfPacksIncrement() {
    var number = parseInt(document.querySelector('#number-of-packs').innerHTML);
    if(number >= 0) {
        number++;
    }
    document.querySelector('#number-of-packs').innerHTML = number;
}

function numberOfPacksDecrement() {
    var number = parseInt(document.querySelector('#number-of-packs').innerHTML);
    if(number >= 1) {
        number--;
    }
    document.querySelector('#number-of-packs').innerHTML = number;
}

window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var img = urlParams.get('img');
    var title = urlParams.get('title');
    var flight_duration = urlParams.get('flight_duration');
    var timetable = urlParams.get('timetable');
    var stop_duration = urlParams.get('stop_duration');
    var price = urlParams.get('price');

    var data = {
        img: img,
        title: title,
        flight_duration: flight_duration,
        timetable: timetable,
        stop_duration: stop_duration,
        price: price
    }
    insertIntoTicketDetails(data);
}

function insertIntoTicketDetails(data) {
    var img = data.img,
        title = data.title,
        flight_duration = data.flight_duration,
        timetable = data.timetable,
        stop_duration = data.stop_duration,
        price = data.price;
    
    document.querySelector('#flight-img').src = img;
    document.querySelector('#flight-img').width = '40';
    document.querySelector('#flight-img').height = '40';
    document.querySelector('#flight-title').innerHTML = title;
    document.querySelector('#flight-duration').innerHTML = flight_duration;
    document.querySelector('#flight-timetable').innerHTML = timetable;
    document.querySelector('#stop-duration').innerHTML = stop_duration;
    document.querySelector('#ticket-search__details__prices__col-2 > #p3').innerHTML = price;
}

function openSignupWindow(){
    let div = document.querySelector('#signup-window');
    div.style.display = 'block';
}

function closeSignupWindow(){
    let div = document.querySelector('#signup-window');
    div.style.display = 'none';
}