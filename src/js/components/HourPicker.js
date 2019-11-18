/* global rangeSlider */

import {select, settings} from '../settings.js';
import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget{
  constructor(wrapper){
    super(wrapper, settings.hours.open);

    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    
    thisWidget.initPlugin();
    thisWidget.parseValue();
    thisWidget.isValid();
    thisWidget.renderValue();
    //thisWidget.value = thisWidget.element;
  }
  initPlugin(){
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input,thisWidget.dom.output);
    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.element = thisWidget.value;
    });

  }
  parseValue(value){
    return utils.numberToHour(value);
  }
  isValid(value){
    return (value);
  }
  renderValue(){
    const thisWidget = this;
    return thisWidget.value;
  }
}
export default HourPicker;