import React, {useState, useEffect, FormEvent} from "react";
import RequiredAdmin from "./RequiredAdmin";
import Category from "../../models/Category";
import { getAllCategories } from "../../api/CategoryAPI";

const BookForm : React.FC = (props) => {
	var count : number = 0;
	const [book,setBook] = useState({
		"bookId": 0,
		"name": "",
		"author": "",
		"description": "",
		"isbn": "",
		"listedPrice": 0,
		"salePrice": 0,
		"stockQuantity": 0,
		"avgRating": 0,
		"categories" : [{
			"categoryId": 0
		}],
		"imageBooks" : [
			{
				"isIcon" : false,
				"imageType": "",
				"data": ""
			}
		]
	});
	const [categories,setCategories] = useState<Category[]>([]);
	useEffect(() => {
		getAllCategories()
		.then(categories => {
			setCategories(categories);
		}).catch((error) => {
			console.log(error);
		});
	},[]);
	const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/book", {
                method: "POST",
                headers: {
					'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(book)
            });

            if (response.ok) {
                alert("Save book success!!!");
                // Reset your form here if needed
                setBook({ 
					"bookId" : 0,
					"name": '',
					"author": '',
					"description": '',
					"isbn" : '',
					"listedPrice": 0,
					"salePrice" : 0,
					"stockQuantity" : 0,
					"avgRating": 0,
					"categories" : [{
						"categoryId": 0
					}],
					"imageBooks" : [

					]
				});
            } else {
                alert("Fail to save");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving book');
        }
    };

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	if (e.target.files) {
		const file = e.target.files[0];
		const base64Data = await convertFileToBase64(file);
		if (base64Data) {
			setBook({
				...book,
				imageBooks: [
					{
						isIcon: true,
						imageType: file.type,
						data: `${base64Data}`
					}
				]
			});
		}
	}
	count++;	
};

const handleFileChangeMul = async (e: React.ChangeEvent<HTMLInputElement>) => {
	if (e.target.files) {
		const file = e.target.files[0];
		const base64Data = await convertFileToBase64(file);
		if (base64Data) {
			setBook({
				...book,
				imageBooks: [
					...book.imageBooks,
					{
						isIcon: true,
						imageType: file.type,
						data: `${base64Data}`
					}
				]
			});
		}
	}	
};

const convertFileToBase64 = (file : File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result ? (reader.result as string).split(",")[1]: null);
		reader.onerror = (error) => reject(error);
	})
}

const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {  
	const categoryId = parseInt(e.target.value);
	const checked = e.target.checked;
	if (checked) {
		setBook({
			...book,
			categories: [...book.categories, { categoryId }]
		});
	} else {
		setBook({
			...book,
			categories: book.categories.filter((c) => c.categoryId !== categoryId)
		});
	}
};
		
	return(
		<div className={"container"}>
			<h1 className={"mb-2"}>Add Book</h1>
			<form onSubmit={handleSubmit}>
				<input type="hidden" id={"bookId"} value={book.bookId} />

				<label htmlFor="name">Book Name</label>
				<input type="text" className={"form-control"} value={book.name} required onChange={(e) => {
					setBook({...book,name: e.target.value})}}/>

				<label htmlFor="author">Author</label>
				<input type="text" className={"form-control"} value={book.author} onChange={(e) => {
					setBook({...book,author: e.target.value})}}/>

				<label htmlFor="name">Description</label>
				<input type="text" className={"form-control"} value={book.description} required onChange={(e) => {
					setBook({...book,description: e.target.value})}}/>

				<label htmlFor="listedPrice">Listed Price</label>
				<input type="number" className={"form-control"} value={book.salePrice} required onChange={(e) => {
					setBook({...book,salePrice: parseFloat(e.target.value) })}}/>

				<label htmlFor="price">Price</label>
				<input type="number" className={"form-control"} value={book.listedPrice} required onChange={(e) => {
					setBook({...book,listedPrice: parseFloat(e.target.value) })}}/>

				<label htmlFor="quantity">Quantity</label>
				<input type="number" className={"form-control"} value={book.stockQuantity} required onChange={(e) => {
					setBook({...book,stockQuantity: parseInt(e.target.value) })}}/>

				<label htmlFor="isbn">Isbn</label>
				<input type="text" className={"form-control"} value={book.isbn} onChange={(e) => {
					setBook({...book,isbn: e.target.value})}}/>
				<div className="">
					{
						categories.map((category) => (
							<div className="">
								<input id={category.name} type="checkbox" value={category.categoryId} onChange={handleCategory} /> 
								<label htmlFor={category.name}>{category.name}</label>
							</div>
							
						))
					}
				</div>
				<label htmlFor="image">Image: </label>
				<input id="image" type="file" className="form-control" onChange={count == 0? handleFileChange:handleFileChangeMul} />

				<button type="submit" className="btn btn-primary mt-3">Save Book</button>
			</form>
		</div>
	)
}

const BookForm_Admin = RequiredAdmin(BookForm);
export default BookForm_Admin;