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
    fetch('http://localhost:4000/api/routespage')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  }, [])
  const deletehandle = async (e, { id }) => {
    e.preventDefault()
    try {
      await axios.delete(`http://localhost:4000/api/routespage/${id}`)
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
          <div className="programs_container_inner_taple_title">
            <h3>عرض كافه الوجهات السياحيه</h3>
          </div>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">الصوره</CTableHeaderCell>
                <CTableHeaderCell scope="col">اسم الوجهة</CTableHeaderCell>
                <CTableHeaderCell scope="col">الحالة</CTableHeaderCell>
                <CTableHeaderCell scope="col">الخصائص</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((country, index) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>
                    <img src={country.image} />
                  </CTableDataCell>
                  <CTableDataCell>{country.name}</CTableDataCell>
                  <CTableDataCell>{country.active ? 'فعال' : 'غير فعال'}</CTableDataCell>
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
                          pathname: `/maincategory/edit`,
                          state: { id: country.id },
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
