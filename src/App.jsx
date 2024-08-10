import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import Events from "./pages/Events"
import Navbar from "./components/Navbar"
import "./App.css"

function Logout() {
  localStorage.clear()
  return <Navigate to='/' />
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />

}

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <div className="container"> */}

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/events/create" element={<Events purpose="create"/>}  />
            <Route path="/events/edit/" element={<Events purpose="update"/>}  />
            <Route path="*" element={<NotFound />} />

          </Routes>
        {/* </div> */}
      </BrowserRouter>

    </>
  )
}

export default App
