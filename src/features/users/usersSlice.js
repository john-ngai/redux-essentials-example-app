import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    // Immer also allows us to update the state by returning a new result.
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
  },
})

export default usersSlice.reducer
