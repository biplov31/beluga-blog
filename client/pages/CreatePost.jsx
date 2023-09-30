import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    // because we have an image file, it is better to send the data not as json but as FormData
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    e.preventDefault();
    const response = await fetch('/post/create', {
      method: 'POST',
      body: data,
      credentials: 'include' // we have to send the cookie with our fetch request to the backend where we then get the id of the logged in user using the jwt token
    }) 
    if (response.ok) {
      setRedirect(true);
    }
  }

  // before we render any HTML of the current page, we check if we need to redirect to some other page
  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost} className='create-post'>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="file" onChange={e => setFiles(e.target.files)} />
      <Editor value={content} handleChange={setContent} />
      <button className='form-submit-btn'>Create post</button>
    </form>
  )
}