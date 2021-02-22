import React from 'react'
import StockTable from '../components/StockTable'

function EditStockList(props) {
    return (
        <div>
            <StockTable history={props.history}></StockTable>
        </div>
    )
}

export default EditStockList
