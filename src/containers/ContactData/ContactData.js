import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import classes from './Contact.module.css'
import axios from '../../Axios-instance'
class ContactData extends Component {

    state = {
        name: 'saksham',
        email: 'sakshamsachhdeva41@gmail.com',
        address: {
            state: 'delhi',
            city: 'new delhi',
            pin: 110051
        }
    }

    orderhandler = (event) => {

        event.preventDefault()
        console.log(this.props.ingredients)
          const orders = {
            ingredients : this.props.ingredients ,
            customerdetails : {
                phone : 3938246 ,
                address : {
                    street : "anarkali" , 
                    city : "delhi" ,
                    pin : "110051"
                },
                price : this.props.price,
                deliverymethod : "fastest"
            }
        }
        this.setState({loading : true})
        axios.post('/orders.json' , orders)
        .then(Response => {console.log(Response)
          this.setState({loading : false , purchasing : false})
        }) 
        .catch(error => {console.log(error) 
          this.setState({loading : false , purchasing : false})
        })
    }
    render() {
        return (
            <div className = {classes.ContactData}>
                <h1>Please enter your contact data !!</h1>
                <form>
                <input type = "text" name = "name" placeholder = "Your name" />
                <input type = "email" name = "email" placeholder = "Enter Email" />
                <input type = "text" name = "state" placeholder = "State" />
                <input type = "text" name = "city" placeholder = "City" />
                <input type = "text" name = "pin" placeholder = "your pincode" />
                <Button clicked = {(event) => this.orderhandler(event)} btnType = "Success">Order Now</Button>

                </form>

            </div>
        )

    }
}

export default ContactData