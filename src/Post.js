import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function Post({_id,title,summary,cover,content,createdAt,author}){
    return(
        <div className=  "post">  
        <Link to={`/post/${_id}`} >
        <img src = {"http://localhost:4000/"+cover} alt ="Content Image"></img>
        </Link>
        <div className=  "text">
        <h2>{title}</h2>
        <p className = "info">
          <a className = "author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className = "Summary">{summary}</p>
        </div>
      </div>
    )
}

export default Post