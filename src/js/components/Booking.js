import {select, templates, settings, classNames} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
//import { promises } from 'dns';
//import { settings } from 'cluster';


class Booking{
  constructor(container){

    const thisBooking = this;
    

    thisBooking.render(container);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.initActions();


  }
  getData(){
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDayParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);


    const params = {
      booking: [
        startDateParam,
        endDayParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDayParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDayParam,
      ],
    };
    console.log('getData params', params);
    const urls = {
      booking:       settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.event + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        console.log(bookings);
        console.log(eventsCurrent);
        console.log(eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });

  }
  parseData(bookings, eventsCurrent, eventsRepeat){
    const thisBooking = this;

    thisBooking.booked = {};
    for(let item of eventsCurrent){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    for(let item of bookings){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for(let item of eventsRepeat){
      if(item.repeat == 'daily'){
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    console.log('thisBooking.booked', thisBooking.booked);
    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table){
    const thisBooking = this;

    if(typeof thisBooking.booked[date] == 'undefined'){
      thisBooking.booked[date] = {};
    }
    const startHour = utils.hourToNumber(hour);

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5){
      //console.log('loop', hourBlock);
      if(typeof thisBooking.booked[date][hourBlock] == 'undefined'){
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }
  render(container){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget(container);
    thisBooking.dom = {};
    thisBooking.dom.wrapper = container;
    thisBooking.dom.wrapper.element = utils.createDOMFromHTML(generatedHTML);
    container.appendChild(thisBooking.dom.wrapper.element);
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    thisBooking.dom.hour = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    thisBooking.dom.people = thisBooking.dom.wrapper.querySelector(select.widgets.amount.input);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    
    thisBooking.dom.wrapper.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });
    thisBooking.dom.datePicker.addEventListener('updated', function(){
      //thisBooking.updateDOM();

    });


  }
  updateDOM(){
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.dom.input.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.dom.hour.innerHTML);

    let allAvailable = false;

    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ){
      allAvailable = true;
    }

    for(let table of thisBooking.dom.tables){
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if(!isNaN(tableId)){
        tableId = parseInt(tableId);
      }

      if(
        !allAvailable
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ){
        table.classList.remove(classNames.booking.tableBooked);
        table.classList.add(classNames.booking.tableBooked);

      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }
  initActions(){
    const thisBooking = this;
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    for (let table of thisBooking.dom.tables){
      table.addEventListener('click', function(){
        if(!table.classList.contains('booked')){
          let tableId = table.getAttribute(settings.booking.tableIdAttribute);
          if(!isNaN(tableId)){
            tableId = parseInt(tableId);
            table.classList.toggle(classNames.booking.tableBooked),
            thisBooking.selectTable = tableId;
          }
        }
      });
    }
    
    thisBooking.dom.wrapper.addEventListener('submit', function(event){
      event.preventDefault();
      thisBooking.sendOrder();
    });
  }
  sendOrder(){
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;
    console.log(url);
    const payload = {
      peopleAmount: thisBooking.dom.people.value,
      hour: thisBooking.dom.hour.innerHTML,
      date: thisBooking.datePicker.dom.input.value,
      duration: thisBooking.hoursAmount.value,
      table: thisBooking.selectTable,
      booking: [],
    };
    //const formData = utils.serializeFormToObject(thisBooking.dom.tables);

    /*for(let table of thisBooking.dom.tables){
      //console.log(table);
      if(table.classList.contains(classNames.booking.tableBooked)){
        payload.table.push(settings.booking.tableIdAttribute);
      }
    }*/
    console.log(payload);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        console.log('parsedResopnse',parsedResponse);
      });
      
    console.log(options);

  }

  
}
export default Booking;