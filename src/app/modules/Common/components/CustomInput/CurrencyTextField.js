//npm i react-text-mask react-number-format --save

import React from 'react'
import NumberFormat from 'react-number-format';


function CurrencyTextField(props) {
    const { inputRef, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        
        value={2456981} displayType={'text'} thousandSeparator={true} prefix={'฿'}
      />
    );
  }

export default CurrencyTextField
