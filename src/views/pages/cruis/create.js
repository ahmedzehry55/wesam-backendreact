import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import axios from 'axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

export default function programs() {
  const [data, setData] = useState([])
  const [routesdata, setroutesData] = useState([])
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [image, setimage] = useState('')
  const [desc, setdescreption] = useState([])
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
  const [active, setactive] = useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Make an API request to send the form data
      await axios.post('http://wesamelnagah.com:4000/api/Cruiseprogrammes', {
        name,
        price,
        image,
        active,
        desc,
        singlecruise,
      })
      // Reset the form fields after successful submission
      setname('')
      setprice('')
      setimage('')
      setactive(true)
      setdescreption([''])
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
      // Reset other form fields as needed
    } catch (error) {
      console.log(error)
    }
  }
  const handledescChange = (e, index) => {
    const descupdate = [...desc]
    descupdate[index] = e.target.value
    setdescreption(descupdate)
  }
  const handleNumberOfdescChange = () => {
    setdescreption((prevState) => [...prevState, '']) // Add a new empty description item
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
    const newDayForm = ['']
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[0].date.push(newDayForm)
    setsinglecruise(updatesinglecruise)
  }
  const handleclassesChange = (e, cityIndex, classIndex, field) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[cityIndex].classes[classIndex][field] = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handleNumberOfclassesChange = () => {
    const newClassForm = {
      type: '',
      price: '',
    }
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[0].classes.push(newClassForm)
    setsinglecruise(updatesinglecruise)
  }
  const handleroomoptionsChange = (e, cityIndex, roomIndex, field) => {
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[cityIndex].roomoptions[roomIndex][field] = e.target.value
    setsinglecruise(updatesinglecruise)
  }

  const handleNumberOfroomoptionsChange = () => {
    const newRoomOption = {
      image: '',
      title: '',
      desc: '',
    }
    const updatesinglecruise = [...singlecruise]
    updatesinglecruise[0].roomoptions.push(newRoomOption)
    setsinglecruise(updatesinglecruise)
  }
  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1"> عنوان البرنامج</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setname(e.target.value)}
              />
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">صورة البرنامج</CFormLabel>
                <CFormInput type="file" id="formFile" onChange={(e) => setimage(e.target.value)} />
              </div>
              <CFormLabel htmlFor="exampleFormControlInput1"> السعر</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setprice(e.target.value)}
              />
              {desc.map((description, index) => (
                <div key={index} className="mb-3">
                  <CFormLabel htmlFor={`description${index}`}>اسم المدينة</CFormLabel>
                  <CFormInput
                    type="text"
                    id={`description${index}`}
                    value={description}
                    onChange={(e) => handledescChange(e, index)}
                  />
                </div>
              ))}
              <div style={{ paddingTop: '16px' }}>
                <CButton color="primary" onClick={handleNumberOfdescChange}>
                  اضافة مدينة
                </CButton>
              </div>
              <CForm>
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
                        <CFormLabel htmlFor={`cityStartData${cityIndex}`}>
                          تاريخ بدأ الرحلة
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id={`cityStartData${cityIndex}`}
                          value={city.startData}
                          onChange={(e) => handlestartdateChange(e, cityIndex)}
                        />
                        {city.date.map((day, dayIndex) => (
                          <div key={dayIndex}>
                            <CFormLabel htmlFor={`dayName${cityIndex}-${dayIndex}`}>
                              تاريخ اخر للانطلاق
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`dayName${cityIndex}-${dayIndex}`}
                              value={day}
                              onChange={(e) => handledateChange(e, cityIndex, dayIndex, 'day')}
                            />
                          </div>
                        ))}
                        <div style={{ paddingTop: '16px' }}>
                          <CButton color="primary" onClick={handleNumberOfdateChange}>
                            اضافة تاريخ اخر
                          </CButton>
                        </div>
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

                        {city.classes.map((classItem, classIndex) => (
                          <div key={classIndex}>
                            <CFormLabel htmlFor={`classType${cityIndex}-${classIndex}`}>
                              اسم الفئة
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`classType${cityIndex}-${classIndex}`}
                              value={classItem.type}
                              onChange={(e) =>
                                handleclassesChange(e, cityIndex, classIndex, 'type')
                              }
                            />
                            <CFormLabel htmlFor={`classPrice${cityIndex}-${classIndex}`}>
                              سعر الفئة
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`classPrice${cityIndex}-${classIndex}`}
                              value={classItem.price}
                              onChange={(e) =>
                                handleclassesChange(e, cityIndex, classIndex, 'price')
                              }
                            />
                          </div>
                        ))}
                        <div style={{ paddingTop: '16px' }}>
                          <CButton color="primary" onClick={handleNumberOfclassesChange}>
                            اضافة فئة
                          </CButton>
                        </div>
                        {city.roomoptions.map((room, roomIndex) => (
                          <div key={roomIndex}>
                            <CFormLabel htmlFor={`roomTitle${cityIndex}-${roomIndex}`}>
                              عنوان الغرفة
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`roomTitle${cityIndex}-${roomIndex}`}
                              value={room.title}
                              onChange={(e) =>
                                handleroomoptionsChange(e, cityIndex, roomIndex, 'title')
                              }
                            />
                            <CFormLabel htmlFor={`roomImage${cityIndex}-${roomIndex}`}>
                              صورة الغرفة
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`roomImage${cityIndex}-${roomIndex}`}
                              value={room.image}
                              onChange={(e) =>
                                handleroomoptionsChange(e, cityIndex, roomIndex, 'image')
                              }
                            />
                            <CFormLabel htmlFor={`roomDesc${cityIndex}-${roomIndex}`}>
                              وصف الغرفة
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id={`roomDesc${cityIndex}-${roomIndex}`}
                              value={room.desc}
                              onChange={(e) =>
                                handleroomoptionsChange(e, cityIndex, roomIndex, 'desc')
                              }
                            />
                          </div>
                        ))}
                        <div style={{ paddingTop: '16px' }}>
                          <CButton color="primary" onClick={handleNumberOfroomoptionsChange}>
                            اضافة غرفة
                          </CButton>
                        </div>
                      </div>
                    </CForm>
                  </div>
                ))}
              </CForm>
              <CFormLabel htmlFor="exampleFormControlInput1"> الحالة</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                options={[
                  { label: 'فعال', value: true },
                  { label: 'غير فعال', value: false },
                ]}
                onChange={(e) => setactive(e.target.value)}
              />
            </div>

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
