import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import { MdDeleteOutline } from 'react-icons/md'
import { MdOutlineEdit } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import axios from 'axios'

import { Link } from 'react-router-dom'
import {
  CButton,
  CButtonGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
export default function programs() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/api/Cruiseprogrammes')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  }, [])
  const deletehandle = async (e, { id }) => {
    e.preventDefault()
    try {
      await axios.delete(`http://localhost:4000/api/Cruiseprogrammes/${id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">عنوان البرنامج</CTableHeaderCell>
                <CTableHeaderCell scope="col">الصورة</CTableHeaderCell>
                <CTableHeaderCell scope="col">السعر</CTableHeaderCell>
                <CTableHeaderCell scope="col">الحالة</CTableHeaderCell>
                <CTableHeaderCell scope="col">الخصائص</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((item, index) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.image}</CTableDataCell>
                  <CTableDataCell>{item.price}</CTableDataCell>
                  <CTableDataCell>{item.active ? "فعال":"غير فعال" }</CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup
                      className="tab_button"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={(e) => deletehandle(e, { id: country.id })}
                      >
                        <MdDeleteOutline />
                      </CButton>
                      <Link
                        to={{
                          pathname: `/category/edit`,
                          state: { id: item.id },
                        }}
                      >
                        <CButton color="primary" variant="outline">
                          <MdOutlineEdit />
                        </CButton>
                      </Link>
                      <CButton color="primary" variant="outline">
                        <FaRegEye />
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>

        <AppFooter />
      </div>
    </div>
  )
}
