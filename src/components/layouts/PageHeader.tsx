import React from "react"

interface PageHeaderProps {
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="w-full flex justify-center h-60 items-center border-b-2 border-stone-300">
      <div className="flex justify-center items-center  w-full h-full border-b-2 border-stone-50">
        <h1 className="text-7xl">{title}</h1>
      </div>
    </div>
  )
}

export default PageHeader
