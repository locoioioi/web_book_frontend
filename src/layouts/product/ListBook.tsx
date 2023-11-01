import React from "react";
import  { BookProps } from "./component/BookProps";
import Book from "../../models/Book";
export const ListBook : React.FC = () => {
    const books: Book[] = [
        {
            id: 1, 
            title: "Book 1",
            description: "Book 1 description",
            price : 4500,
            originalPrice : 3000,
            imageUrl: "images/books/book1.png"
        },
        {
            id: 2, 
            title: "Book 2",
            description: "Book 2 description",
            price : 2500,
            originalPrice : 3000,
            imageUrl: "images/books/book2.png"
        },
        {
            id: 3, 
            title: "Book 3",
            description: "Book 3 description",
            price : 2500,
            originalPrice : 3000,
            imageUrl: "images/books/book3.png"
        },       {
            id: 4, 
            title: "Book 1",
            description: "Book 1 description",
            price : 4500,
            originalPrice : 3000,
            imageUrl: "images/books/book1.png"
        },
        {
            id: 5, 
            title: "Book 2",
            description: "Book 2 description",
            price : 2500,
            originalPrice : 3000,
            imageUrl: "images/books/book2.png"
        },
        {
            id: 6, 
            title: "Book 3",
            description: "Book 3 description",
            price : 2500,
            originalPrice : 3000,
            imageUrl: "images/books/book3.png"
        },
    ]
    return (
        <div className="container">
            <div className="row mt-4">
                {
                    books.map((book) => (
                        <BookProps book={book} key={book.id}/>
                    ))
                }
            </div>
        </div>
    )
}