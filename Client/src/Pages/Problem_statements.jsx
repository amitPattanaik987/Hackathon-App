import React from 'react'
import Problems from '../Components/Problems/Problems'
import { useParams } from 'react-router-dom'

function Problem_statements() {
  const { hackathon_name } = useParams();
  return (
    <div>
      <Problems hackathon_name={hackathon_name}/>
    </div>
  )
}

export default Problem_statements;
