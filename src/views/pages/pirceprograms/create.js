import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import axios from 'axios'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react'

export default function programs() {
  const [data, setData] = useState([])
  const [routesdata, setroutesData] = useState([])
  const [name, setname] = useState('')
  const [country, setcountry] = useState('')
  const [person, setperson] = useState('')
  const [price, setprice] = useState('')
  const [day, setday] = useState('')
  const [night, setnight] = useState('')
  const [rate, setrate] = useState('')
  const [image, setimage] = useState('')
  const [type, settype] = useState('')
  const [descreption, setdescreption] = useState('')
  const [cites, setcites] = useState([
    {
      name: '',
      image: '',
      days: [
        {
          day: '',
          title: '',
          desc: '',
        },
      ],
    },
  ])
  const [active, setactive] = useState(true)

  useEffect(() => {
    fetch('http://wesamelnagah.com:4000/api/category')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  }, [])
  console.log(data)
  useEffect(() => {
    fetch('http://wesamelnagah.com:4000/api/routespage')
      .then((res) => res.json())
      .then((data) => {
        setroutesData(data.data)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Make an API request to send the form data
      await axios.post('http://wesamelnagah.com:4000/api/priceprogrammes', {
        name,
        person,
        price,
        day,
        night,
        rate,
        image,
        type,
        active,
        country,
        descreption,
        cites,
      })
      // Reset the form fields after successful submission
      setname('')
      setperson('')
      setprice('')
      setday('')
      setnight('')
      setrate('')
      setimage('')
      settype('')
      setcountry('')
      setactive(true)
      setdescreption('')
      setcites([
        {
          name: '',
          image: '',
          days: [
            {
              day: '',
              title: '',
              desc: '',
            },
          ],
        },
      ])
      // Reset other form fields as needed
    } catch (error) {
      console.log(error)
    }
  }
  const handleCityNameChange = (e, index) => {
    const updatedCites = [...cites]
    updatedCites[index].name = e.target.value
    setcites(updatedCites)
  }

  const handleCityImageChange = (e, index) => {
    const updatedCites = [...cites]
    updatedCites[index].image = e.target.value
    setcites(updatedCites)
  }

  const handleDayChange = (e, cityIndex, dayIndex, field) => {
    const updatedCites = [...cites]
    updatedCites[cityIndex].days[dayIndex][field] = e.target.value
    setcites(updatedCites)
  }
  const handleNumberOfDaysChange = () => {
    setcites((prevState) => [
      ...prevState,
      {
        name: '',
        image: '',
        days: [
          {
            day: '',
            title: '',
            desc: '',
          },
        ],
      },
    ])
  }

  const handleAddCityChange = () => {
    setcites((prevState) => [
      ...prevState,
      {
        name: '',
        image: '',
        days: [
          {
            day: '',
            title: '',
            desc: '',
          },
        ],
      },
    ]);
  };
  

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
                <CFormLabel htmlFor="formFile">صورة الوجهة</CFormLabel>
                <CFormInput type="file" id="formFile" onChange={(e) => setimage(e.target.value)} />
              </div>
              <CFormLabel htmlFor="exampleFormControlInput1">الدولة</CFormLabel>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => setcountry(e.target.value)}
              >
                <option>Open this select menu</option>
                {routesdata.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </CFormSelect>
              <CFormLabel htmlFor="exampleFormControlInput1">التصنيف</CFormLabel>

              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => settype(e.target.value)}
              >
                <option>Open this select menu</option>
                {data.map((item, index) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </CFormSelect>

              <CFormLabel htmlFor="exampleFormControlInput1"> عدد الايام</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setday(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1">عدد الليالي </CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setnight(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> التقييم</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setrate(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1">عدد الاشخاص </CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setperson(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> السعر</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setprice(e.target.value)}
              />
              <CFormLabel htmlFor="exampleFormControlInput1"> الوصف</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                onChange={(e) => setdescreption(e.target.value)}
              />
              <CForm>
                {cites.map((city, cityIndex) => (
                  <div key={cityIndex} className="mb-3">
                    <CForm>
                      <div className="mb-3">
                        <CFormLabel htmlFor={`cityName${cityIndex}`}>اسم المدينة</CFormLabel>
                        <CFormInput
                          type="text"
                          id={`cityName${cityIndex}`}
                          value={city.name}
                          onChange={(e) => handleCityNameChange(e, cityIndex)}
                        />
                        <CFormLabel htmlFor={`cityImage${cityIndex}`}>الصورة</CFormLabel>
                        <CFormInput
                          type="text"
                          id={`cityImage${cityIndex}`}
                          value={city.image}
                          onChange={(e) => handleCityImageChange(e, cityIndex)}
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
                      </div>
                    </CForm>
                  </div>
                ))}
              </CForm>

              <div style={{ paddingTop: '16px' }}>
                <CButton color="primary" onClick={handleAddCityChange}>
                  اضافة مدينة
                </CButton>
              </div>
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
