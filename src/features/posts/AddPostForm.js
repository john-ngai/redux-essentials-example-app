// Packages
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Redux
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  // const users = useSelector((state) => state.users)
  const users = useSelector(selectAllUsers)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        /** 
         * createAsyncThunk will handle any errors internally, so that we won't
         * see any messages about 'rejected Promises' in our logs. However, it's
         * common to want to write logic that looks at the success or failure of
         * the actual request that was made. Redux Toolkit adds a .unwrap()
         * function to the returned Promise, which will return a new Promise that
         * either has the actual action.payload value from a fulfilled action, or
         * throws an error if it's the rejected action.
         */
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="" />
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
