import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from 'axios'



const Home = () => {
    const [query, setQuery] = useState('')
    const [container, setContainer] = useState([])
    const [endpoint, setEndPoint] = useState('')
    
    const onChangeHandler = (e) => {
      setQuery(e.target.value)
      console.log (query)
    }
    
    const onSubmitHandler = ((e) => {
      e.preventDefault()
      console.log(query)
      // something()
      const options = {
          method: 'GET',
          url: 'https://house-plants2.p.rapidapi.com/search',
          params: {query: `${query}`},
          headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
            'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
          }
        };
        
        axios.request(options)
        .then(function (response) {
          console.log(response.data)
          return response;
        })
        .then(response => {
          console.log(response)
          if (!Array.isArray(response.data)) {
            throw new Error (response.data)
          }
          setContainer(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });
      })
    return (
    <div> 

    <form onSubmit={onSubmitHandler} class="relative">
        <input type="text" placeholder="Search plants" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        />
        <button  type="submit" class="bg-[#f5ba13] text-sm" >Submit</button>
      </form>

      <div class=" grid grid-cols-4 gap-2 "> 
      {container.map(({item},index) => {
        return (
          <div key={index}  >

          
            <p class=" items-center  text-center p-4 bg-[#41855C] pt-3 border-2 shadow-lg shadow-slate-200 rounded-xl">
              
              <img src = {item.Img}/>
              <br/>
              
            <h1 class="font-bold  text-lg">
             {item ['Common name']} 

            </h1>
             
          
          <p class="">

            {item['Light ideal']}
          </p>
  
             {item.Watering} 
            </p>
          </div>
        )
      })}
                </div>
    </div>
  )
}

export default Home