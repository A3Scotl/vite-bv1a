import React from 'react'

function TextHeaderSection({title,description}) {
  return (
     <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
                {description}
             
            </p>
          </div>
        </div>
      </section>
  )
}

export default TextHeaderSection;