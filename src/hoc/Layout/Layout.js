import React, { Component } from 'react'
import Aux from '../Aux'
// import BurgerBuilder from '../../containers/BurgerBuilder/burgerbuilder'
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
// import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Layout extends Component {
    state = {
        showsidedrawer: false
    }

    sidedrawerclosehandler = () => {
        this.setState({ showsidedrawer: false })
    }

    togglesideedrawerhandler = () => {
        this.setState((prevstate) => {
            return { showsidedrawer: !prevstate.showsidedrawer }
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} togglesidehandle={this.togglesideedrawerhandler} />
                <SideDrawer show={this.state.showsidedrawer} isAuth = {this.props.isAuthenticated} sidedrawerclosehandler={this.sidedrawerclosehandler} />
                <main>{this.props.children}</main>
            </Aux>
        )
    }

}

const mapStatetoprops = state => {

    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStatetoprops)(Layout)