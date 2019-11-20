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

    thisWidget.value = thisWidget.dom.input.value;
    //console.log(thisWidget.value);

  }
  initPlugin(){
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);
    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = thisWidget.dom.input.value;
      thisWidget.renderValue();
    });
  }
  parseValue(value){
    const thisWidget = this;
    thisWidget.time = utils.numberToHour(value);

    //console.log(thisWidget.time);

  }
  isValid(value){
    return (value);
  }
  renderValue(){
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.time;
  }
}
export default HourPicker;