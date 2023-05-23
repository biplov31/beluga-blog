import Skeleton from "./Skeleton";

export default function SkeletonPost({ hasImage, textCount }) {
  return (
    <div className="skeleton-post">
      {hasImage && <Skeleton classes="image" />}
      <Skeleton classes="title width-50" />
      {/* <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" />
      <Skeleton classes="text width-100" /> */}
      {Array.from(Array(textCount).keys()).map(i => {
        return <Skeleton key={i} classes="text width-100" />
      })}
    </div>
  )
}