import './Skeleton.css';

export default function Skeleton({ classes }) {
  const classNames = `skeleton ${classes} animate-pulse`;

  return <div className={classNames}></div>
}