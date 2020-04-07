import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {

        const [error , errorConfirmedHandler] = useHttp(axios)
        
            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
        
    }
}

export default withErrorHandler;