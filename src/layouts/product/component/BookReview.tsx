import { useEffect, useState } from "react";
import { getReviewByBookId } from "../../../api/ReviewAPI";
import Review from "../../../models/Review";
import { UserInfor } from "./UserInfor";
import { rendering } from "../../utils/StarRender";

interface ReviewInterface {
  bookId: number;
}
export const BookReview: React.FC<ReviewInterface> = (props) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReviewByBookId(props.bookId)
      .then((reviews) => {
        setReviewList(reviews);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  });

  if (isLoading) {
    return (
      <div className="">
        <h1>Loading Review...</h1>
      </div>
    );
  }

  if (error) {
    return <div className="container">Error !!!</div>;
  }

  return (
    <div className="col-3">
      {reviewList.map((review, index) => (
        <div className="row" key={review.reviewId}>
          <UserInfor reviewId={review.reviewId}/>
          <div className="col">
            <div className="">
                {rendering(review.rating?review.rating:0)}
            </div>
          </div>
          <div className="col">
            <p>{review.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
