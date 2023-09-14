import React from 'react'
import AdminHeader from '../../header/adminHeader/AdminHeader.js'
import ViewProduct from './viewproduct/ViewProduct.js'
import { AllData } from '../home/DataContext.js'
import AddProduct from './addproduct/AddProduct.js'

function AdminHome() {
  return (
    <div>
      
        <AdminHeader/>
        <AllData>
        <ViewProduct/>
        </AllData>
        
       
       
    </div>
  )
}

export default AdminHome