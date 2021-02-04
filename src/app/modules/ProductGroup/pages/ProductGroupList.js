import React from 'react'
import ProductGroupTable from '../components/ProductGroupTable'

function ProductGroupList(props) {
    return (
        <div>
            <ProductGroupTable history={props.history}></ProductGroupTable>
        </div>
    )
}

export default ProductGroupList
