import utils from '../utils.js';
import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';
//import Booking from './Booking.js';

class DatePicker extends BaseWidget{
  costructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

  }
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate >= thisWidget.minDate.querySelector(settings.datePicker.maxDaysInFuture);

    flatpick(thisWidget.dom.input, );
  }
  parseValue(){
    return parseInt();
  }
  isValid(value){
    return (value);
  }
  renderValue(){

  }
}
export default DatePicker;