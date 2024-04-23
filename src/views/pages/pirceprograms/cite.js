import React, { useEffect, useState } from 'react';
import { AppFooter, AppHeader, AppSidebar } from '../../../components';
import axios from 'axios';
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormTextarea } from '@coreui/react';

export default function programs() {
  const [cites, setcites] = useState({
    name: '',
    image: '',
    days: [
      {
        day: '',
        title: '',
        desc: '',
      },
    ],
  });

  const handleNumberOfDaysChange = () => {
    setcites((prevState) => ({
      ...prevState,
      days: [...prevState.days, {}],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API request to send the form data
      await axios.post('http://wesamelnagah.com:4000/api/aprogrammes', {
        cites,
      });
      // Reset the form fields after successful submission
      setcites({
        name: '',
        image: '',
        days: [
          {
            day: '',
            title: '',
            desc: '',
          },
        ],
      });
      // Reset other form fields as needed
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityNameChange = (e) => {
    setcites((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleCityImageChange = (e) => {
    setcites((prevState) => ({
      ...prevState,
      image: e.target.value,
    }));
  };

  const handleDayChange = (index, field, value) => {
    setcites((prevState) => {
      const updatedDays = [...prevState.days];
      updatedDays[index][field] = value;
      return {
        ...prevState,
        days: updatedDays,
      };
    });
  };

  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="cityName">اسم المدينة</CFormLabel>
                  <CFormInput
                    type="text"
                    id="cityName"
                    value={cites.name}
                    onChange={handleCityNameChange}
                  />
                  <CFormLabel htmlFor="cityImage">الصورة</CFormLabel>
                  <CFormInput
                    type="text"
                    id="cityImage"
                    value={cites.image}
                    onChange={handleCityImageChange}
                  />

                  {cites.days.map((day, index) => (
                    <div key={index}>
                      <CFormLabel htmlFor={`dayName${index}`}>اسم اليوم</CFormLabel>
                      <CFormInput
                        type="text"
                        id={`dayName${index}`}
                        value={day.day}
                        onChange={(e) => handleDayChange(index, 'day', e.target.value)}
                      />
                      <CFormLabel htmlFor={`dayTitle${index}`}>عنوان اليوم</CFormLabel>
                      <CFormInput
                        type="text"
                        id={`dayTitle${index}`}
                        value={day.title}
                        onChange={(e) => handleDayChange(index, 'title', e.target.value)}
                      />
                      <CFormLabel htmlFor={`dayDesc${index}`}>محتوى اليوم</CFormLabel>
                      <CFormInput
                        type="text"
                        id={`dayDesc${index}`}
                        value={day.desc}
                        onChange={(e) => handleDayChange(index, 'desc', e.target.value)}
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

            <div className="d-grid gap-2 col-6 mx-auto">
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </div>
          </CForm>
        </div>
      </div>
    </div>
  );
}
