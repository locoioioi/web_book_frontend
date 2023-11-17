import Review from "../models/Review";
import { getRequest } from "./Request";

const getReviews = async (link: string): Promise<Review[]> => {
  const reviewList: Review[] = [];
  const response = await getRequest(link);
  const responseData = response._embedded.reviews;
  for (const key in responseData) {
    reviewList.push({
      reviewId: responseData[key].reviewId,
      description: responseData[key].description,
      rating: responseData[key].rating,
    });
  }
  return reviewList;
};
export async function getReviewByBookId(bookId: number): Promise<Review[]> {
  const link: string = `http://localhost:8080/books/${bookId}/reviews`;
  return getReviews(link);
}
