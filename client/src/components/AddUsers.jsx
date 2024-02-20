import  { useState } from 'react';
import { BASE_URL } from '../App';
import { toast } from 'react-toastify';

const AddUsers = ({ showModal, closeModal,fetchEmployeeData  }) => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    name: '',
    email:'',
    phone:' ',
    designation: '',
    salary: '',
  });

    //POST EMPLOYEE DATA
    const postEmployee = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/add/employees`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.error || 'Failed to add employee');
        }
  
        closeModal();
        toast.success('Employee Added');
  
        fetchEmployeeData();
      } catch (error) {
        console.error('Error adding employee:', error);
  
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error('Failed to add employee. Please try again.');
        }
      }
    };
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    postEmployee()
    e.preventDefault();
    

    console.log('Product:', data);
    closeModal();
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-96"> 
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
          >
            X
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-4">Add Employee</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone:
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="designation" className="block text-sm font-medium text-gray-600">
              Designation:
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={data.designation}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
              Salary:
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

         

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;