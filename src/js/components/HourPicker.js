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
    console.log(thisWidget.dom.output);
    //thisWidget.parseValue();
    //thisWidget.isValid();
    //thisWidget.renderValue();
    thisWidget.initPlugin();

    thisWidget.value = thisWidget.dom.input.value;
    console.log(thisWidget.value);

  }
  initPlugin(){
    const thisWidget = this;
    rangeSlider.create(thisWidget.dom.input);
    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = thisWidget.dom.input.value;
    });
  }
  parseValue(value){
    const thisWidget = this;
    thisWidget.time = utils.numberToHour(value);
    console.log(thisWidget.time);

  }
  isValid(value){
    return (value);
  }
  renderValue(){
    const thisWidget = this;
    //return thisWidget.time;
    thisWidget.dom.output = thisWidget.value;
  }
}
export default HourPicker;