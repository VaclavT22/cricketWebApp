import React from 'react'
import ProductTable from './ProductTable'
import { Route, NavLink, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Button, Form, FormGroup, Table } from 'reactstrap';
import Popup from './ProductPopup'

class Products extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
            productsell: [],
            productName: "",
            showPopup: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.getDataList = this.getDataList.bind(this)
        this.getDataListByFoundName = this.getDataListByFoundName.bind(this)
    }


    componentDidMount() {
         this.getDataList()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Method that will call new product list filtered by inputted string.
    handleFind(event) {
        event.preventDefault()

    }

    // Popup for creating new product.
    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

/*
    componentDidUpdate(prevProps, prevState) {
        if(prevState.productsell !== this.state.productsell) {
            this.getDataList()
        }
    }*/



    getDataList() {
        fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then(data => {
            this.setState({ productsell: data, isLoading: false });
        })
    }

    getDataListByFoundName() {
        fetch('http://localhost:8080/api/productsell/namelike/' + this.state.productName)
        .then(response => response.json())
        .then(data => {
            this.setState({ productsell: data, isLoading: false})
        })
    }


    render() {
         const {productsell, isLoading} = this.state;
         const productTabDesc = productsell.map(product => <ProductTable key={product.id} item={product}/>);

         if (isLoading) {
           return <p>Loading...</p>;
         }

        return(
            <div>
                <h1>Products page</h1>
                <br/>
                <br/>
                <Button onClick={this.togglePopup}>+ Add</Button>
                {this.state.showPopup ?
                    <Popup closePopup={this.togglePopup} update={this.getDataList}/>
                    : null
                }
                <br/>
                <br/>
                <div>
                    <Table>
                        <tr>
                            <th>
                                <Form onSubmit={this.getDataListByFoundName}>
                                    <input type="text" name="productName" placeholder="Product Name" onChange={this.handleChange} />
                                    <Button>S</Button>
                                </Form>
                            </th>
                            <th>
                                <Form onSubmit={this.getDataList}>
                                    <input type="text" name="productAge" placeholder="Product Age" />
                                    <Button>S</Button>
                                </Form>
                            </th>
                            <th>
                                <Form>
                                    <input type="text" name="productVolume" placeholder="Product Size" />
                                    <Button>S</Button>
                                </Form>
                            </th>
                            <th>
                                <Form>
                                    <input type="text" name="productPackage" placeholder="Product Packaging" />
                                    <Button>S</Button>
                                </Form>
                            </th>
                            <th>
                                <Form>
                                    <input type="text" name="productPrice" placeholder="Product Price" />
                                    <Button>S</Button>
                                </Form>
                            </th>
                        </tr>
                    </Table>
                </div>
                <h1>{this.state.productName}</h1>
                {productTabDesc}
            </div>
        )
    }
}

export default Products
