import BlogTable from './BlogTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home(){
  const [data, setData] = useState();
  
  const getData = () => {
    axios.get(`${window.location.origin}/api`)
    .then(res => {
      if(res.data){
        setData(res.data);
      }
    })
    .catch(err => console.log("Error to get datas!"))
  }

  useEffect(() => {
    getData();
  },[]);

  return (
      <div >
        {data && <BlogTable rows = {data} setData = {setData} />}
      </div>
  );
}