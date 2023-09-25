import { useEffect, useState } from "react";
import Post from "../components/Post";
import SkeletonPost from "../components/skeleton/SkeletonPost";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  // when we mount our home page, we want to run this function
  useEffect(() => {
    fetch('http://localhost:4000/post/').then(response => {
      response.json().then(data => {  // .json() and fetch are async functions so we need .then(), get request is default so we don't need to define a method on our fetch
        setPosts(data)
      })
    })
  }, [])

  useEffect(() => {
    const lazyLoadImages = () => {
      const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            self.unobserve(img);
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.1
      });

      const imgs = document.querySelectorAll('[data-src]');
      imgs.forEach(img => {
        observer.observe(img);
      });
    }

    lazyLoadImages();
  }, [posts]);
  
  return (
    <main className="posts">
      <h1>Recent Posts</h1>
      {!posts.length > 0 && 
      [...Array(5).keys()].map(i => {
        return <SkeletonPost key={i} hasImage={false} textCount={3} />
      })}
      {/* we are passing all the properties of post as props to out <Post /> component */}
      {posts.length > 0 && posts.map(post => <Post key={post._id} {...post} />)}  
    </main>
  )
}