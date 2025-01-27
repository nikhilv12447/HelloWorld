import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function useDataFetching(fetchData, { isControlled = false, check = true } = {}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const controlledFetchData = useCallback(() => {
        setIsLoading(true)
        return fetchData(dispatch).catch(e => setError(e.message)).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        !isControlled && check && controlledFetchData()
    }, [])

    if (isControlled) return { isLoading, error, controlledFetchData }
    return { isLoading, error }
}