import React , {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'
class Logout extends Component {
    componentDidMount() {
            this.props.logItOut()
    }
    render() {


        return (
            <Redirect to ='/' />
        )
    }
}


const mapDispatchToprops = dispatch => {

    return {
        logItOut : () => dispatch(actions.authlogout())
    }
}
export default connect(null , mapDispatchToprops)(Logout)