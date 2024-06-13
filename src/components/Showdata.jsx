import React from 'react'

import './styles.css'

const Showdata = ({data,setData}) => {

  


  const handleCleardata=()=>{
    setData([])
  }

    const dataArray= Array.isArray(data)? data : [data]

  return (
    <>
      <div>
       {dataArray && dataArray.map((item,index)=>{
        return (
          <>
            <div className='showdata'>
            <div key={index}>
            <p>Name : {item.name}</p>
            <img className='item-image' src={item.image} alt={'Loading image..'}/> 
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
