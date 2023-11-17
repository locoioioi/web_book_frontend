import React, { useEffect, useState } from "react";
import ImageBookModel from "../../../models/ImageBook";
import { getImageBookOfBook } from "../../../api/ImageBookAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageInterface {
  bookId: number;
}
export const ImagesPerBook: React.FC<ImageInterface> = (props) => {
  const [imageList, setImageList] = useState<ImageBookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  console.log(imageList[0]);
  useEffect(() => {
    getImageBookOfBook(props.bookId)
      .then((imageData) => {
        setImageList(imageData);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  },[]);

  if (isLoading) {
    return <div className="">Image is Loading ...</div>;
  }
  if (error) {
    return <div className="">Fail to fetch Image</div>;
  }
  return (
      <div className="row">
        <div className="col-12 align-items-center">
          <Carousel showArrows={true} showIndicators={true}>
            {imageList.map((imageData, index) => (
              <div className="" key={index}>
                <img
                  src={imageData.data}
                  alt={imageData.name}
                  style={{ maxWidth: "250px" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
  );
};
