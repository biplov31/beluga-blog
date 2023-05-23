import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Post({_id, title, content, image, createdAt, author}) {
  const [loaded, setLoaded] = useState(false);
  // when we place the intersection observer inside the Post component, a new instance of the observer is created for each Post component that is rendered. So each observer instance only observes the 'img' element that belong to a particular component.
  // Using the intersection observer on the parent element containing all the Posts would allow us to control the loading of all the images at once and avoid creating multiple instances of the observer.

  // useEffect(() => {
  //   const observer = new IntersectionObserver(function (entries, self) {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         loadImages(entry.target);
  //         self.unobserve(entry.target);
  //       }
  //     })
  //   }, {
  //     rootMargin: '0px',
  //     threshold: 0.1
  //   })

  //   const imgs = document.querySelectorAll('[data-src]');
  //   imgs.forEach(img => {
  //     observer.observe(img);
  //   })    
  // }, [])

  // function loadImages(image) {
  //   image.src = image.dataset.src;
  // }

  return (
    <div className="post">
      <div className="image-container">
        <Link to={`/post/${_id}`}>
          <img 
            src={""} 
            data-src={`http://localhost:4000/${image}`} 
            onLoad={() => setLoaded(true)}
            style={{
              filter: loaded ? 'blur(0px)' : 'blur(10px)',
              clipPath: !loaded && 'inset(0)',
            }}
          />
        </Link>
      </div>
      <div className="text-content">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <div className="post-info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt), {representation: 'date'})}</time>
        </div>
        <p dangerouslySetInnerHTML={{__html: content.split('.')[0] + '.'}} className="summary" />
      </div>      
    </div>
  )
}