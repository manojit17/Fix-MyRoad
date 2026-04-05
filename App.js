import { useState } from "react";
import NavBar     from "./components/NavBar";
import Footer     from "./components/Footer";
import HomePage   from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import MapPage    from "./pages/MapPage";
import Dashboard  from "./pages/Dashboard";
import AuthPage   from "./pages/AuthPage";

export default function App() {
  const [page,     setPage]     = useState("home");
  const [user,     setUser]     = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Navigate to a page and scroll to top */
  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e8eaf0" }}>

      <NavBar
        page={page}
        setPage={go}
        user={user}
        setUser={setUser}
        notifCount={user ? 2 : 0}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        {page === "home"      && <HomePage   setPage={go} />}
        {page === "report"    && <ReportPage setPage={go} />}
        {page === "map"       && <MapPage />}
        {page === "dashboard" && <Dashboard  user={user || { name: "Guest", role: "user" }} />}
        {page === "login"     && <AuthPage   mode="login"    setPage={go} setUser={setUser} />}
        {page === "register"  && <AuthPage   mode="register" setPage={go} setUser={setUser} />}
      </main>

      {/* Don't show footer on map page */}
      {page !== "map" && <Footer />}
    </div>
  );
}
