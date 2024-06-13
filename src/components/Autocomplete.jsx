import React, { useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'
import Suggestionlist from './Suggestionlist'

import debounce from 'lodash/debounce'

const Autocomplete = ({
    placeholder,
    customLoading='Loading...',
    staticData,
    fetchSuggestions,
    dataKey,
    customStyles,
    onSelect,
    inputref,
    onchange,
    onChange=()=>{}
}) => {

    const [inputValue,setInputValue]=useState('')
    const [suggestions,setSuggestions]=useState([])
    const [loading,setLoading]=useState(false)
    const [notFound, setNotFound] = useState(false);
    
    console.log(suggestions)

    const inputChangeRef = useRef(true);

    const handleCHange=(e)=>{
        inputChangeRef.current = true;
        setInputValue(e.target.value)
        
    }

    const getSuggestions=async(query)=>{
        setLoading(true)
        try {
            let result;
            if(staticData){
                result=staticData.filter((item)=>{
                    return item.toLowerCase().includes(query.toLowerCase())
                    
                })
                
            }else if(fetchSuggestions){
                result =await fetchSuggestions(query)
                
            }
            setSuggestions(result)
            setNotFound(result.length === 0 && query.trim() !== '');
        } catch (error) {
            console.log(error)
            setSuggestions([])
        }
        finally{
            setLoading(false)
        }
    }

    
    const handleonselectclick=(suggestion)=>{
      
            const selectedval=dataKey?suggestion[dataKey]:suggestion
            setInputValue(selectedval)
            setSuggestions([])
            inputChangeRef.current=false
            onSelect(suggestion)
            setNotFound(false)
            localStorage.setItem('inputval',selectedval)

            
    }

    const handleClear=()=>{
        setInputValue('')
        setSuggestions([])
        // setNotFound(false)
        inputref.current.focus()
        localStorage.removeItem('inputval')
        
    }
   
    
    const getSuggestionDebounce=useCallback(debounce(getSuggestions,300),[]);

   


   useEffect(()=>{
       if(inputValue.length>1 && inputChangeRef.current){
          getSuggestionDebounce(inputValue)
         
       }
       else{
        setSuggestions([])
        setNotFound(false);
       
       }
   },[inputValue])

  return (
    // <div className='container'>
    //     <input placeholder={placeholder} ref={inputref}  value={inputValue} onChange={handleCHange} style={customStyles} onFocus={onfocus} />
       
    //    {(suggestions.length>0 || loading || (inputValue.length > 1)) && (
    //      <ul className='suggestions-list'>
    //         {loading && <div className='loading'>{customLoading}</div>}

           
            
          
    //         <Suggestionlist suggestions={suggestions} dataKey={dataKey} highlight={inputValue} onSelectsuggestionclick={handleonselectclick}/>
            
    //      </ul>
    //      )
        
    //    }
       
        
        
      
    // </div>
    <div className="container">
    
    <input
        placeholder={placeholder}
        ref={inputref}
        value={inputValue}
        onChange={handleCHange}
        style={customStyles}
        
    />
    
    {inputValue && (<span className="clear-icon" onClick={handleClear}>X</span>)}
   
   
   
   {!loading && notFound && <div className='error'>No results found</div>}
    {(suggestions.length > 0 || loading ) && (
        
        <ul className="suggestions-list">
             {loading && <div className="loading">{customLoading}</div>}
            
            
            <Suggestionlist
                suggestions={suggestions}
                dataKey={dataKey}
                highlight={inputValue}
                onSelectsuggestionclick={handleonselectclick}
            />
            
        </ul>
    )}
</div>
  )
}

export default Autocomplete
