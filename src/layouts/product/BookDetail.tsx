import React, { useEffect, useState } from "react";
import BookModel from "../../models/Book";
import { useParams } from "react-router-dom";
import { getBookById } from "../../api/BookAPI";
import { ImagesPerBook } from "./component/ImagesPerBook";
import { BookReview } from "./component/BookReview";
import { rendering } from "../utils/StarRender";
import formatNum from "../utils/FormatNumber";

export const BookDetail: React.FC = () => {
  const [book, setBook] = useState<BookModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (quantity < book?.stockQuantity!) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
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
  }, [bookIdNumber, quantity]);

  if (error) {
    return <div className="container">Error !!!</div>;
  }
  if (!book) {
    <div className="">this book not exist</div>;
  }
  function handleQuantity(event: React.ChangeEvent<HTMLInputElement>): void {
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= book?.stockQuantity!
    ) {
      setQuantity(newQuantity);
    } else {
      setQuantity(1);
    }
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
              <h2>Name: {book?.name}</h2>
              <h4>{rendering(book?.avgRating ? book.avgRating : 0)}</h4>
              <h3>Price: {formatNum(book?.salePrice!)}</h3>
              <hr />
              {book?.description}
              <hr />
            </div>
            <div className="col-4">
              <p>Quantity</p>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => {
                    decreaseQuantity();
                  }}
                >
                  -
                </button>

                <input
                  type="number"
                  className="form-control text-center"
                  min={1}
                  onChange={handleQuantity}
                  value={quantity}
                />

                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => {
                    increaseQuantity();
                  }}
                >
                  +
                </button>
              </div>
              <div className="mb-2">
                <h4>
                  Price:{" "}
                  <span>{formatNum(book?.listedPrice! * quantity)} đ</span>
                </h4>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary mt-3"
                  onClick={() => {}}
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-1"
                  onClick={() => {}}
                >
                  Buy Now
                </button>
              </div>
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
