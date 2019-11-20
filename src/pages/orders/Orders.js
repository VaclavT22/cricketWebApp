import React from 'react'
import { Button } from 'reactstrap'
import OrdersTable from './OrdersTable'
import Popup from './OrderPopup'

class Orders extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoading: true,
            orders: [],
            orderId: {},
            showPopup: false
        }
        this.getDataList = this.getDataList.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.createNewEmptyOrder = this.createNewEmptyOrder.bind(this)
        this.deleteEmptyOrder = this.deleteEmptyOrder.bind(this)

    }

    componentDidMount() {
        this.getDataList()
    }

    getDataList() {
        fetch('http://localhost:8080/api/orders')
            .then(response => response.json())
            .then(data => {
            this.setState({orders : data, isLoading : false})
        })
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    createNewEmptyOrder(){
      console.log("Create empty order was runned");
      fetch("http://localhost:8080/api/orders", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          order_date: "01-01-2019"
        })
      }).then(response => response.json())
      .then(data => {
          this.setState({ orderId: data})
      })
    }

    deleteEmptyOrder(){
      console.log(this.state.orderId)
      fetch('http://localhost:8080/api/orders/' + this.state.orderId.id, {
        method: 'DELETE',
        header:{ Accept: 'application/json',
                'Content-type': 'application/json'
        }
      })
    }


    render() {
        const {orders, isLoading} = this.state
        const orderAllTable = orders.map(order => <OrdersTable key={order.id} item={order} />)

        if(isLoading) {
            return <p>Loading...</p>
        }

        return(
            <div>
                <h1>Orders Page</h1>
                <Button onClick={this.togglePopup}>+ New Order</Button>
                {this.state.showPopup ?
                    <Popup deleteEmptyOrder={this.deleteEmptyOrder}
                    closePopup={this.togglePopup}/>
                    : null
                }
                <h3>Orders for today</h3>
                <table>
                    <tr>
                        <td>{this.state.orders.id}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <h3>Orders for tomorrow</h3>
                <h3>Orders for this week</h3>
                <h3>All orders</h3>
                
                <h3>Fulfilled orders on this week</h3>
            </div>
        )
    }
}

export default Orders
