import React from 'react'

import './styles.css'

const Showdata = ({data}) => {

    const dataArray= Array.isArray(data)? data : [data]

  return (
    <div>
       {dataArray && dataArray.map((item,index)=>{
        return (
           <div key={index}>
            <p>{item.name}</p>
            <img className='item-image' src={item.image}/>
           </div>
        )
       })
       }
    </div>
  )
}

export default Showdata
