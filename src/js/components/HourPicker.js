/* global rangeSlider */
import {select, settings} from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, settings.hours.open);

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    
    //thisWidget.initPlugin();
    thisWidget.parseValue();
    thisWidget.isValid();
    thisWidget.renderValue();
  }

  parseValue(value){
    return utils.numberToHour(value);
  }
  isValid(value){
    return (value);
  }
  renderValue(){
    const thisWidget = this;
    thisWidget.value = thisWidget.dom.output;
  }


}
export default HourPicker;