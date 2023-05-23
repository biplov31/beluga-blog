import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({value, handleChange}) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
  
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ indent: '-1'}, { indent: '+1' }],
  
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
  
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }
  
  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align', 'list', 'indent',
    'header',
    'link', 'image', 'video',
    'color', 'background',
    'clean',
  ]

  return (
    <ReactQuill 
      value={value} 
      modules={modules} 
      formats={formats} 
      onChange={handleChange} 
    />
  )
}