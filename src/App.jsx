import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {

  return (
    <>
        <Navbar />
        <RegisterForm/>
        <Footer/>
    </>
  )
}

export default App
