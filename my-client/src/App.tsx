import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import conf from './conf';

function App() {
  const [bookList, setBookList] = useState([])
  useEffect(()=> {
    const fetchData = async() => {
      const result = await axios.get(`${conf.apiPrefix}/books`)
      setBookList(result.data.data)
    }
    fetchData()  
  }, [])
  return (    
    <div>
      <ul>
        {bookList.map((book: any) => <li>{book.attributes.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
