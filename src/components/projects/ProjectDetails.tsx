import React, { useContext } from 'react'
import { useProjectHomeContext } from '@/contexts/ProjectHomeContext'

const ProjectDetails: React.FC = () => {
  const { project, isLoading, error } = useProjectHomeContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  // Render project details...

  return (
    <div>Project Details</div>
  )
}

export default ProjectDetails 