import React from 'react'
import { Button } from 'reactstrap'
import CustomerPopupModify from './CustomerPopupModify'

class CustomersTable extends React.Component {
    constructor() {
        super()
        this.state = {
            showPopup: false
        }
        this.togglePopup = this.togglePopup.bind(this)
    }

    deleteCustomer(id){
        return fetch('http://localhost:8080/api/customers/' + id, {
            method: 'DELETE',
            header:{ Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render() {
        return(
            <div>
                <table className='table'>
                    <tr>
                        <td>{this.props.item.id}</td>
                        <td>{this.props.item.name}</td>
                        <td>{this.props.item.surname}</td>
                        <td>{this.props.item.phoneNumber}</td>
                        <td>{this.props.item.email}</td>
                        <td>
                            <Button onClick={this.togglePopup}>Modify</Button>
                            {this.state.showPopup ?
                                <CustomerPopupModify customerId={this.props.item.id} customerName={this.props.item.name}
                                customerSurname={this.props.item.surname} customerPhoneNumber={this.props.item.phoneNumber}
                                customerEmail={this.props.item.email} closePopup={this.togglePopup}/>
                                : null
                            }
                            <Button onClick={() => this.deleteCustomer(this.props.item.id)}>Delete</Button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }

}

export default CustomersTable