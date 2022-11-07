import { Component } from "react";

import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, inf) {
        this.setState({ error: true })
    }

    render() {
        if (this.state.error) return <Error />
        else return this.props.children
    }
}

const Error = () => {
    return (
        <>
            <ErrorMessage paragraph={false} />
        </>
    )
}

export default ErrorBoundary