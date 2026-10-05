import { configureStore, type Middleware, type UnknownAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import userReducer, { rollbackUser, type UserId } from './Sliice'

const persistanceLocalStorageMiddleware: Middleware = store => next => action => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const customAction = action as UnknownAction & { payload?: UserId }
  const { type, payload } = customAction
  const previousState = store.getState() as RootState
  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
        } else {
          throw new Error('Error al eliminar el usuario')
        }
      })
      .catch(err => {
        toast.error(`Error al eliminar usuario ${userIdToRemove}`)
        if (userToRemove) {
          store.dispatch(rollbackUser(userToRemove))
        }
        console.error(err)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
