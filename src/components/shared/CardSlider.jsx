import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';

const CardSlider = ({ products }) => {
    const options = {
        type: 'slide', // This can be 'loop' or 'fade' as well
        perPage: 1, // Ensure we have control over width with fixedWidth
        fixedWidth: '230px', // Set the width of each slide
        gap: '10px', // Set the gap between slides
        arrows: false, // Hide arrows
        pagination: false, // Hide pagination
        breakpoints: {
            640: {
                fixedWidth: '150px', // Width of each slide on mobile
                gap: '10px', // Gap between slides on mobile
            },
        },
    };

    return (
        <Splide aria-label="Products" options={options}>
            {products.length > 0 ? products.map((product, index) => (
                <SplideSlide key={index}>
                    <ProductCard product={product} type={'secondary'}/>
                </SplideSlide>
            )) : Array.from({ length: 2 }).map((_, index) => <ProductCardSkeleton key={index} type={'secondary'}/>)}
        </Splide>
    )
}

export default CardSlider