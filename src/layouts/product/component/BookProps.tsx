import React, { useEffect, useState } from "react";
import BookModel from "../../../models/Book";
import ImageBookModel from "../../../models/ImageBook";
import {
  getIconImageOfBook,
  getImageBookOfBook,
} from "../../../api/ImageBookAPI";
import { Link } from "react-router-dom";
import { rendering } from "../../utils/StarRender";
import formatNum from "../../utils/FormatNumber";
interface BookProps {
  book: BookModel;
}

export const BookProps: React.FC<BookProps> = (props) => {
  const bookId = props.book.bookId;
  const [images, setImages] = useState<ImageBookModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getIconImageOfBook(bookId)
      .then((imageData) => {
        setImages(imageData);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (isLoading) {
    return <h1>Is loading ...</h1>;
  }

  if (error !== null) {
    return <h1>Error!!! {error}</h1>;
  }

  return (
    <div className="col-md-3 mt-2">
      <div className="card">
        {images[0] !== undefined && images[0].data && (
          <Link to={`/book/${props.book.bookId}`}>
            <img
              src={images[0]?.data}
              className="card-img-top"
              alt={props.book.name}
              style={{ height: "300px" }}
            />
          </Link>
        )}

        <div className="card-body">
          <h5 className="card-title">{props.book.name}</h5>

          <div className="price">
            <span className="original-price">
              <del>{formatNum(props.book.listedPrice!)}</del>
            </span>
            <span className="discounted-price">
              <strong>{formatNum(props.book.salePrice!)}</strong>
            </span>
          </div>
          <div className="row mt-2" role="group">
            <div className="col-6">
              <div className="">
                {rendering(props.book.avgRating ? props.book.avgRating : 0)}
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <a href="#" className="btn btn-secondary btn-block me-3">
                <i className="fas fa-heart"></i>
              </a>
              <button className="btn btn-danger btn-block float-end">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
