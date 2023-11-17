import React, { useEffect, useState } from "react";
import ImageBookModel from "../../../models/ImageBook";
import { getImageBookOfBook } from "../../../api/ImageBookAPI";
interface ImageInterface {
  bookId: number;
}
export const ImagesPerBook: React.FC<ImageInterface> = (props) => {
  const [imageList, setImageList] = useState<ImageBookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [carouselImage, setCarouselImage] = useState<ImageBookModel>();

  const handleImageCarousel = (image: ImageBookModel) => {
    setCarouselImage(image);
  };
  console.log(imageList[0]);
  useEffect(() => {
    getImageBookOfBook(props.bookId)
      .then((imageData) => {
        setImageList(imageData);
        if (imageData.length > 0) {
          setCarouselImage(imageData[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (isLoading) {
    return <div className="">Image is Loading ...</div>;
  }
  if (error) {
    return <div className="">Fail to fetch Image</div>;
  }
  return (
    <div className="col-md-3 mt-2">
      <div className="">
        {carouselImage && carouselImage.data && (
          <img src={`${carouselImage.data}`} style={{width: 200}} alt="" />
        )}
      </div>
      <div className="row mx-auto" style={{width: 200}}>
        {imageList.map((image, index) => (
          <div
            key={index}
            className={"col-4 mt-3"}
            onClick={() => handleImageCarousel(image)}
          >
            <img src={image.data} style={{ width: "50px", cursor: "pointer" }} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};
