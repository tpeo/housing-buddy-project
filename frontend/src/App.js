import SubmissionForm from './src/SubmissionForm';
import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/SubmissionForm" element={<SubmissionForm/>}></Route>
    </Routes>
  );
}

export default App;
