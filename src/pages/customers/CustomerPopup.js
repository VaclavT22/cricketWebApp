import React from 'react'
import '../../CSS/PopupStyle.css'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

class CustomerPopup extends React.Component{

    constructor() {
        super()
        this.state = {
            customerName: "",
            customerSurname: "",
            customerPhoneNumber: "",
            customerEmail: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8080/api/customers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.customerName,
                surname: this.state.customerSurname,
                phoneNumber: this.state.customerPhoneNumber,
                email: this.state.customerEmail
            })
        })
    }

    render() {
        return(
            <div className='popup'>
            <div className='popup_inner'>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="customerName">Customer Name</Label>
                        <Input type="text" name="customerName" id="customerName"
                        value={this.state.customerName} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="customerSurname">Customer Surname</Label>
                        <Input type="text" name="customerSurname" id="customerSurname"
                        value={this.state.customerSurname} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="customerPhoneNumber">Customer phone number</Label>
                        <Input type="text" name="customerPhoneNumber" id="customerPhoneNumber"
                        value={this.state.customerPhoneNumber} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="customerEmail">Customer e-mail address</Label>
                        <Input type="text" name="customerEmail" id="customerEmail"
                        value={this.state.customerEmail} onChange={this.handleChange}/>
                    </FormGroup>
                    <ul>
                        <li><Button>Submit</Button></li>
                        <li><Button onClick={() => {this.props.closePopup(); this.props.update();}}>close me</Button></li>
                    </ul>
                </Form>

            </div>
            </div>
        )
    }
}

export default CustomerPopup