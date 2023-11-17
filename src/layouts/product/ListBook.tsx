import React, { useEffect, useState } from "react";
import { BookProps } from "./component/BookProps";
import Book from "../../models/Book";
import BookModel from "../../models/Book";
import { findBooksByName, getBooks } from "../../api/BookAPI";
import { Pagination } from "../utils/Pagination";

interface ListBookInterface {
  search: string;
  categoryId: number;
}

export const ListBook: React.FC<ListBookInterface> = (props) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    props.search || props.categoryId !== 0
      ? findBooksByName(props.search, props.categoryId, currentPage - 1)
          .then((searchData) => {
            setBooks(searchData.result);
            setTotalPages(searchData.totalPages);
            setLoading(false);
          })
          .catch()
      : getBooks(currentPage - 1)
          .then((booksData) => {
            setBooks(booksData.result);
            setTotalPages(booksData.totalPages);
            setLoading(false);
          })
          .catch((error) => setError(error.message));
  }, [currentPage, props.search, props.categoryId]);

  if (isLoading) {
    return <h1>Is loading ...</h1>;
  }

  if (error !== null) {
    return <h1>Error!!! {error}</h1>;
  }
  const paginate = (page: number) => {
    setCurrentPage(page);
  };
  if (books.length === 0) {
    return (
      <div className="container">
        <div className="d-flex align-items justify-content-center">
          <h1 className="mt-5 mb-5">Cannot find anything</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row mt-4 mb-4">
        {books.map((book) => (
          <BookProps book={book} key={book.bookId} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};
