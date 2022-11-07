import loader from './357.png'
import './spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'><img src={loader} alt="loading..." /></div>
  )
}

export default Spinner