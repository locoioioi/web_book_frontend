import React, { useEffect, useState } from "react";
import BookModel from "../../models/Book";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/BookAPI";
import { ImagesPerBook } from "./component/ImagesPerBook";
import { BookReview } from "./component/BookReview";

export const BookDetail: React.FC = () => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const { bookId } = useParams();
  let bookIdNumber = 0;
  try {
    bookIdNumber = parseInt(bookId + "");
    if (Number.isNaN(bookIdNumber)) {
      bookIdNumber = 0;
    }
  } catch (err) {
    bookIdNumber = 0;
    console.log(err);
  }
  useEffect(() => {
    getBookById(bookIdNumber)
      .then((book) => {
        setBook(book);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [bookIdNumber]);

  if (error) {
    return <div className="container">Error !!!</div>;
  }
  if (!book) {
    <div className="">this book not exist</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ImagesPerBook bookId={bookIdNumber} />
        </div>
        <div className="col-8">
          <div className="row">
            <div className="col-8">
              Description
              <h2>Name: {book?.name}</h2>
              <h4>Rating: {book?.avgRating}</h4>
              <h3>Price: {book?.salePrice}</h3>
              <hr />
              {book?.description}
              <hr />
            </div>
            <div className="col-4">
              
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <h2>Review: </h2>
        <BookReview bookId={bookIdNumber} />
      </div>
    </div>
  );
};
