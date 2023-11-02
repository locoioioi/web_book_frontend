import React, { useEffect, useState } from "react"
import BookModel from "../../../models/Book"
import ImageBookModel from "../../../models/ImageBook"
import { getIconImageOfBook} from "../../../api/ImageBookAPI"

interface CarouselItemComponent {
    book : BookModel
}

export const CarouselItem:React.FC<CarouselItemComponent> = (props) => {
    const [images , setImages] = useState<ImageBookModel[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] = useState(null)
    useEffect(() => {
        getIconImageOfBook(props.book.bookId)
        .then(imageBook =>{
            setImages(imageBook)
            setLoading(false)            
        })
        .catch((error) => setError(error.message));
    },[])

    if (loading) {
        <div className="">
            Loading...
        </div>
    }

    if (error) {
        <div className="">
            Error: {error}
        </div>
    }
    
    
    return (
        <div className="row align-items-center">
            <div className="col-5 text-center">
                {
                    images[0] !== undefined && images[0].data && 
                    <img src={images[0]?.data} className='float-end'  style={{width:150}} alt="..."/>
                }
            </div>
            <div className="col-7">
                <h5>Title: {props.book.name}</h5>
                <p>Description: {props.book.description}</p> 
                <span>Price:</span><b>{props.book.salePrice}</b>
            </div>
        </div>
    )
}