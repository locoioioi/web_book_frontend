import React, { useEffect, useState } from 'react';
import BookModel from '../../models/Book';
import { getIconImageOfBook } from '../../api/ImageBookAPI';
import ImageBookModel from '../../models/ImageBook';
interface NavbarInterface {
    book: BookModel
}

export const NavbarSearch:React.FC<NavbarInterface> = (props) => {
    const [image, setImage] = useState<ImageBookModel[]>([])
    const [error,setError] = useState(null)
    useEffect(() => {
        getIconImageOfBook(props.book.bookId)
        .then(imageBook =>{
            setImage(imageBook)
        })
        .catch((error) => setError(error.message));
    },[])
    console.log("book Id" + props.book.bookId)
    console.log( "image: "+ image)
    return (
        <li className="bg-light border" style={{width: 290}}>
            <a className='text-decoration-none' href="#">
                <div className="row p-1">
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        {
                            image[0] !== undefined && image[0].data &&
                            <img src={image[0].data} alt="" style={{width:50}} />
                        }
                    </div>
                    <div className="col-9 text-dark">
                        <h5 className='m-0'>Title: {props.book.name}</h5>
                        <p className='m-0'>{props.book.description}</p>
                        <p className='m-0 pt-3 pb-2'>Price: <span>{props.book.salePrice}</span></p>
                    </div>
                </div>
            </a>

        </li>
    )
}