import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Autocomplete from './components/Autocomplete'
import Showdata from './components/Showdata'
import './components/styles.css'
import Footer from './components/Footer'

function App() {

  const staticData=["apple","banana","grape"]

  const [data,setData]=useState([])

  const inputref=useRef(null)
   
const fetchSuggestions=async(query)=>{
  try {
    const response= await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
    if(!response.ok){
       throw new Error('Network response not ok')
    }
    const result = await response.json()
    return result.recipes;
    

  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
   inputref.current.focus()
},[])

  return (
  
    <>
     <div className='container-box'>
              <center><h1>Type for AutoSuggestion</h1></center>
            
             <Autocomplete placeholder={'Search here'} 
              // staticData={staticData} 
              
              fetchSuggestions={fetchSuggestions}
               dataKey={'name'} 
              onSelect={(res)=>{console.log(res),setData(res)}}
              customLoading={"Loading..."}
              onchange={()=>{}}
              customStyles={{}}
              inputref={inputref}/>

    <div className='showdata'>
        <Showdata data={data}/> 
    </div>
       
          <span className='footer'>
             <Footer/> 
          </span>
        
    </div>
    
    </>
  )
}

export default App
