import React from 'react';
import '../../CSS/PopupStyle.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LineItemPopup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lineItemId: "",
			selectedProduct: {},
			products: [],
			isProductsLoading: true
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount(){
		this.getProductsList()
	}

	handleSubmit(e){
		e.preventDefault()
		console.log(this.state.selectedProduct)
		this.props.addLineItem(this.state.selectedProduct)
	}

	handleChange(e){
        const {name, value} = e.target
		this.setState({[name]: value})
    }

	getProductsList() {
    fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => {
        this.setState({ products: data, isProductsLoading: false});
    })
  }

	render(){
		const productList = this.state.products.map((item,key) =>
			<option key={item.id} value={item}>{item.name} {item.age} {item.volume} {item.packaging}</option>
		)

		if(this.state.isProductsLoading) {
			return (
				<p>Loading...</p>
			)
		}

		return(
			<div className='popup'>
				<div className='popup_inner'>
					<h1>Add new item</h1>
					<Form onSubmit={this.handleSubmit}>
						<FormGroup>
							<Label for="Product">Select Product</Label>
							<Input type="select" name="selectedProduct" id="productSelect" value={this.state.selectedProduct} onChange={this.handleChange}>
								{this.state.products.map((item, index) =>
									<option key={index} value={item.id}>{item.name} {item.age} {item.volume} {item.packaging}</option>
								)}
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for="ProductAmount">Select Amount</Label>
							<Input type="number" name="selectAmount" id="selectAmount"></Input>
						</FormGroup>
						<Button>Submit</Button>
					</Form>

					<Button onClick={this.props.closePopup}>Close</Button>
				</div>
			</div>
		)
	}
}

export default LineItemPopup