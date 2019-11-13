import {select, templates} from './../settings.js';
import AmountWidget from './AmountWidget.js';


class Booking{
  constructor(container){
    const thisBooking = this;

    thisBooking.render(container);
    thisBooking.initWidgets();
    //console.log('new Booking', thisBooking);

  }
  render(container){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = container;
    thisBooking.dom.wrapper = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
  }
  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    //thisBooking.dom.peopleAmount.addEventListener('updated', function(){

    //});
    thisBooking.hoursAmount = new AmountWidget(select.booking.hoursAmount);
    //thisBooking.dom.hoursAmount.addEventListener('updated', function(){

    //});
  }
}
export default Booking;