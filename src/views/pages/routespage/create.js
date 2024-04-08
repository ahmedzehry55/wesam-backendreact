import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import axios from 'axios'

import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea } from '@coreui/react'
export default function programs() {
  const [name, setname] = useState('')
  const [active, setActive] = useState(false)
  const [image, setimage] = useState('')
  const [para, setpara] = useState('')
  const [desc, setdesc] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Make an API request to send the form data
      await axios.post('http://localhost:4000/api/routespage', {
        name,
        active,
        image,
        para,
        desc,
      })
      // Reset the form fields after successful submission
      setname('')
      setimage('')
      setActive(false)
      setpara('')
      setdesc([])

      // Reset other form fields as needed
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        {/* <div className="body flex-grow-1">
          <div className="programs_container_inner">
            <div className="programs_container_inner_taple_title">
              <h3>إضافه برنامج سياحى جديد</h3>
            </div>
            <form className="programs_container_inner_form" onSubmit={handleSubmit}>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">عنوان البرنامج</label>
                <input
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input_title"
                ></input>
              </div>

              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">عدد الاشخاص</label>
                <input
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">سعر البرنامج</label>
                <input
                  onChange={(e) => setProgramPrice(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">عدد الايام</label>
                <input
                  onChange={(e) => setNumofday(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                {' '}
                <label className="programs_container_inner_form_label">عدد اليالى</label>
                <input
                  onChange={(e) => setnumofnight(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">التقييم</label>
                <input
                  onChange={(e) => setrate(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">صوره البرنامج </label>
                <input
                  onChange={(e) => setimage(e.target.value)}
                  type="text"
                  className="programs_container_inner_form_input"
                ></input>
              </div>
              <div className="programs_container_inner_form_div">
                <label className="programs_container_inner_form_label">التصنيف</label>
                <select
                  value={category}
                  onChange={(e) => setcategory(e.target.value)}
                  className="programs_container_inner_form_select"
                >
                  {data.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                className="programs_container_inner_form_input_submit"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div> */}
        <div className="body flex-grow-1">
          <div className="programs_container_inner_taple_title">
            <h3>إضافه وجهة سياحية جديدة</h3>
          </div>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">
                حالة العرض في الصفحة الرئيسية
              </CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setActive(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> عنوان الوجهة</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setname(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> وصف الوجهة</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setpara(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> مدن الوجهة</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setdesc(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="formFile">صورة الوجهة</CFormLabel>
              <CFormInput type="file" id="formFile" onChange={(e) => setimage(e.target.value)} />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </div>
          </CForm>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
