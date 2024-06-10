import React from 'react'
import './styles.css'

const Suggestionlist = ({
    suggestions=[],
    highlight,
    onSelectsuggestionclick,
    dataKey,}) => {

   
        const highlightedtext=(text,highlight)=>{
            const parts= text.split(new RegExp(`(${escapeRegExp(highlight)})`,'gi'))

            return (
                <span key={highlight} >
                    {parts.map((part)=>{
                        return part.toLowerCase()===highlight.toLowerCase()?
                        <b style={{color:"blue"}}>{part}</b> : part

                    })}
                </span>
            )
           
         }

         const escapeRegExp = (string) => {
          return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };

  return (
    <div className=''>
       {suggestions.map((suggestion,index)=>{
         const currSuggestion= dataKey? suggestion[dataKey]: suggestion;

         return (
            <li className='suggestion-item' key={index} onClick={()=>onSelectsuggestionclick(suggestion)} >
                 {highlightedtext(currSuggestion,highlight)}
            </li>
         )

       })}
    </div>
  )
}

export default Suggestionlist
