import React, { useEffect } from 'react';
import { useState } from 'react';
const Delivery = (props) => {
    const [state, setState] = useState({});
    const [refresh, setRefresh] = useState(false)
    useEffect( () => {
        (async () => {
            const responce = await fetch(`http://localhost:8000/deliveries/${props.id}/status`);
            const data = await responce.json();
            setState(data);
        })()
    }, [refresh]);

    const submit = async (e, type) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const responce = await fetch('http://localhost:8000/event',{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            type,
            data,
            delivery_id:state.id
          })
        });
        if(!responce.ok){
            const {detail} = await responce.json();
            alert(detail);
            return;
        }

        setRefresh(!refresh);
    }
    return (
        <div className='row w-100'>
            <div className='col-12 mb-4'>
                <h4 className='fw-bold text-white'>Delivery {state.id}</h4>
            </div>
            <div className='col-12 mb-5'>
                <div className='progress'>
                    {state.status !== 'ready' ? 
                        <div className={state.status === 'active' ? 'progress-bar bg-success progress-bar-striped progress-bar-animated': 'progress-bar bg-success'}
                            role='progressbar' style={{width: '50%'}}
                    ></div> : ''}
                    {state.status === 'collected' || state.status === 'completed' ?
                        <div className={state.status === 'collected' ? 'progress-bar bg-success progress-bar-striped progress-bar-animated': 'progress-bar bg-success'}
                            role='progressbar' style={{width: '50%'}}
                    ></div> : ''}
                </div>
            </div>

            <div className='col-3'>
                <div className='card'>
                    <div className='card-header'>
                        Start delivery
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "START_DELIVERY")}>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='col-3'>
                <div className='card'>
                    <div className='card-header'>
                        Increase budget
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "INCREASE_BUDGET")}>
                        <div className='input-group mb-3'>
                            <input type='number' name='budget' className='form-control' placeholder='Budget'/>
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='col-3'>
                <div className='card'>
                    <div className='card-header'>
                        Pickup Products
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "PICKUP_PRODUCTS")}>
                        <div className='input-group mb-3'>
                            <input type='number' name='purchase_price' className='form-control' placeholder='Purchase Price'/>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='number' name='quantity' className='form-control' placeholder='Quantity'/>
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='col-3'>
                <div className='card'>
                    <div className='card-header'>
                        Deliver Products
                    </div>
                    <form className='card-body' onSubmit={e => submit(e, "DELIVER_PRODUCTS")}>
                        <div className='input-group mb-3'>
                            <input type='number' name='sell_price' className='form-control' placeholder='Purchase Price'/>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='number' name='quantity' className='form-control' placeholder='Quantity'/>
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
            <code className='col-12 mt-4'>
                {JSON.stringify(state)}
            </code>
        </div>
    );
};

export default Delivery