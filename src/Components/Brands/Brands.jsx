import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true); 

  async function getBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="my-4">
      <h1 className="text-3xl font-semibold mb-4">Brands</h1>
      {loading ? <Spinner /> :
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands?.map((brand) => (
          <Link key={brand._id} to={`/brandsItem/${brand._id}`} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={brand.image} 
              alt={brand.name}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-center text-gray-700">{brand.name}</p>
          </Link>
        ))}
      </div>}
    </div>
  );
};

export default Brands;
