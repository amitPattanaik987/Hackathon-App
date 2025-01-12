import React from 'react'
import Admin from '../Components/Admin_page/Admin'
import { useFormContext } from '../Components/FormContext'
import Spinner from 'react-bootstrap/Spinner';

export default function Adminmain() {
  const { spinner } = useFormContext();
  return (
    <div>
      {!spinner ? <Admin />
        : <div className='w-[100%] flex justify-center items-center mt-[200px]'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>}
    </div>
  )
}
