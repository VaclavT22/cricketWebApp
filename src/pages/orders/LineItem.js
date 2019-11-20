import React from 'react'
import {Button} from 'reactstrap'

class LineItem extends React.Component {
	
	render() {
		return(
			<div>
				<table>
					<tr>
						<td><Button>Delete</Button></td>
					</tr>
				</table>
			</div>
		)
	}
}

export default LineItem