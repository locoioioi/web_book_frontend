import React from 'react';

export const Banner = () => {
    return (
        <div className="p-2 mb-4 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div className=''>
                    <h3 className='display-5 fw-bold'>
                        Đọc sách chính là hộ chiếu <br /> cho vô số cuộc phiêu lưu
                    </h3>
                    <p className="">Mary Pope Osborne</p>
                    <button className="btn btn-primary btn-lg text-white float-end">
                        Khám Phá Tại Loc.vn
                    </button>
                </div>
            </div>
        </div>
    )
}