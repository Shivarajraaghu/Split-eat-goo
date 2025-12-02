import React from 'react'

export default function Button(props) {
    console.log(props.children);
    let{click,children}=props;
  return (
    <>
     <button className='btn btn-danger' onClick={click}>{children}</button>
    </>
  )
}
