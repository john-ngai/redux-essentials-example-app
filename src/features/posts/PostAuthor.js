import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  return <span>by {author ? author.name : 'unknown author'}</span>
}
