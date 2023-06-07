import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams, Navigate } from "react-router-dom"
import { UserContext } from "../src/UserContext";
import SkeletonPost from "../components/skeleton/SkeletonPost";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [showDialogue, setShowDialogue] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [comment, setComment] = useState('');
  const [existingComments, setExistingComments] = useState(null);

  const params = useParams();
  // when this page mounts, we want to grab the information of the page
  useEffect(() => {
    fetch(`http://localhost:4000/post/${params.id}`)
      .then(response => {
        response.json().then(postDoc => {
          setPostInfo(postDoc);
        }) 
      })

    fetch(`http://localhost:4000/post/getComments/${params.id}`)
      .then(response => {
        response.json().then(commentsDoc => {
          setExistingComments(commentsDoc);
          console.log(existingComments);
        })
      })
  }, [])

  if (!postInfo) return <SkeletonPost hasImage={true} textCount={5} />;

  const handleDelete = async () => {
    // when using 'fetch', URL we pass is relative to the current domain that is hosting the application. 
    // when we use a relative URL like `/delete', the browser treats it as a URL relative to the current page's URL: if we're on the page 'http://localhost:3000/posts', the URL would resolve to 'http://localhost:3000/delete'. However, our server is running on a different port ('4000') than our frontend application ('3000').
    // thus we need to provide an absolute URL that includes the correct domain and port number for our server: 'http://localhost:4000/delete' to specify the full URL of our backend API endpoint
    const response = await fetch(`http://localhost:4000/post/delete/${postInfo._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
      // body: JSON.stringify({postId: postInfo._id})
    })

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  const addComment = async () => {
    if (!comment) {
      return
    }
    const response = await fetch (`http://localhost:4000/post/addComment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({postId: postInfo._id, comment, userId: userInfo.id}),
      credentials: 'include'
    })
    if (response.ok) {
      window.location.reload();
    }
  }

  const deleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:4000/post/deleteComment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({commentToDelete: commentId}),
      credentials: 'include'
    })
    if (response.ok) {
      window.location.reload();
    }
  }

  return (
    <div className="post-container">
      <div className="post-image">
        <img src={`http://localhost:4000/${postInfo.image}`} alt="" />
      </div>

      {userInfo?.id === postInfo.author._id && <div className="post-btn">
        <Link to={`/editpost/${postInfo._id}`} className="edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Edit post            
        </Link>  
        <button className="delete-btn" onClick={() => setShowDialogue(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Delete post 
        </button>
      </div>}

      {showDialogue && <div className="confirm-dialogue">
        <span>Are you sure you want to delete this post?</span>
        <button className="confirm-delete-btn delete-btn" onClick={handleDelete}>Delete</button>
        <button className="cancel-delete-btn" onClick={() => setShowDialogue(false)}>Cancel</button>
      </div>}
      {showDialogue && <div className="overlay" />}

      <div className="post-title">
        <h1>{postInfo.title}</h1>
        <a className="author">by {postInfo.author.username}</a>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{__html: postInfo.content}} />

      <section className="comment-section">
        <h2>Comment Section</h2>
        <form action="" className="comment-form">
          <textarea type="text" onChange={e => setComment(e.target.value)}  value={comment} placeholder="Write a comment..." />
          <button onClick={addComment} disabled={comment ? false : true}>Submit</button>
        </form>
        {existingComments && <div className="comment-container">
          {existingComments.map(comment => (
            <div className="comment" key={comment._id}>
              <div className="comment-info">
                <div>
                  <strong>{comment.author.username}</strong>
                  <span>{formatISO9075(new Date(comment.createdAt), {representation: 'date'})}</span>
                </div>
                {userInfo?.id === comment.author._id && <svg onClick={() => deleteComment(comment._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>}
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>}
      </section>
      
    </div>
  )
}