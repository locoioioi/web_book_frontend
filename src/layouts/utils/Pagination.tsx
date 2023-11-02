import React from 'react';
interface PaginationComponent {
    currentPage: number;
    totalPages: number;
    paginate: any;
}
export const Pagination:React.FC<PaginationComponent> = (props) => {
    const pages : number[] = [];
    
    if (props.currentPage === 1) {
        pages.push(props.currentPage);
        if (props.totalPages > props.currentPage + 1) {
            pages.push(props.currentPage + 1);
        }
        if (props.totalPages > props.currentPage + 2) {
            pages.push(props.currentPage + 2);
        }
    } else if (props.currentPage > 1) {
        if (props.currentPage >= 3) {
            pages.push(props.currentPage - 2);
        }
        if (props.currentPage >= 2 ) { 
            pages.push(props.currentPage - 1);
        }
        pages.push(props.currentPage);
        if (props.totalPages >= props.currentPage + 1) {
            pages.push(props.currentPage + 1);
        }
        if (props.totalPages >= props.currentPage + 2) {
            pages.push(props.currentPage + 2);
        }
    }
    return (

        <nav aria-label="...">
        <ul className="pagination">
            <li className="page-item " onClick={() => props.paginate(1)}>
                <button className='page-link' >First</button>
            </li>

            {   
                pages.map(page => (
                    <li className={"page-item" + (props.currentPage === page ? " active" :"")} key={page} onClick={() => props.paginate(page)} >
                        <button className={"page-link" }  >{page}</button>
                    </li>
                ))
            }

            <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                <button className='page-link' >Last</button>
            </li>
        </ul>
        </nav>
    )
}