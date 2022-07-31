
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// Components
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
// Selector function & thunk
import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
