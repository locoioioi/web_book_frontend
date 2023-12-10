import React, { useEffect, useState } from "react"
import { getUserWishList } from "../../api/UserAPI";
import WishListModel from "../../models/WishList";
import BookModel from "../../models/Book";
import { getBookByWishListId } from "../../api/BookAPI";
import { BookProps } from "../product/component/BookProps";
import { getUserId } from "../utils/UserId";

interface FavoriteBookProps { 
}


export const FavoriteBooks : React.FC<FavoriteBookProps> = (props) => {
    const [wishList,setWishList] = useState<WishListModel[]>([]);
    const [books,setBooks] = useState<BookModel[]>([]);
    useEffect(() => {
        var userId = getUserId();

        getUserWishList(userId!).then((wishListData) => {
            setWishList(wishListData);
        });
    }, []);
    
    useEffect(() => {
        const fetchBooks = async () => {
            const updatedBooks: BookModel[] = [];
    
            for (const wishListData of wishList) {
                const bookData = await getBookByWishListId(wishListData.wishListId);
                updatedBooks.push(bookData);
            }
            setBooks(updatedBooks);
        };
    
        if (wishList.length > 0) {
            fetchBooks();
        }
    }, [wishList]);

    return <>
        <div className="container">
            <h1>Favourite Items: </h1>
            <div className="row">
                {
                    books.length > 0 
                    ? 
                    books.map((book) => {
                        return <BookProps book={book} key={book.bookId}></BookProps>
                    })
                    :
                    <h1>Empty List! Please add a favorite list</h1>
                }

            </div>
        </div>
    </>
}