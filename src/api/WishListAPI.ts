import { getUserId } from "../layouts/utils/UserId";

export const createWishList = async (bookId: number) => {
    const url = `http://localhost:8080/wishlist/create`;
    const userId = getUserId();
    const response = await fetch(url,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "book" : {
                "bookId" : bookId
            },
            "user" : {
                "userId" : userId
            }
        })
    });
}