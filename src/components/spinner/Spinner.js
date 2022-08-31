import loader from './loader.gif'
import './spinner.scss'

const Spinner = () => {
  return (
    <div className='spinner'><img src={loader} alt="loading..." /></div>
  )
}

export default Spinner