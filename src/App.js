import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext.js";
import { NotificationProvider } from "./components/Notifications/NotificationContext.jsx";

// Componentes importados
import Navbar from "./components/Navbar/Navbar.jsx";
import DriverDetailPage from "./components/DriverDetailPage/DriverDetailPage.jsx";
import Threads from "./components/Forum/Threads.jsx";
import ThreadMessages from "./components/Forum/ThreadMessages.jsx";
import RaceResult from "./components/Results/RaceResult.jsx";
import QualifyingResults from "./components/Results/QualifyingResults.jsx";
import SprintResults from "./components/Results/SprintResults.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CreateThread from "./components/Forum/CreateTread.jsx";
import UpdateUserForm from "./components/UserControllers/UpdateUserForm.jsx";
import DeleteUserForm from "./components/UserControllers/DeleteUserForm.jsx";
import LapTimes from "./components/LapTime/LapTimes.jsx";

// Páginas importadas
import Home from './pages/Home.js';
import About from "./pages/About.js";
import PosicionesPilotos from "./pages/posiciones/PosicionesPiloto.js";
import PosicionesConstructores from "./pages/posiciones/PosicionesConstructores.js";
import Login from "./pages/Login.js";
import Registration from "./pages/Registration.js";
import ConstructorDetailPage from "./components/ConstructorDetailPage/ConstructorDetail.jsx";
import RaceCalendar from "./components/RaceCalendar/RaceCalendar.jsx";
import CircuitDetail from "./components/CircuitDetail/CircuitDetail.jsx";
import UserProfile from "./pages/Profile.js";
import ForumPage from "./pages/forum/ForumPage.js";

// CSS formularios
import './Styles/Forms.css';
import './App.css';

// Componente de notificaciones
import Notification from "./components/Notifications/Notification.jsx";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div id="root">
            <Navbar />
            <Notification />
            <div className="container-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="standings/drivers" element={<PosicionesPilotos />} />
                <Route path="standings/constructors" element={<PosicionesConstructores />} />
                <Route path="/drivers/:driverId" element={<DriverDetailPage />} />
                <Route path="/constructor/:constructorId" element={<ConstructorDetailPage />} />
                <Route path="/calendar" element={<RaceCalendar />} />
                <Route path="/circuit/:circuitId" element={<CircuitDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/forums" element= {<ForumPage/>}/>
                <Route path="/forums/:forumId" element= {<Threads/>}/>
                <Route path="/threads/:threadId" element= {<ThreadMessages/>}/>
                <Route path="/forums/:forumId/create" element= {<CreateThread/>}/>
                <Route path="/race-results/:gpNumber" element={<RaceResult />} />
                <Route path="/qualifying-results/:gpNumber" element={<QualifyingResults />} />
                <Route path="/sprint-results/:gpNumber" element={<SprintResults />} />
                <Route path="/delete-user" element={<DeleteUserForm />}/>
                <Route path="/update-user" element={<UpdateUserForm />}/>
                <Route path="/lapTimes" element={<LapTimes />}/>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
