import React, { useEffect, useState } from 'react';
import BookModel from '../../../models/Book';
import { CarouselItem } from './CarouselItem';
interface CarouselProps {
    books: BookModel[]
}

export const Carousel:React.FC<CarouselProps> = (props) => {
    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-inner">
                {
                    props.books.map((book,index) =>(
                        <div className={index === 0 ?`carousel-item active`:`carousel-item`} data-bs-interval="10000" key={index}>
                            <CarouselItem book={book}/>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}