import { select } from './../settings.js';
import AmountWidget from './AmountWidget.js';


class Booking{
  constructor(){
    const thisBooking = this;

    thisBooking.initWidgets();
    thisBooking.render(container);
  }
  render(){
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = '';
    thisBooking.dom.wrapper = thisBooking.dom;
    thisBooking.dom.wrapper = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.quertySelector(select.booking.peopleAmount);
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.quertySelector(select.booking.hoursAmount);
  }
  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(select.booking.peopleAmount);
    thisBooking.peopleAmount = new AmountWidget(select.booking.hoursAmount);
  }
}
export default Booking;