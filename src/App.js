import "./App.css"
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Header from "./components/models/header/Header";
import User from "./components/pages/user/User";
import axios from "./config/axios";
import { useState, useEffect } from "react";
import Alert from "./components/models/alert/Alert";
import Loader from "./components/models/loader/Loader";
import Page404 from "./components/pages/404/Page404";
import Save from "./components/pages/save/Save";


function AppContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const isLocation = () => location.pathname === '/login' || location.pathname === '/register'
  const [user, setUser] = useState('')
  const [loader, setLoader] = useState(false)
  const [visible, setVisible] = useState(false)
  const [alert, setAlert] = useState({
    title: '',
    message: '',
    type: '',
    click: null
  })

  function putAlert({ title, message, type, click }) {
    setAlert({ title, message, type, click: click ? click : () => setVisible(false) })
    setVisible(true)
  }

  const allStateProps = { user, setLoader, putAlert, setVisible, token, location, navigate }

  useEffect(() => {
    const _getInformation = async () => {
      try {
        if (token) {
          setLoader(true)
          axios.defaults.headers.common.Authorization = token
          const response = await axios.get(process.env.REACT_APP_PROFILE_URL)
          setLoader(false)
          if (response.data.message) {
            putAlert({
              title: response.data.title,
              message: response.data.message,
              click: () => {
                localStorage.removeItem('token')
                setVisible(false)
              }
            })
          }
          setUser(response.data)

        }
      }catch(e){
        putAlert({
          title:'Danger',
          message:'Sorry we have a problem with the server',
          click: () => {
            localStorage.removeItem('token')
            setVisible(false)
          }
        })
      }

    }
    _getInformation()
  }, [location, token])

  return (
    <>
      <Loader loader={loader} />
      <Alert type={alert.type ? alert.type : ''} title={alert.title} message={alert.message} visible={visible} onClick={alert.click} onClose={() => setVisible(false)} />
      {!isLocation() && <Header {...allStateProps} />}
      <Routes>
        <Route path="/" element={<Home {...allStateProps} />} />
        <Route path="/user" element={<User {...allStateProps} />} />
        <Route path="/login" element={<Login {...allStateProps} />} />
        <Route path="/register" element={<Register {...allStateProps} />} />
        <Route path="/save" element={<Save {...allStateProps} />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;