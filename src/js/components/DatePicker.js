/* global flatpickr */
import utils from '../utils.js';
import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }

  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    let calendar = flatpickr(thisWidget.dom.input, {
      
      'minDate': thisWidget.minDate,
      'maxDate': thisWidget.maxDate,
      'disable': [
        function(date) {
          // return true to disable
          return (date.getDay() === 1);
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

  parseValue(value){
    return value;
  }
  isValid(){
    return true;
  }
  renderValue(){
    return null;
  }
}
export default DatePicker;