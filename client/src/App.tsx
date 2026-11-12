
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Organizations from "./pages/Organizations";
import Categories from "./pages/Categories";
import Cities from "./pages/Cities";
import OrganizationDetails from "./pages/OrganizationDetails";
import About from "./pages/About";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<OrganizationDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
