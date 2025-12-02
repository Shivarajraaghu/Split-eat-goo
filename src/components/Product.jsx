
import React, { useState } from 'react';
import Button from './Button';

export default function Product() {
    let [product, setProduct] = useState({
        price: 399,
        name: "Biryani",
        imgUrl: "https://tse1.mm.bing.net/th/id/OIP.VWXqXKSJurj2QwSz8z5s1wHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3",
        qty: 1,
        Rating: 4.5
    })

    function handleInc() {
        setProduct((p) => ({ ...p, qty: p.qty + 1 }))

    }
    function handleDec(){
        setProduct((p)=>({...p,qty:(p.qty>1)?p.qty-1:qty}))
    }

   
    let {name, imgUrl, qty, Rating,price} = product;
    return (
        <>
            <div className="container-fluid mt-3 ">
                <div className="row">
                    <div className="col-4 m-auto">
                        <div className="card">
                            <div className="card-header">
                                <img src={imgUrl} alt="" className='container-fluid'/>
                            </div>
                            <div className="card-body text-center">
                                <h3>Product Name:-{name}</h3>
                                <h3>Product Price:-&#8377; {price}/-</h3>
                                <h3>Product Rating:-⭐{Rating}</h3>                              
                               <Button click={handleDec}>➖</Button>
                                <span className='h3 p-2'>{qty}</span>
                                <Button click={handleInc}>➕</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>)
}