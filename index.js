function cancelTopSuggestion(){
    let div = document.querySelector('#head-suggestion');
    div.style.display = 'none';
}

function openSignupWindow(){
    let div = document.querySelector('#signup-window');
    div.style.display = 'block';
}

function closeSignupWindow(){
    let div = document.querySelector('#signup-window');
    div.style.display = 'none';
}

function showFromWhereMenu() {
    let div = document.querySelector('#from-where-menu');
    div.style.display = 'block';
}

function hideFromWhereMenu() {
    let div = document.querySelector('#from-where-menu');
    div.style.display = 'none';
}

function inputIntoFromWhere(str) {
    let input = document.querySelector('#from-where');
    input.value = str;
    hideFromWhereMenu();
}

function showWhereToMenu() {
    let div = document.querySelector('#where-to-menu');
    div.style.display = 'block';
}

function hideWhereToMenu() {
    let div = document.querySelector('#where-to-menu');
    div.style.display = 'none';
}

function inputIntoWhereTo(str) {
    let input = document.querySelector('#where-to');
    input.value = str;
    hideWhereToMenu();
}

function convertTripOptionSelection(option){
    var backwayDropdown = document.querySelector('#backway-date-dropdown');
    switch(option) {
        case 'one-way':
            backwayDropdown.style.display = 'none';
            break;
        case 'round-trip':
            backwayDropdown.style.display = 'inline-block';
            break;
    }
}

function showNumberOfPeopleMenu(){
    var div = document.querySelector('#number-of-people-menu');
    div.style.display = 'block';
}

function hideNumberOfPeopleMenu(){
    var div = document.querySelector('#number-of-people-menu');
    div.style.display = 'none';
}

function increaseNumberOfAdults(){
    var number = parseInt(document.querySelector('#number-of-adults').innerHTML);
    if(!(number < 0)) {
        number++;
    }
    document.querySelector('#number-of-adults').innerHTML = number;
    inputIntoNumberOfPeopleMenu('adults', number);
}

function decreaseNumberOfAdults(){
    var number = parseInt(document.querySelector('#number-of-adults').innerHTML);
    if(!(number < 1)) {
        number--;
    }
    document.querySelector('#number-of-adults').innerHTML = number;
    inputIntoNumberOfPeopleMenu('adults', number);
}

function increaseNumberOfMinors(){
    var number = parseInt(document.querySelector('#number-of-minors').innerHTML);
    if(!(number < 0)) {
        number++;
    }
    document.querySelector('#number-of-minors').innerHTML = number;
    inputIntoNumberOfPeopleMenu('minors', number);
}

function decreaseNumberOfMinors(){
    var number = parseInt(document.querySelector('#number-of-minors').innerHTML);
    if(!(number < 1)) {
        number--;
    }
    document.querySelector('#number-of-minors').innerHTML = number;
    inputIntoNumberOfPeopleMenu('minors', number);
}

function inputIntoNumberOfPeopleMenu(adultOrMinor, number){
    var field = document.querySelector('#number-of-people');
    var numberOfAdults = document.querySelector('#number-of-adults').innerHTML;
    var numberOfMinors = document.querySelector('#number-of-minors').innerHTML;
    switch(adultOrMinor) {
        case 'adults':
            numberOfAdults = number;
            break;
        case 'minors':
            numberOfMinors = number;
            break;
    }
    if(numberOfAdults == 1) {
        field.value = numberOfAdults + ' adult, ' + numberOfMinors + ' minors';
    } else if(numberOfMinors == 1) {
        field.value = numberOfAdults + ' adults, ' + numberOfMinors + ' minor';
    } else if(numberOfAdults == 1 && numberOfMinors == 1) {
        field.value = numberOfAdults + ' adult, ' + numberOfMinors + ' minor';
    } else {
        field.value = numberOfAdults + ' adults, ' + numberOfMinors + ' minors';    
    }
    if((numberOfAdults == 0) && (numberOfMinors == 0)) {
        field.value = '';
    }
}

function clearNumberOfPeople(){
    var field = document.querySelector('#number-of-people');
    field.value = '';
    document.querySelector('#number-of-adults').innerHTML = 0;
    document.querySelector('#number-of-minors').innerHTML = 0;
}

function showDepartReturnMenu() {
    var div = document.querySelector('#depart-return-menu');
    div.style.display = 'block';
}

function hideDepartReturnMenu() {
    var div = document.querySelector('#depart-return-menu');
    div.style.display = 'none';
}

function sendUserSearchData() {
    showSearchResults();
    var fromWhereInput = document.querySelector('#from-where').value;
    var whereToInput = document.querySelector('#where-to').value;
    var tripOption = document.querySelector('#trip-option');
    var tripOptionImaginaryInput = tripOption.options[tripOption.selectedIndex].value;
    var oneWayDateInput = document.querySelector('#oneway-date').value;
    var backWayDateInput = document.querySelector('#backway-date').value;
    var numberOfAdultsInput = parseInt(document.querySelector('#number-of-adults').innerHTML);
    var numberOfMinorsInput = parseInt(document.querySelector('#number-of-minors').innerHTML);
    var tripOptionRealInput = '';
    if(tripOptionImaginaryInput == 'one-way') {
        tripOptionRealInput = "One Way";
        backWayDateInput = 'No Backway Date';
    } else if(tripOptionImaginaryInput == 'round-trip') {
        tripOptionRealInput = 'Round Trip';
    }
    var totalNumberOfPeopleInput = numberOfAdultsInput + numberOfMinorsInput;
    var userSearchData = {
        fromWhere: fromWhereInput,
        whereTo: whereToInput,
        tripOption: tripOptionRealInput,
        oneWayDate: oneWayDateInput,
        backWayDate: backWayDateInput,
        numberOfAdults: numberOfAdultsInput,
        numberOfMinors: numberOfMinorsInput,
        totalNumberOfPeople: totalNumberOfPeopleInput,
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '', true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(userSearchData);
}

async function receiveUserSearchResults() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '', true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    var database;
    database = await xhr.response;
    // Received data is expected to be
    // database = {
    //     airlineLogo: String,
    //     flightDuration: Date,
    //     airlineCompanyName: String,
    //     flightTimetable: String,
    //     numberOfStops: String,
    //     stopDuration: String,
    //     costOfFlight: String,
    //     typeOfFlight: String
    // }
    xhr.send();

    var ticketSearchTable = document.querySelector('#ticket-search__table');
    database.forEach(data => {
        var commonFlightRow = document.createElement('tr');
        var logoTD = document.createElement('td');
        var durationAndCompanyNameTD = document.createElement('td');
        var durationTR = document.createElement('tr');
        var companyNameTR = document.createElement('tr');
        var durationTD = document.createElement('td');
        var companyNameTD = document.createElement('td');
        var durationTD = document.createElement('td');
        var numberOfStopsAndStopDurationTD = document.createElement('tr');
        var numberOfStopsTR = document.createElement('tr');
        var stopDurationTR = document.createElement('tr');
        var numberOfStopsTD = document.createElement('td');
        var stopDurationTD = document.createElement('td');
        var priceAndTypeOfFlightTD = document.createElement('td');
        var priceTR = document.createElement('tr');
        var typeOfFlightTR = document.createElement('tr');
        var priceTD = document.createElement('td');
        var typeOfFlightTD = document.createElement('td');

        var logo = document.createElement('img');
        logo.src = data.airlineLogo;
        logoTD.appendChild(logo);

        var duration = data.flightDuration;
        durationTD.appendChild(duration);
        var companyName = data.airlineCompanyName;
        companyNameTD.appendChild(companyName);
        durationTR.appendChild(durationTD);
        companyNameTR.appendChild(companyNameTD);
        durationAndCompanyNameTD.appendChild(durationTD);
        durationAndCompanyNameTD.appendChild(companyNameTR);

        var numberOfStops = data.numberOfStops;
        numberOfStopsTD.appendChild(numberOfStops);
        var stopsDuration = data.stopsDuration;
        stopDurationTD.appendChild(stopsDuration);
        numberOfStopsTR.appendChild(numberOfStopsTD);
        stopDurationTR.appendChild(stopDurationTD);
        numberOfStopsAndStopDurationTD.appendChild(numberOfStopsTR);
        numberOfStopsAndStopDurationTD.appendChild(stopDurationTR);

        var price = data.costOfFlight;
        priceTD.appendChild(price);
        var typeOfFlight = data.typeOfFlight;
        typeOfFlightTD.appendChild(typeOfFlight);
        priceTR.appendChild(priceTD);
        typeOfFlightTR.appendChild(typeOfFlightTD);
        priceAndTypeOfFlightTD.appendChild(priceTR);
        priceAndTypeOfFlightTD.appendChild(typeOfFlightTR);

        commonFlightRow.appendChild(logoTD);
        commonFlightRow.appendChild(durationAndCompanyNameTD);
        commonFlightRow.appendChild(numberOfStopsAndStopDurationTD);
        commonFlightRow.appendChild(priceAndTypeOfFlightTD);

        ticketSearchTable.appendChild(commonFlightRow);
    });
}

function showSearchResults() {
    var div = document.querySelector('#ticket-search__results');
    div.style.display = 'block';
}

function showFlightDetails(img, companyName, flightDuration, timetable, stopDuration, price){
    var div1 = document.querySelector('#right-side__div1');
    div1.style.display = 'none';
    var flightImg = document.querySelector('#flight-img');
    flightImg.src = img;
    flightImg.width = '40';
    flightImg.height = '40';
    var flightTitle = document.querySelector('#flight-title');
    flightTitle.innerHTML = companyName;
    var flightDuring = document.querySelector('#flight-duration');
    flightDuring.innerHTML = flightDuration;
    var flightTimetable = document.querySelector('#flight-timetable');
    flightTimetable.innerHTML = timetable;
    var stopDuring = document.querySelector('#stop-duration');
    stopDuring.innerHTML = stopDuration;
    var flightPrice = document.querySelector('#ticket-search__details__prices__col-2 > #p3');
    flightPrice.innerHTML = price;
    var div2 = document.querySelector('#right-side__div2');
    div2.style.display = 'block';
}

function closeFlightDetails() {
    var div2 = document.querySelector('#right-side__div2');
    div2.style.display = 'none';
    var div1 = document.querySelector('#right-side__div1');
    div1.style.display = 'block'
}

function redirectToPassengerInfo(img, title, flight_duration, timetable, stop_duration, price) {
    window.location.href = `passenger-info.html?img=${img}&title=${title}&flight_duration=${flight_duration}&timetable=${timetable}&stop_duration=${stop_duration}&price=${price}`;
}

setTimeout(() => {
    document.querySelector('#cookies').style.display = 'block';
}, 5000);

function cancelCookies() {
    let div = document.querySelector('#cookies');
    div.style.display = 'none';
}