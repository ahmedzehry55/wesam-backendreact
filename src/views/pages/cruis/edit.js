import React, { useEffect, useState } from 'react'
import { AppFooter, AppHeader, AppSidebar } from '../../../components'
import { MdDeleteOutline } from 'react-icons/md'
import { MdOutlineEdit } from 'react-icons/md'
import { FaRegEye } from 'react-icons/fa'
import axios from 'axios';

export default function programs() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://wesamelnagah.com:4000/api/programmes')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  }, [])
  const deletehandle = async (e, { id }) => {
    e.preventDefault();
    try {
      await axios.delete(`http://wesamelnagah.com:4000/api/programmes/${id}`);

    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="programs_container">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="programs_container_inner">
            <div className="programs_container_inner_taple_title">
              <h3>عرض كافه البرامج السياحيه</h3>
            </div>
            <table className="programs_container_inner_table">
              <tr className="programs_container_inner_table_tr">
                <th className="programs_container_inner_table_tr_th">#</th>
                <th className="programs_container_inner_table_tr_th">الصوره</th>
                <th className="programs_container_inner_table_tr_th">اسم الوجهة</th>
                <th className="programs_container_inner_table_tr_th">الحالة</th>
                <th className="programs_container_inner_table_tr_th">خصائص</th>
              </tr>
              {data.map((country, index) => (
                <tr className="programs_container_inner_table_tr">
                  <td className="programs_container_inner_table_tr_td">{index}</td>
                  <td className="programs_container_inner_table_tr_td">
                    <img src={country.image} />
                  </td>
                  <td className="programs_container_inner_table_tr_td">{country.name}</td>
                  <td className="programs_container_inner_table_tr_td">{country.status}</td>
                  <td className="programs_container_inner_table_tr_td">
                    <button
                       onClick={(e) => deletehandle(e, { id: country.id })}
                      className="programs_container_inner_table_tr_td_button_delete"
                    >
                      <MdDeleteOutline />
                    </button>
                    <button className="programs_container_inner_table_tr_td_button_edit">
                      <a href="/programs/edit">
                        <MdOutlineEdit />
                      </a>
                    </button>
                    <button className="programs_container_inner_table_tr_td_button_show">
                      <FaRegEye />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
