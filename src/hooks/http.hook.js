import React from "react";

export const useHttp = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [process, setProcess] = React.useState('waiting')

    const request = React.useCallback(async (url, method = "GET", body = null, headers = { "Content-Type": "aplication/json" }) => {
        setLoading(true)
        setProcess('loading')

        try {
            const response = await fetch(url, { method, body, headers })
            if (!response.ok) throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            const data = await response.json()

            clearError()
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            setProcess('error')
            throw e
        }
        // eslint-disable-next-line
    }, [])

    const clearError = React.useCallback(() => {
        setError(null)
        setProcess('loading')
    }, [])

    return { loading, request, error, process, setProcess }
}