import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
const dateFns = require('date-fns')

export default function PostPage(){

    const [post,setPost] = useState(null)
    const {id} =  useParams()
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(res => {
            res.json()
            .then(postInfo => {
                setPost(postInfo)
            })
        })
    },[])

    if(!post) return ''

    return(
        <div className="post-page">        
            <h1>
                {post.title}
            </h1>
            <div className="image">
                <img src={`http://localhost:4000/${post.cover}`} />
            </div> 
            <div dangerouslySetInnerHTML={{__html:post.content}} className="content"/>
        </div>
    )
}