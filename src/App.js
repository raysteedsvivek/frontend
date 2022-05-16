import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from './components';
import AddEmployee from './components/add';
import EditEmployee from './components/edit';
import ViewEmployee from './components/view';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<EmployeeList />}></Route>
        <Route exact path="/add" element={<AddEmployee />}></Route>
        <Route exact path="/edit/:id" element={<EditEmployee />}></Route>
        <Route exact path="/view/:id" element={<ViewEmployee />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
