import React from 'react';
import '../../CSS/PopupStyle.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LineItemPopup from './LineItemPopup';
import LineItem from './LineItem';

class OrderPopup extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      orderId: "",
      customers: [],
      products: [],
      lineItems: [],
      isCustomersLoading: true,
      isProductsLoading: true,
      showPopup: false
    }
    this.createNewOrder = this.createNewOrder.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.addLineItem = this.addLineItem.bind(this)
  }

  componentDidMount() {
       this.getCustomerList()
  }

  createNewOrder(){
      console.log("Create empty order was runned");
      fetch("http://localhost:8080/api/orders", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          order_date: Date.now
        })
      }).then(response => response.json())
      .then(data => {
          this.setState({ orderId: data})
      })
    }

  getCustomerList(){
    fetch('http://localhost:8080/api/customers')
      .then(response => response.json())
      .then(data => {
          this.setState({ customers: data, isCustomersLoading: false})
    })
  }

  getProductsList() {
    fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => {
        this.setState({ products: data, isProductsLoading: false});
    })
  }

  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  addLineItem(product) {
    this.state.lineItems.push(product)
  }

  render(){
    const {customers, lineItems} = this.state;

    if (this.state.isCustomersLoading && this.state.isProductsLoading) {
        return <p>Loading...</p>;
    }

    const orderLineItems = lineItems.map(product => 
      <LineItem key={product.id} item={product} />
    );

    const customersList = customers.map((item, key) =>
       <option key={item.id}>{item.surname} {item.name}</option>
    );

    return(
      <div className='popup'>
        <div className='popup_inner'>
          <h1>New Order Creation</h1>
          <Form>
            <FormGroup>
              <Label for="Orderer">Select Customer</Label>
              <Input type="select" name="selectCustomer" id="customerSelect">
                {customersList}
              </Input>
            </FormGroup>
            {orderLineItems}
            <Button onClick={this.togglePopup}>+ Add item</Button>
              {this.state.showPopup ?
                <LineItemPopup products={this.state.products}
                addLineItem={this.addLineItem}
                    closePopup={this.togglePopup}/>
                    : null
              }
          </Form>
          <ul>
            <li>
              <Button>Save</Button>
            </li>
            <li>
              <Button onClick={this.props.closePopup}>Close</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default OrderPopup
