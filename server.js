
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const employeeSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  phoneNumber: String,
  email: String,
  department: String,
  dateOfJoining: Date,
  reportingPerson: String,
  experience: Number,
  salary: Number,
  linkedInLink: String,
});

const Employee = mongoose.model('Employee', employeeSchema);


app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.put('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
