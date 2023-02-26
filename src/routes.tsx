import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Movie from "./pages/Movie";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Error from "./pages/Error";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
