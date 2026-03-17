import './App.css'
import Header from './header'
import Aside from './aside'
import MainComponent from './main.component'
import Footer from './footer'

function App() {
  
  return (
    <>
      <Header />
      <div className="contenidoApp">
        <Aside />
        <MainComponent />
      </div>
      <Footer />
    </>
  );
}

export default App
