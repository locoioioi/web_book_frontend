import React from 'react';
import { Banner } from './component/Banner';
import { Carousel } from './component/Carousel';
import { ListBook } from '../product/ListBook';
export const Homepage = () => {
    return (
        <div className=''>
            <Banner/>
            <Carousel/>
            <ListBook/>
        </div>
    )
}