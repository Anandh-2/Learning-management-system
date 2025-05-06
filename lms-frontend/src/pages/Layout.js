import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import '../styles/Layout.css'

function Layout() {
  return (
    <div className='layout'>
        <Sidebar/>
        <main className='main-container'>
            <Header/>
            <Outlet/>
        </main>
    </div>
  )
}

export default Layout