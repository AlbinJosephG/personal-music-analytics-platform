import Navbar from "../components/Navbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;