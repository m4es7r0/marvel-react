import React from 'react'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import SingleChar from '../singleChar/SingleChar'

const Character = () => {
  return (
    <ErrorBoundary>
      <SingleChar />
    </ErrorBoundary>
  )
}

export default Character