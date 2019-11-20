import React from 'react'
import '../../CSS/PopupStyle.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class CustomerPopupModify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerId: this.props.customerId,
            customerName: this.props.customerName,
            customerSurname: this.props.customerSurname,
            customerPhoneNumber: this.props.customerPhoneNumber,
            customerEmail: this.props.customerEmail
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('http://localhost:8080/api/customers/' + this.state.customerId, {
            method: 'PUT',
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
                    <h1>Customer modification</h1>
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
                        <Label for="customerPhoneNumber">Customer Phone Number</Label>
                        <Input type="text" name="customerPhoneNumber" id="customerPhoneNumber"
                        value={this.state.customerPhoneNumber} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="customerEmail">Customer Email</Label>
                        <Input type="text" name="customerEmail" id="customerEmail"
                        value={this.state.customerEmail} onChange={this.handleChange}/>
                    </FormGroup>
                    <Button>Submit</Button>
                    </Form>
                    <br/>
                    <Button onClick={this.props.closePopup}>Close</Button>
                </div>
            </div>
        )
    }
}

export default CustomerPopupModify