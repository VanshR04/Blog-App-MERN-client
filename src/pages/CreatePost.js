import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom"

const module = {toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]}
  const format = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export default function CreatePost(){
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [file,setFile] = useState('')
    const [redirect,setRedirect] = useState(false)

async function createNewPost(ev){
    const data = new FormData()
    data.set('title',title)
    data.set('summary',summary)
    data.set('content',content)
    data.set('file',file[0])
    ev.preventDefault()
    console.log(data)
    const response = await fetch('http://localhost:4000/post',{
        method : 'POST',
        body : data,
        credentials : 'include'
    })
    console.log(response)
    if(response.ok){
        setRedirect(true)
    }
    
}
    if(redirect){
        console.log('yay');
        return <Navigate to={'/'} />
    }
    return(
        <form onSubmit={createNewPost}>
            <input 
            type="text" 
            placeholder="Title" 
            value = {title} 
            onChange={ev => setTitle(ev.target.value)}/>
            <input 
            type="text" 
            placeholder="Summary" 
            value = {summary} 
            onChange={ev => setSummary(ev.target.value)}/>
            <input type="file" 
            onChange={ev => setFile(ev.target.files)}/>
            <ReactQuill 
            value={content} 
            modules = {module} 
            formats={format}
            onChange={newValue => setContent(newValue)}/>
            <button 
            style={{marginTop : '10px'}}>Create Post</button>
        </form>
    )
}