import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateCategory from '../components/CategorgModel/UpdateCategory.js';
import DeleteCategory from '../components/CategorgModel/DeleteCategory.js';
import AddCategoryModal from '../components/CategorgModel/AddCategoryModal.js';
import Dashboard from './dashboard.js';
import { FaEdit, FaTrash } from 'react-icons/fa/index.esm.js'; 


function Category() {
  const [categories, setCategories] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // New state for the Add Category modal
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://localhost:8000/category')
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  const filteredCategories = categories.filter((category) =>
    category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCategory = (deletedCategoryId) => {
    
    setCategories(categories.filter(category => category._id !== deletedCategoryId));
    setShowDelete(false); 
  };

  const handleUpdateCategory = () => {
    fetchCategories(); 
    setShowUpdate(false);
  };

  const handleAddCategory = () => {
    fetchCategories();
    setShowPopup(false);
  };
  return (
    <div>
      {showUpdate && (
        <UpdateCategory
          open={() => setShowUpdate(false)}
          categoryId={selectedCategoryId}
          onUpdate={handleUpdateCategory}
        />
      )}
      {showDelete && (
        <DeleteCategory
          openDelete={() => setShowDelete(false)}
          categoryId={selectedCategoryId}
          onDelete={handleDeleteCategory}
        />
      )}

<div className='flex'>
        <Dashboard />
        <div className='h-full w-full ml-56 mt-14 mb-10'>
          <div className='p-6 gap-4'>
            <div className='flex justify-between'>
              <div className='flex justify-start mb-3'>
                <input
                  type='text'
                  placeholder='Search by name'
                  className='ml-4 p-1 rounded border text-black border-gray-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <p className='text-white font-bold border rounded py-2 px-2 bg-yellow-500 ms-4'>
                  {filteredCategories.length} categories found
                </p>
              </div>
              <div className='flex justify-end mb-3 mr-4'>
                <button
                  onClick={() => setShowPopup(true)}
                  className='bg-yellow-500 text-white font-bold py-2 px-3  rounded'
                >
                  Add category
                </button>
              </div>
            </div>

            <table className='table flex items-center justify-center font-bold bg-zinc-800 text-center w-full'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr
                    key={category._id}
                    className={
                      index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                    }
                  >
                    <td>{category.name}</td>
                    <td>
                    <img src={`/uploads/usersImages/${category.categoryImage}`} alt={category.name} className="w-16 h-16 object-cover rounded-full" />
                    </td>
                    <td>
                      <div className='flex items-center justify-center space-x-4'>
                        <div className='bg-yellow-500 rounded'>
                          <button
                            className='text-white font-bold py-1 px-2'
                            type='button'
                            onClick={() => {
                              setSelectedCategoryId(category._id);
                              setShowUpdate(true);
                            }}
                          >
                           <FaEdit className="w-5 h-5" />
                          </button>
                        </div>
                        <div className='bg-yellow-500 rounded'>
                          <button
                            className='text-white font-bold py-1 px-2'
                            type='button'
                            onClick={() => {
                              setSelectedCategoryId(category._id);
                              setShowDelete(true);
                            }}
                          >
                           <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddCategoryModal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}

export default Category;
