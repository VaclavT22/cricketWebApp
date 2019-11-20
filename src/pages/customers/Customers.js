import React from 'react'
import CustomersTable from './CustomersTable'
import CustomerPopup from './CustomerPopup'
import { Button } from 'reactstrap'


class Customers extends React.Component {

    constructor(){
        super()
        this.state = {
            isLoading: true,
            customers: [],
            showPopup: false
        };
        this.handleChange = this.handleChange.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
        this.getDataList = this.getDataList.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this.getDataList()
    }

    /*
    componentDidUpdate(prevProps, prevState) {
        if(prevState.customers !== this.state.customers) {
            this.getDataList()
        }
    }*/

    getDataList(){
        fetch('http://localhost:8080/api/customers')
          .then(response => response.json())
          .then(data => {
              this.setState({ customers: data, isLoading: false })
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    render(){
        const {customers, isLoading} = this.state;
        const custTabDesc = customers.map(cust => <CustomersTable key={cust.id} item={cust} />);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return(
            <div>
                <h1>Customers pages</h1>
                <Button onClick={this.togglePopup}>New Customer</Button>
                {this.state.showPopup ?
                    <CustomerPopup closePopup={this.togglePopup} update={this.getDataList}/>
                    : null
                }
                <br/>
                <br/>
                {custTabDesc}
            </div>
        )
    }
}

export default Customers
