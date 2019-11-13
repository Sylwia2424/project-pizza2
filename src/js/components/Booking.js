import {select, templates} from './../settings.js';
import utils from './../utils.js';
import AmountWidget from './AmountWidget.js';


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
  }
  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
 
  }
}
export default Booking;