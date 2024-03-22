import React from 'react'
import {Spin} from 'antd';

export default function Loader() {
  return (
    <div className='loader' style={{display:"flex",alignItems:"center"}}>
        <Spin/>
      
    </div>
  )
}
