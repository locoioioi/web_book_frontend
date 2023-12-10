import UserModel from "../models/User";
import WishListModel from "../models/WishList";
import { getRequest } from "./Request";

export const getUser = async (reviewId: number): Promise<UserModel> => {
  const response = await getRequest(
    `http://localhost:8080/reviews/${reviewId}/user`
  );
  return {
    userId: response.userId,
    username: response.username,
    password: response.password,
    firstName: response.firstName,
    lastName: response.last,
    gender: response.gender,
    shoppingAddress: response.shoppingAddress,
    deliveryAddress: response.deliveryAddress,
    email: response.email,
    phoneNumber: response.phoneNumber,
  };
};

export const getUserWishList = async (userId: number): Promise<WishListModel[]> => { 
  const response = await getRequest(`http://localhost:8080/users/${userId}/wishLists`);
  const responseData = await response._embedded.wishLists;
  const wishLists : WishListModel[] = [];
  for (const key in responseData) {
    wishLists.push({
      wishListId : responseData[key].wishListId
    });
  }
  return wishLists;
}