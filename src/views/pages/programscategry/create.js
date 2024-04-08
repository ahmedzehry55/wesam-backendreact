import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar, DocsExample } from '../../../components'
import axios from 'axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
export default function programs() {
  const [name, setname] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000/api/category', {
        name,
      })
      setname('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1"> عنوان التصنيف</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
          
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton color="primary" type='submit'>Submit</CButton>
           
            </div>
          </CForm>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
