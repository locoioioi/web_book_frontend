import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./layouts/header-footer/Navbar";
import { Footer } from "./layouts/header-footer/Footer";
import { Homepage } from "./layouts/homepage/Hompage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./layouts/about/About";
import { BookDetail } from "./layouts/product/BookDetail";
import { RegisterPage } from "./layouts/user/Register";
import {ActivateAccount} from "./layouts/user/ActivateAccount";
import {Login} from "./layouts/user/Login";
import BookForm_Admin from "./layouts/admin/BookForm";
import { FavoriteBooks } from "./layouts/favorite/FavoriteBooks";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <BrowserRouter>
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
            <Route path="/" element={<Homepage search={search} />}></Route>
            <Route
                path="/:categoryId"
                element={<Homepage search={search} />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/book/:bookId" element={<BookDetail />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/activate/:email/:code" element={<ActivateAccount />}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
	          <Route path={"/admin/create-book"} element={<BookForm_Admin/>}></Route>
            <Route path={"/favorite-book"} element={<FavoriteBooks/>}></Route>
        </Routes>
         <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
