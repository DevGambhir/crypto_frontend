import React,{useState} from 'react';
import { Button } from 'antd';



  

function PrimaryButton({ title }) {

    const [loadingButton, setLoadingButton] = useState([]);

    const enterLoading = (index) => {
        setLoadingButton((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
    
        setTimeout(() => {
          setLoadingButton((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
          });
        }, 1000);
      };


  return (
    <Button
    type="primary"
    htmlType='submit'
    className="w-full"
    loading={loadingButton[0]}
    onClick={() => enterLoading(0)}
    style={{ fontSize: '16px', fontWeight: 600, height: "40px", borderRadius:'8px'}}
  >
    {title}
  </Button>
  )
}

export default PrimaryButton;
