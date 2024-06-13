import React, { useState } from 'react'

import './styles.css'

const Showdata = ({data,setData,datakey=['name']}) => {

  


  const handleCleardata=()=>{
    setData([])
  }

  
    console.log('before',data)
    const dataArray= Array.isArray(data)? data : [data]
    console.log('data array after',dataArray)

  return (
    <>
      <div>
       {dataArray && dataArray.map((item,index)=>{
        return (
          <>
            <div key={index}  className='showdata'>
            <div>
            <p>   Name : {item[datakey]}</p>
            <img className='item-image' src={item.image} alt={'Loading image..'} /> 
            <p>&#9733;{item.rating}</p>
           </div>
           
            <span className='cleardata' onClick={handleCleardata}>Clear Data</span>
            </div>
           
          </>
        )
       })
       }
    </div>
   
    </>
  )
}

export default Showdata
