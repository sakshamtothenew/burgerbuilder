import React, { Component } from 'react'
import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import{ checkValidity }from'../../shared/Utility'

class Auth extends Component {


    state = {
        controls : {
         email: {
             elementType: 'input',
             elementConfig: {
                 type: 'email',
                 placeholder: 'Your E-Mail'
             },
             value: '',
             validation: {
                 required: true,
                 isEmail: true
             },
             valid: false,
             touched: false
         },
         password : {
             elementType : 'input' , 
             elementConfig : {
                 type : 'password' , 
                 placeholder : 'Enter Password' 
             } , 
             value :'',
             validation : {
                 required : true , 
                 
             } ,
             valid : false , 
             touched : false 
         }
        } ,

        isSignup : true ,
    
     }


    

     submithandler = (event) => {
         event.preventDefault();
         this.props.onAuth(this.state.controls.email.value , this.state.controls.password.value , this.state.isSignup)
     }

     switchauthhandler = (event) => {
        //  event.preventDefault()
       this.setState((prevState)=> {
            return {
                isSignup : !prevState.isSignup
            }
       })
       console.log(this.state.isSignup)
     }

     inputChangedHandler = (event , inputIdentifier) => {
         event.preventDefault() ;
         const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
            
        this.setState({controls : updatedOrderForm})
        // console.log(this.state)
     }

      componentDidMount()
     {     
         console.log(this.props.redirectpath)
         if(!this.props.building&& this.props.redirectpath !== '/')
         {
         this.props.authredirectpath('/')
       
         }
     }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))
                
        if(this.props.loading) {
            form =  <Spinner left = "0%" />
        }
      
        let error = null;

        if(this.props.error)
        {
            error = this.props.error.message
        }

          let  isAuth = null
          if(this.props.isAuthenticated)
          { 
              isAuth =  <Redirect to = {this.props.redirectpath} />
          }
        return (
             
            <div className = {classes.Auth}>
                 {isAuth}
                {error}
                <form  onSubmit = {this.submithandler}>
                    {form}
                    <Button btnType="Success" >Submit</Button>
                </form>
                <Button  clicked = {this.switchauthhandler} btnType = "Danger">Switch to {this.state.isSignup ? 'Signup' : 'Signin'}</Button>

            </div>
        )
    }
}
const mapStateToProps = state => {
  return{
    loading : state.auth.loading ,  
    error : state.auth.error ,
    isAuthenticated : state.auth.token !== null,
     redirectpath : state.auth.authredirectpath , 
     building : state.burgerBuilder.building
  }
    

}

const mapDispatchToProps = dispatch => {


    return {

        onAuth : (email , password , signupFlag  ) => dispatch(action.auth(email , password , signupFlag)) ,
        authredirectpath : (path) => dispatch(action.authredirectpath(path))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Auth)