import {select, templates} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';
//import DatePicker from './DatePicker.js';

class Booking{
  constructor(container){
    const thisBooking = this;
    

    thisBooking.render(container);
    thisBooking.initWidgets();

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
    thisBooking.dom.datePicker.wrapper = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
  }
  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker.wrapper);

  }
}
export default Booking;