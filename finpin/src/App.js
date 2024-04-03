import React, { useState, useEffect } from 'react';
import './App.css';

const EmployeeForm = ({ onAddEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    dob: '',
    phoneNumber: '',
    email: '',
    department: '',
    dateOfJoining: '',
    reportingPerson: '',
    experience: '',
    salary: '',
    linkedInLink: '',
    governmentProof: '',
  });

  const [view, setView] = useState('view');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (view === 'view') {
      fetchEmployees();
    }
  }, [view]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(employeeData);
    setEmployeeData({
      fullName: '',
      dob: '',
      phoneNumber: '',
      email: '',
      department: '',
      dateOfJoining: '',
      reportingPerson: '',
      experience: '',
      salary: '',
      linkedInLink: '',
      governmentProof: '',
    });
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Full Name:
            <input type="text" name="fullName" value={employeeData.fullName} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Date of Birth:
            <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={employeeData.phoneNumber} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Department:
            <input type="text" name="department" value={employeeData.department} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Date of Joining:
            <input type="date" name="dateOfJoining" value={employeeData.dateOfJoining} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Reporting Person:
            <select name="reportingPerson" value={employeeData.reportingPerson} onChange={handleChange}>
              <option value="manager1">Manager 1</option>
              <option value="manager2">Manager 2</option>
              <option value="manager3">Manager 3</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Experience (in months):
            <input type="number" name="experience" value={employeeData.experience} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Salary:
            <input type="number" name="salary" value={employeeData.salary} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            LinkedIn Link:
            <input type="text" name="linkedInLink" value={employeeData.linkedInLink} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>
            Upload Government Proof:
            <input type="file" name="governmentProof" onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

const EmployeeView = ({ employees, onDeleteEmployee }) => {
  return (
    <div className="table-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Reporting Person</th>
            <th>Experience (Months)</th>
            <th>Salary</th>
            <th>LinkedIn Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employeeId}</td>
              <td>{employee.fullName}</td>
              <td>{employee.dob}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.reportingPerson}</td>
              <td>{employee.experience}</td>
              <td>{employee.salary}</td>
              <td>{employee.linkedInLink}</td>
              <td>
                <button onClick={() => onDeleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('view');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (view === 'view') {
      fetchEmployees();
    }
  }, [view]);

  const handleAddEmployee = async (employeeData) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      setEmployees([...employees, data]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
    <button className={view === 'view' ? 'active' : ''} onClick={() => setView('view')}>
      View Employee
    </button>
    <button className={view === 'add' ? 'active' : ''} onClick={() => setView('add')}>
      Add Employee
    </button>
    {view === 'add' && <EmployeeForm onAddEmployee={handleAddEmployee} />}
    {view === 'view' && <EmployeeView employees={employees} />}
  </div>
  );
};

export default App;
