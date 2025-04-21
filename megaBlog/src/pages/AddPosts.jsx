import React from 'react'
import { Container,PostForm } from "../components/index"
function AddPost() {
  return (
    <div>
        <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
        </div>
    </div>
  )
}

export default AddPost