import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';

export default class ErrorBoundry extends Component {
    state={
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({isError: true});
        console.log('An error has occurred', error);
        console.log('In component', errorInfo);
    }

    render(){
        if(this.state.hasError)
            return <ErrorIndicator />
        return this.props.children;
    }
}
