import Category from "../models/Category";
import { getRequest } from "./Request";

const getCategories = async (link : string) => {
    const requestData = await getRequest(link);
    const categoriesData = requestData._embedded.categories;
    const result : Category[] = [];
    for (const key in categoriesData) {
        result.push({
            categoryId : categoriesData[key].categoryId,
            name : categoriesData[key].name
        });
    }
    return result;
}

export const getAllCategories = async () => {
    const link : string = "http://localhost:8080/categories";
    return getCategories(link);
};