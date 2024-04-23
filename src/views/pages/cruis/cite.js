import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import axios from 'axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

export default function programs() {
  const [singlecruise, setsinglecruise] = useState([
    {
      para: '',
      startData: '',
      date: [],
      classes: [{ type: '', price: '' }],
      roomoptions: [{ image: '', title: '', desc: '' }],
      days: [{ day: '', title: '', desc: '' }],
    },
  ])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://wesamelnagah.com:4000/api/Cruiseprogrammes/', {
        singlecruise,
      })
      setsinglecruise([
        {
          para: '',
          startData: '',
          date: [],
          classes: [{ type: '', price: '' }],
          roomoptions: [{ image: '', title: '', desc: '' }],
          days: [{ day: '', title: '', desc: '' }],
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const handleparaChange = (e, index) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[index].para = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handlestartdateChange = (e, index) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[index].startData = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handleDayChange = (e, cityIndex, dayIndex, field) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[cityIndex].days[dayIndex][field] = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handleNumberOfDaysChange = () => {
    const newDayForm = {
      day: '',
      title: '',
      desc: '',
    }
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[0].days.push(newDayForm)
    setsinglecruise(updatesinglecruise)
  }
  const handledateChange = (e, cityIndex, dayIndex, field) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[cityIndex].days[dayIndex][field] = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handleNumberOfdateChange = () => {
    const newDayForm = [""]
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[0].date.push(newDayForm)
    setsinglecruise(updatesinglecruise)
  }

  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CForm onSubmit={handleSubmit}>
            {singlecruise.map((city, cityIndex) => (
              <div key={cityIndex} className="mb-3">
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor={`cityName${cityIndex}`}>الوصف</CFormLabel>
                    <CFormInput
                      type="text"
                      id={`cityName${cityIndex}`}
                      value={city.para}
                      onChange={(e) => handleparaChange(e, cityIndex)}
                    />
                    <CFormLabel htmlFor={`cityStartData${cityIndex}`}>تاريخ بدأ الرحلة</CFormLabel>
                    <CFormInput
                      type="text"
                      id={`cityStartData${cityIndex}`}
                      value={city.startData}
                      onChange={(e) => handlestartdateChange(e, cityIndex)}
                    />
                    {city.days.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <CFormLabel htmlFor={`dayName${cityIndex}-${dayIndex}`}>
                          اسم اليوم
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id={`dayName${cityIndex}-${dayIndex}`}
                          value={day.day}
                          onChange={(e) => handleDayChange(e, cityIndex, dayIndex, 'day')}
                        />
                        <CFormLabel htmlFor={`dayTitle${cityIndex}-${dayIndex}`}>
                          عنوان اليوم
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id={`dayTitle${cityIndex}-${dayIndex}`}
                          value={day.title}
                          onChange={(e) => handleDayChange(e, cityIndex, dayIndex, 'title')}
                        />
                        <CFormLabel htmlFor={`dayDesc${cityIndex}-${dayIndex}`}>
                          محتوى اليوم
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id={`dayDesc${cityIndex}-${dayIndex}`}
                          value={day.desc}
                          onChange={(e) => handleDayChange(e, cityIndex, dayIndex, 'desc')}
                        />
                      </div>
                    ))}
                    <div style={{ paddingTop: '16px' }}>
                      <CButton color="primary" onClick={handleNumberOfDaysChange}>
                        اضافة يوم
                      </CButton>
                    </div>
                    {city.date.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <CFormLabel htmlFor={`dayName${cityIndex}-${dayIndex}`}>
                           تاريخ اخر للانطلاق
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id={`dayName${cityIndex}-${dayIndex}`}
                          value={day.day}
                          onChange={(e) => handledateChange(e, cityIndex, dayIndex, 'day')}
                        />
                      </div>
                    ))}
                    <div style={{ paddingTop: '16px' }}>
                      <CButton color="primary" onClick={handleNumberOfdateChange}>
                        اضافة تاريخ اخر
                      </CButton>
                    </div>
                  </div>
                </CForm>
              </div>
            ))}
            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    </div>
  )
}
