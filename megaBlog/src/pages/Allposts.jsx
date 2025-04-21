import React from 'react'
import service from '../appwrite/Config'
import { Container,PostCard } from '../components/index'
import { useState,useEffect } from 'react'
function AllPosts() {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
         service.getPost([]).
        then((posts)=>{
          if(posts){
            setPosts(posts.documents)
          }
        })
    },[])
  return (
    <div>
      <Container>
        <div>
          {posts.map((post)=>(
            <div key={post.$id} className='p-2 w-1/4'>
             <PostCard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts