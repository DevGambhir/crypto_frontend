import React from 'react'
import { useEffect, useState } from 'react';

export default function Alert(props) {

    

   function captialize(word){
        if(word === "danger"){
            word= "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }


    return (

        <div style={{height: '50px'}}>
        {props.alert &&
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} id="alertMessage" role="alert">
                <strong>{captialize(props.alert.header)}</strong> : <strong>{props.alert.msg}</strong>
                
            </div>}
        </div>
    )
}