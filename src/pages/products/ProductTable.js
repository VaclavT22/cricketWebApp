import React from 'react';
import '../../CSS/TableDescription.css'
import {Button} from 'reactstrap'
import ProductPopupModify from './ProductPopupModify'


class ProductSell extends React.Component {
    constructor() {
        super()
        this.state = {
            product: null,
            showPopup: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        })
    }

    deleteProduct(id) {
        return fetch('http://localhost:8080/api/products/' + id, {
            method: 'DELETE',
            header:{ Accept: 'application/json',
                   'Content-type': 'application/json'
            }
        })
    }



    render() {
        return(
            <div>
                <table className='table'>
                    <tr>
                        <td>{this.props.item.id}</td>
                        <td>{this.props.item.name}</td>
                        <td>{this.props.item.age}</td>
                        <td>{this.props.item.volume}</td>
                        <td>{this.props.item.packaging}</td>
                        <td>{this.props.item.price}</td>
                        <td>
                            <Button onClick={this.togglePopup}>Modify</Button>
                            {this.state.showPopup ?
                                <ProductPopupModify productId={this.props.item.id} productName={this.props.item.name}
                                productAge={this.props.item.age} productVolume={this.props.item.volume}
                                productPackaging={this.props.item.packaging} productPrice={this.props.item.price}
                                closePopup={this.togglePopup}/>
                                : null
                            }
                        </td>
                        <td>
                            <Button onClick={() => this.deleteProduct(this.props.item.id)}>Delete</Button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ProductSell
