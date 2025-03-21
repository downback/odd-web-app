import React from "react"

interface ProjectItemProps {
  title: string
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title }) => {
  return (
    <div className="border-b-2 border-stone-300 w-full h-12">
      <div className="border-t-2 border-stone-50 w-full h-12">
        <p>{title}</p>
      </div>
    </div>
  )
}

export default ProjectItem
