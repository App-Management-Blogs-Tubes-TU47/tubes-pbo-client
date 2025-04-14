import React from 'react'
import { useParams } from 'react-router-dom'

const BlogDetailsPages: React.FC = () => {
    const params = useParams()
  return (
    <div>BlogDetailsPages {params.slug}</div>
  )
}

export default BlogDetailsPages