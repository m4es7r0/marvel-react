import './errorMessage.scss'

const ErrorMessage = ({ paragraph = true }) => {
    return (
        <div className="error">
            {paragraph ? <h2>Error</h2> : <h2 style={{fontSize: '46px'}}>Error</h2>}
            {paragraph ? <p>problems with server, try restart page</p> : null}
        </div>
    )
}

export default ErrorMessage