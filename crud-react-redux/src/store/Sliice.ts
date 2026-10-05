import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE: UserWithId[] = [
  {
    id: '1',
    name: 'Miguel Ángel Durán',
    email: 'midudev@gmail.com',
    github: 'midudev'
  },
  {
    id: '2',
    name: 'Dan Abramov',
    email: 'dan.abramov@gmail.com',
    github: 'gaearon'
  },
  {
    id: '3',
    name: 'Guillermo Rauch',
    email: 'rauchg@vercel.com',
    github: 'rauchg'
  },
  {
    id: '4',
    name: 'Evan You',
    email: 'evan@vuejs.org',
    github: 'yyx990803'
  },
  {
    id: '5',
    name: 'Tanner Linsley',
    email: 'tanner@tanstack.com',
    github: 'tannerlinsley'
  },
  {
    id: '6',
    name: 'Kent C. Dodds',
    email: 'kent@kentcdodds.com',
    github: 'kentcdodds'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  if (persistedState) {
    try {
      const parsed = JSON.parse(persistedState).users
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
      return DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  }
  return DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    }
  }
})

export const { addNewUser, deleteUserById, rollbackUser } = userSlice.actions
export default userSlice.reducer

