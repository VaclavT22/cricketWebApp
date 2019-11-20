import React from 'react'
import '../../CSS/PopupStyle.css'
import { Button, Table } from 'reactstrap'

class OrdersTable extends React.Component {


    render() {
        return(
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>{this.props.item.id}</th>
                        <th>{this.props.item.customer}</th>
                    </tr>
                </thead>
            </Table>
        </div>
        )
    }
}

export default OrdersTable