import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import FindCourse from "./pages/FindCourse";
import Events from "./pages/Events";
import Scholarships from "./pages/Scholarships";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Enquiries from "./pages/admin/Enquiries";
import AdminCourses from "./pages/admin/Courses";
import AdminEvents from "./pages/admin/Events";
import BlogPosts from "./pages/admin/BlogPosts";
import Subscribers from "./pages/admin/Subscribers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-course" element={<FindCourse />} />
          <Route path="/events" element={<Events />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin panel */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/blog" element={<BlogPosts />} />
          <Route path="/admin/subscribers" element={<Subscribers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}