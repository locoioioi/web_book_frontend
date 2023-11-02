import ImageBookModel from "../models/ImageBook";
import { getRequest } from "./Request";

const getImageBook = async (link: string): Promise<ImageBookModel[]> => {
  const requestData = await getRequest(link);
  const imagesData = requestData._embedded.imageBooks;
  const resultImages: ImageBookModel[] = [];

  for (const key in imagesData) {
    resultImages.push({
      imageId: imagesData[key].imageId,
      name: imagesData[key].name,
      isIcon: imagesData[key].icon,
      data: imagesData[key].data,
      link: imagesData[key].link,
    });
  }
  return resultImages;
};

export const getImageBookOfBook = async (
  bookId: number
): Promise<ImageBookModel[]> => {
  const link: string = `http://localhost:8080/books/${bookId}/imageBooks`;
  return getImageBook(link);
};

export const getIconImageOfBook = async (
  bookId: number
): Promise<ImageBookModel[]> => {
  const link: string = `http://localhost:8080/books/${bookId}/imageBooks?icon=true&&size=1`;
  return getImageBook(link);
};
