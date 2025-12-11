import React, { ErrorInfo } from 'react'

class ErrorBoundary extends React.Component<React.PropsWithChildren> {
    state: {
        hasError: boolean
        error: Error | null
        errorInfo: ErrorInfo | null
    }
    constructor(props: React.PropsWithChildren) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })

        // You can also log the error to an error reporting service here
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: '20px',
                        margin: '20px',
                        border: '2px solid #ff6b6b',
                        borderRadius: '8px',
                        backgroundColor: '#fff5f5',
                    }}
                >
                    <h2 style={{ color: '#c92a2a', marginTop: 0 }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: '#666' }}>
                        The application encountered an error. Please refresh the
                        page or contact support if the problem persists.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '15px',
                            padding: '8px 16px',
                            backgroundColor: '#228be6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Reload page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
