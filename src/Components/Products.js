import React, { useEffect, useState } from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';
function Products() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:4000/products");
    result =await result.json();
    setProduct(result);
  }

  const deletePro=async (id)=>{
    let result =await fetch(`http://localhost:4000/product/${id}`,{
      method:'delete',

    });
    result = await result.json();
    if(result){
      
      getProducts();
    }

  }

  const searchHandler =async (e)=>{
    let key = e.target.value;
   if(key){
    let result =await fetch(`http://localhost:4000/search/${key}`);
    result =await result.json();
    setProduct(result)
   }
   else{
    getProducts();
   }
  }
  return (
    <div className='h-screen flex flex-col bg-gradient-to-r w-full top-0 absolute from-cyan-400 to-blue-600'>
      <div>
        <Header />
      </div>

      <div className=' flex justify-center flex-col  items-center px-10'>
        <input onChange={searchHandler} className='w-full h-10 outline-none m-5 px-4 rounded-lg border border-slate-300' type='text' placeholder='Search Item'/>
        <p className='text-2xl font-bold mb-10'>Products List</p>

      <table class=' border w-full text-center ' >
        <thead>
        <tr >
          <th class=' border '>Sr No</th>
          <th class=' border '>Name</th>
          <th class=' border '>Brand</th>
          <th class=' border '>Category</th>
          <th class=' border '>Price</th>
          <th class=' border '>Oprations</th>
          </tr>
        </thead>
        
          {products.length ?
            products.map((items,index)=>
            <>
             <tbody>

             <tr>
              <td  class=' border '>{index+1}</td>

              <td class=' border '>{items.name}</td>
              <td class=' border '>{items.brand}</td>
              <td class=' border '>{items.category}</td>
              <td class=' border '>{items.price}</td>
              <td class=' border space-x-2'><button className='bg-[#FF0000] text-white px-5 py-1 my-1 rounded-lg' onClick={()=>deletePro(items._id)}>Delete</button>  <Link  className='bg-blue-400 text-white px-5 py-1 my-1 rounded-lg'  to={'/updateProduct/'+items._id}>Update</Link></td>
              </tr>
             </tbody>
            </>
            )
            :
            <h1 className='text-lg font-bold text-center flex items-center'>No Result Found</h1>
          }
       
      </table>


      </div>
    </div>
  )
}

export default Products;