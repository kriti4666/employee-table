import  { useEffect, useState } from 'react';
import { BASE_URL } from '../App';
import { toast } from 'react-toastify';


const UpdateUser = ({ closeModal, employeeId, updateEmployeeData }) => {
  const token = localStorage.getItem('token');

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    salary: 0,

  });

  const fetchSingleEmployeeData = async (employeeId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/single/employees/${employeeId.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch employee: ${response.status}`);
      }

      const data = await response.json();
      setEmployee(data);
      updateEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  




  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BASE_URL}/api/update/employees/${employeeId.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employee),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to update employee: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Updated Employee:', data.updatedEmployee);
      toast.success('Updated Successfully');
  
      await fetchSingleEmployeeData(employeeId);
  
      closeModal();
    } catch (error) {
      console.error('Error updating employee:', error);
  
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update employee. Please try again.');
      }
    }
  };


  useEffect(() => {
    fetchSingleEmployeeData(employeeId);
  }, [employeeId]);


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

                <h1 className="text-2xl font-bold mb-4">Update Users</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
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
              value={employee.email}
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
              value={employee.phone}
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
              value={employee.designation}
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
              type="number"
              id="salary"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

         

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update User
          </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;