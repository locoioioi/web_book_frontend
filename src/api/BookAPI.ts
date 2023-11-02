import React from "react";
import BookModel from "../models/Book";
import { getRequest } from "./Request";

interface BookInterface {
  result: BookModel[];
  totalPages: number;
  totalBooks: number;
}

const getBook = async (link: string): Promise<BookInterface> => {
  const responseData = await getRequest(link);

  // get books from the response data
  const booksData = responseData._embedded.books;
  const books: BookModel[] = [];

  const totalPages: number = responseData.page.totalPages;
  const totalBooks: number = responseData.page.totalElement;

  for (const key in booksData) {
    books.push({
      bookId: booksData[key].bookId,
      name: booksData[key].name,
      author: booksData[key].author,
      description: booksData[key].description,
      ISBN: booksData[key].ISBN,
      listedPrice: booksData[key].listedPrice,
      salePrice: booksData[key].salePrice,
      stockQuantity: booksData[key].stockQuantity,
      avgRating: booksData[key].avgRating,
    });
  }
  return { result: books, totalPages: totalPages, totalBooks: totalBooks };
};

export const get3NewBooks = async (): Promise<BookInterface> => {
  // end point
  const url: string =
    "http://localhost:8080/books?sort=bookId,desc&page=0&size=3";
  return getBook(url);
};

export const getBooks = async (currentPage: number): Promise<BookInterface> => {
  // end point
  const url: string = `http://localhost:8080/books?size=8&page=${currentPage}`;
  return getBook(url);
};

export const findBookNavBar = async (name: string): Promise<BookInterface> => {
  let url: string = `http://localhost:8080/books/search/findByNameContains?name=${name}&size=4`;
  return getBook(url);
};

export const findBooksByName = async (
  name: string,
  currentpage: number
): Promise<BookInterface> => {
  let url: string = `http://localhost:8080/books?size=8&page=${currentpage}`;

  if (name !== "") {
    url = `http://localhost:8080/books/search/findByNameContains?size=8&page=${currentpage}&name=${name}`;
  }
  return getBook(url);
};
