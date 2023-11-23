import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Movies from "./components/Movies/Movies";
import TvShows from "./components/TvShows/TvShows";
import Details from "./components/Details/Details";

function App() {
  const [category, setCategory] = useState("movie");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage setCategory={setCategory} />} />
        <Route path="/movies" element={<Movies setCategory={setCategory} />} />
        <Route
          path="/tvshows"
          element={<TvShows setCategory={setCategory} />}
        />
        <Route path="/:id" element={<Details category={category} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
