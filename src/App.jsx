import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
//login component
import AdminDashboard from './components/AdminDashboard';
import Form from "d:/Final Project/final-project/src/components/form";
import Services from "./components/Service";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="/components/adminDashboard" element={<AdminDashboard />} />
        <Route path="/form" element={<Form />} /> {/* Form page */}
        <Route path="/service" element={<Services/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
