import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import FindCourse from "./pages/FindCourse";
import Events from "./pages/Events";
import Scholarships from "./pages/Scholarships";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-course" element={<FindCourse />} />
          <Route path="/events" element={<Events />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
