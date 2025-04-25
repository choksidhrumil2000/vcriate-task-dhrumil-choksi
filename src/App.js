import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [productsData,setProductsData] = useState([]);
  const [filteredProductsData,setFilteredProductsData] = useState([]);

  useEffect(()=>{

    fetch('https://dummyjson.com/products')
    .then((res)=>res.json())
    .then((data)=>{
      setProductsData(data.products)
      setFilteredProductsData(data.products)
    })
    .catch((err)=>console.error('Products Fetch Failed!!',err));

  },[]);
  return (
    <div className={`d_flex`} style={{height:'100vh'}}>
      {/* SideBar */}
      <div className={`d_flex sidebar_main_div`} style={{maxWidth:'30%'}}>
        <Sidebar productsData={filteredProductsData} />
      </div>
      {/* FLow Editor */}
      <div style={{width:'70%'}}>

      </div>
    </div>
  );
}

export default App;
