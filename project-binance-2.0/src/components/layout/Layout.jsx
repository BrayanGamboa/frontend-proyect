import { Outlet } from 'react-router-dom';
import { Header }  from './Header';
import { Sidebar } from './Sidebar';
import { Footer }  from './Footer';
import './Layout.css';

export function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
