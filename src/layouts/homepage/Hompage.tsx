import React, { useEffect, useState } from 'react';
import { Banner } from './component/Banner';
import { Carousel } from './component/Carousel';
import { ListBook } from '../product/ListBook';
import BookModel from '../../models/Book';
import { get3NewBooks } from '../../api/BookAPI';
import { Pagination } from '../utils/Pagination';
interface HompageInterface {
    search : string;
}
export const Homepage:React.FC<HompageInterface> = (props) => {
    const [books,setBooks] = useState<BookModel[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [error,setError] = useState(null)

    
    useEffect(() =>{
        get3NewBooks()
        .then(
            books => { 
                setBooks(books.result)
                setIsLoading(false)
            }
        )
        .catch(
            error => setError(error.message)
        )
    },[])

    return (
        <div className=''>
            <Banner/>
            {
                isLoading 
                ? 
                <div className="container">
                    <h3>loading carousel...</h3>
                </div>
                :
                <Carousel books={books} />
            }
            <ListBook search={props.search}/>
        </div>
    )
}