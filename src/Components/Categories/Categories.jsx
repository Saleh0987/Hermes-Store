import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); 

    async function getCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-4">
      <h1 className="text-2xl lg:text-3xl font-semibold my-4 text-center lg:text-start">
        Categories
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              to={`/categoriesitems/${category._id}`}
              key={category._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[250px] mb-2"
              />
              <p className="text-center text-gray-700">{category.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
