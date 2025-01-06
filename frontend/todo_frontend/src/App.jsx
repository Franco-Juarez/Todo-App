import './App.css'
import Header from './components/Navbar/Header';
import MainContent from './components/MainContent';
import SideBarMenu from './components/Navbar/SideBarMenu';
import { ModalProvider } from './context/ModalContext';

const App = () => {

  return ( 
    <ModalProvider>
      <div className="grid lg:grid-cols-12 lg:grid-rows-12 gap-4 p-4 min-h-screen">
        <div className="hidden lg:block lg:row-span-12 bg-slate-50 rounded-md">
          <SideBarMenu />
        </div>
        <div className="col-span-12 lg:col-span-11 flex items-center bg-white shadow-md rounded-md p-4">
          <Header />
        </div>
        <div className="col-span-12 lg:col-span-11 lg:row-span-11 lg:col-start-2 lg:row-start-2 bg-slate-50 p-4 rounded-md">
          <MainContent />
        </div>
      </div>
    </ModalProvider>
  );
};

export default App;

