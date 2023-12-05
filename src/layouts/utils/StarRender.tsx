import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

export const rendering = (rating: number) => {
  const full: number = 5;
  const stars = [];
  const fullStar = Math.floor(rating);
  const halfStar = Math.ceil(rating - fullStar);
  const nonStar = full - fullStar - halfStar;
  for (let i = 0; i < fullStar; i++) {
    stars.push(<StarFill className="text-warning" />);
  }
  for (let i = 0; i < halfStar; i++) {
    stars.push(<StarHalf className="text-warning" />);
  }
  for (let i = 0; i < nonStar; i++) {
    stars.push(<Star className="text-warning" />);
  }
  return stars;
};
