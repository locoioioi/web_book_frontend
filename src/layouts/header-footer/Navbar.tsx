import React, { ChangeEvent, useEffect, useState } from "react";
import { NavbarSearch } from "../navbar-search/NavSearch";
import { findBookNavBar } from "../../api/BookAPI";
import BookModel from "../../models/Book";
import { Link, NavLink } from "react-router-dom";
interface NavbarInterface {
  search: string;
  setSearch: (name: string) => void;
}
export const Navbar: React.FC<NavbarInterface> = (props) => {
  const handleSearch = () => {
    props.setSearch(searchBox);
    setSearchBox("");
  };
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchBox, setSearchBox] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    findBookNavBar(searchBox)
      .then((booksData) => {
        setBooks(booksData.result);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [searchBox]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Bookstore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to={"/"}>
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Thể loại sách
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    All
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/1"}>
                    Thể loại 1
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/2"}>
                    Thể loại 2
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/3"}>
                    Thể loại 3
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Quy định bán hàng
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Quy định 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="d-flex position-relative">
          <input
            className="form-control me-2"
            value={searchBox}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchBox(e.target.value);
            }}
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            onClick={() => {
              handleSearch();
            }}
            tabIndex={0}
            type="submit"
          >
            Search
          </button>
          <ul className="position-absolute top-100 p-0 mt-1">
            {searchBox !== "" &&
              books.map((book) => (
                <NavbarSearch book={book} key={book.bookId} />
              ))}
          </ul>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>

        {/* Biểu tượng đăng nhập */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
