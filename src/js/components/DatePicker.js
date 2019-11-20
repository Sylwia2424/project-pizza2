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
    //thisWidget.parseValue();
    //thisWidget.isValid();
    //thisWidget.renderValue();
  }
  initPlugin(){
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate >= thisWidget.minDate == settings.datePicker.maxDaysInFuture;
    thisWidget.addDays = utils.addDays(thisWidget.minDate);

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
      onChange: function() {
        thisWidget.value = thisWidget.addDays;
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