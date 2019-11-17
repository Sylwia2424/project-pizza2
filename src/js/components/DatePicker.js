import utils from '../utils.js';
import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';
import flatpickr from 'flatpickr';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

  }
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate >= thisWidget.minDate.querySelector(settings.datePicker.maxDaysInFuture);

    let calendar = flatpickr(thisWidget.dom.input, {
      
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      'disable': [
        function(date) {
          // return true to disable
          return (date.getDay() === 0 || date.getDay() === 6);

        }
      ],
      'locale': {
        'firstDayOfWeek': 1 // start week on 

      },
      onChange: function(dateStr) {
        thisWidget.value = dateStr;
        //...
      },
    });
    console.log(calendar);
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