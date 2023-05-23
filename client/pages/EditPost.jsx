import { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
        })
      })
  }, [])

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('postId', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    const response = await fetch('http://localhost:4000/post/edit', {
      method: 'PUT',
      body: data,   
      credentials: 'include'   
    });
    if (response.ok) {
      setRedirect(true)
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost} className="edit-form">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="file" onChange={e => setFiles(e.target.files)} />
      <Editor value={content} handleChange={setContent} />
      <button>Edit post</button>
      <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  )
}