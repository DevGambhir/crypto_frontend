import React, { useEffect, useState } from 'react';
import priceContext from '../context/PriceContext';
import { useContext } from 'react';
import millify from 'millify';
import { useNavigate } from 'react-router-dom';


export default function Watchlist() {

    const context = useContext(priceContext);
    const navigate = useNavigate();
    const { prices, getPrice, deletePrice, updatePrice, showAlert } = context;

    const [checkPrice, setcheckPrice] = useState({ checkamount: 0 });
    const [price, setPrice] = useState(' ');

    const [updateId, setupdateId] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('token')){
            
            getPrice();
            console.log(prices);
           
        }
        else{
            navigate('/login')
            showAlert(`Please login-in or Sign-up to view watchlist`, 'warning','Sorry')
        }
    },[])

   


    function onChange(e) {

        setcheckPrice({ ...checkPrice, [e.target.name]: e.target.value })
    }


    function handleChange(e) {
        e.preventDefault();
        updatePrice(updateId, checkPrice.checkamount);
        showAlert(`Check has been successfully generated for the ${name}`, 'primary', 'Checked')
    }

      
    useEffect(() => {
        prices?.forEach(element => {

            if (element.pricetag !== 0) {

                if (element.price > element.pricetag) {

                    var a = element.price - element.pricetag;
                    console.log(a);
                    showAlert(`The price of ${element.title} has been increased by ${millify((a * 100) / element.price)}% from the last checked value`, 'success', 'Profit')

                }
                else {
                    a = element.pricetag - element.price;
                    console.log(a);
                    showAlert(`The price of ${element.title} has been decreased by ${millify((a * 100) / element.price)}% from the last checked value`, 'danger', 'Loss')
                   
                }


            }
            
            else {
                return null;
            }
        });
     
    }, [ ])

    return (

        <>

            <button type="button" style={{ display: "none" }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add alert for {name}</h5>
                            <i type="button" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </i>


                        </div>
                        <div className="modal-body">
                            <form className=''>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Current price</label>
                                    <input type="text" className="form-control" id="currentPrice" name="currentPrice" aria-describedby="emailHelp" value={price} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Enter the threshold amount to keep a check</label>
                                    <input type="text" className="form-control" id="checkamount" name="checkamount" onChange={onChange} />
                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">
                            
                            
                                <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal" style={{ marginRight: "5px" }}>Close</button>
                                <button type="button" className="btn btn-primary btn-sm" data-bs-dismiss="modal" onClick={handleChange} >Save changes</button>

                            
                        </div>
                    </div>
                </div>
            </div>


            <div className="container" style={{ maxWidth: "85%", display: "block", margin: "auto", paddingTop: "5rem" }}>
                <table className="table table-striped shorttable">
                    <thead>
                        <tr>

                            <th style={{ scope: "col" }}>Name</th>
                            <th style={{ scope: "col" }}>Price (USD)</th>
                            <th style={{ scope: "col" }}>Marketcap</th>
                            <th style={{ scope: "col" }}>Change</th>
                            <th style={{ scope: "col" }}>Add/Remove a check</th>
                        </tr>
                    </thead>
                    <tbody>

                        {prices?.map((currency) => (

                            <tr key={currency._id}>

                                <td> <img src={currency.image} alt="Nothing" style={{ height: "23px", width: "23px", margin: "10px 0px" }} /> <span style={{ padding: "0px 0px 0px 5px" }}>{currency.title}</span> </td>
                                <td style={{ padding: "15px" }}>{millify(currency.price)}</td>
                                <td style={{ padding: "15px" }}>{millify(currency.marketCap)}</td>
                                <td style={{ padding: "15px" }}>{millify(currency.change)}%</td>

                                <td style={{ padding: "15px" }}>
                                    <i style={{paddingRight:"10px",cursor:"pointer"}}  className="fa-sharp fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setPrice(millify(currency.price)); setupdateId(currency._id); setName(currency.title) }}></i>

                                <i style={{paddingRight:"10px",cursor:"pointer"}} className="fa-solid fa-trash" onClick={() => { deletePrice(currency._id); showAlert(`${currency.title} has been deleted`, 'warning', 'Delete') }}></i>

                                {currency.pricetag!==0?<i style={{paddingLeft:"5px",height:"120%",cursor:"pointer"}}class="fa-sharp fa-solid fa-circle-xmark" onClick={()=>{ updatePrice(currency._id, 0)}}></i>:" "}

                                                              
                                </td>
                                
                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>
        </>

    )
}
