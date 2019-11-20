import React from 'react';
import '../../CSS/PopupStyle.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Popup extends React.Component {

    constructor() {
        super()
        this.state={
            productName: "",
            productAge: "",
            productVolume: "",
            productPackaging: "",
            productPrice: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e){
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.productName,
                age: this.state.productAge,
                volume: this.state.productVolume,
                packaging: this.state.productPackaging,
                price: this.state.productPrice
            })
        })
    }

    render() {
        return(
            <div className='popup'>
                <div className='popup_inner'>
                <h1>Add new product</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input type='text' name="productName" id="productName"
                        value={this.state.productName} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productAge">Product Age</Label>
                        <Input type='text' name="productAge" id="productAge"
                        value={this.state.productAge} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productVolume">Product Size</Label>
                        <Input type='text' name="productVolume" id="productVolume"
                        value={this.state.productVolume} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productPackaging">Product Packaging</Label>
                        <Input type='text' name="productPackaging" id="productPackaging"
                        value={this.state.productPackaging} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productPrice">Product Price</Label>
                        <Input type='text' name="productPrice" id="productPrice"
                        value={this.state.productPrice} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button onClick={this.props.update()}>Submit</Button>
                </Form>
                <br/>
                <Button onClick={() => {this.props.closePopup(); this.props.update();}}>close me</Button>
                </div>
            </div>
        )
    }
}

export default Popup
