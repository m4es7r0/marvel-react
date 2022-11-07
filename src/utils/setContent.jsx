import ErrorMessage from "../components/errorMessage/errorMessage"
import Skeleton from "../components/skeleton/Skeleton"
import Spinner from "../components/spinner/Spinner"

export const setContent = (process, data, Component) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
        case 'rejected':
            return <ErrorMessage paragraph={false} />
        case 'pending':
            return <Spinner />
        case 'idle':
            return <Component data={data} />
        default: throw new Error('Unexpected process state')
    }
}