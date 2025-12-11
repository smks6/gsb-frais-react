import './App.css';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from "./components/PrivateRoute";
import FraisForm from './components/FraisForm';
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './components/FraisEdit';
import FraisHorsForfait from './components/FraisHorsForfait';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
          />
          <Route path="/fraisadd" element={<FraisForm />}/>
          <Route path="/frais/ajouter" element={<FraisAdd />} />
          <Route path="/frais/modifier/:id" element={<FraisEdit />} />
          <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;