import React from 'react';

import './Input.css';

const Input = (props) => {
    let inputElement = null;
    switch(props.type){
        case 'input':
            if(props.light){
                inputElement =  <input className="Input--2" {...props.elementConfig} value={props.value} onChange={props.changed} />
            }
            else{
                inputElement =  <input className="Input" {...props.elementConfig} value={props.value} onChange={props.changed} />
            }
            break;
        case 'select':
            if(props.light){
                inputElement =  (
                    <select className="Input--2" value={props.value} onChange={props.changed}>
                        {props.elementConfig.option.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>{option.displayValue}</option>
                        ))}
                    </select>
                )
            }
            else{
                inputElement =  (
                    <select className="Input" value={props.value} onChange={props.changed}>
                        {props.elementConfig.option.map(option => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>{option.displayValue}</option>
                        ))}
                    </select>
                )
            }
            break;
        case 'textarea':
            if(props.light){
                inputElement = <textarea className='Input--textarea2' {...props.elementConfig} value={props.value} onChange={props.changed} />

            }
            else{
                inputElement = <textarea className='Input--textarea' {...props.elementConfig} value={props.value} onChange={props.changed} />
            }
            break;
        default:
            return <input className="Input" {...props.elementConfig} value={props.value} onChange={props.changed} />
    };

    return(
        <div>
            {inputElement}
        </div>
);}

export default Input;