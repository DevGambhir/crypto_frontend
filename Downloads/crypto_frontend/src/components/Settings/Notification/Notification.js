import React, {useState} from 'react'
import { Checkbox } from 'antd';

function Notification() {

  const [isChecked, setIsChecked] = useState(false);




  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);

    setIsChecked(prev => !prev)
  };


  return (
    <div className="bg-white rounded-[10px] p-[30px] w-[700px] ">

      <div>
        <Checkbox value={isChecked} onChange={onChange}>Send appointment confirmation emails from Paperbell</Checkbox>

        <p className=' text-sm text-gray-500 ml-5 mt-3'>
          Calendar invitations will be sent directly from your calendar provider. If you'd like a Paperbell confirmation email to be sent to you and your clients as well, check this box.
        </p>

      </div>





    </div>
  )
}

export default Notification
