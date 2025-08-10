import React from 'react'
import {  Link } from "react-router-dom"
import { Home,ChevronRight } from 'lucide-react'

function BreadCrumb({slug,listName,detailName}) {
  return (
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                <Home className='h-4 w-4'/>
              </Link>
              <span>
                <ChevronRight className="w-4 h-4"/>
              </span>
              <Link to={`/${slug}`} className="hover:text-blue-600 transition-colors">
                {listName}
              </Link>
              <span>
                <ChevronRight className="w-4 h-4"/>
              </span>
              <span className="text-gray-900">{detailName}</span>
            </div>
          </div>
        </div>

  )
}

export default BreadCrumb
