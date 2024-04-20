import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar, DocsExample } from '../../../components'
import axios from 'axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
export default function programs() {
  const [name, setname] = useState('')
  const [image, setimage] = useState('')
  const [pathname, setpath] = useState('')
  const [title, settitle] = useState(name)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000/api/maincategory', {
        name,
        image,
        pathname,
        title
      })

      setname('')
      setimage('')
      setpath('')
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
              <CFormLabel htmlFor="exampleFormControlInput1"> عنوان الباقة</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setname(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> مسار الباقة</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setpath(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">صورة الباقة</CFormLabel>
              <CFormInput type="file" id="formFile" onChange={(e) => setimage(e.target.value)} />
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
