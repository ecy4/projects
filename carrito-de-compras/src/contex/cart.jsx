import { createContext, useReducer } from 'react'

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]

      updateLocalStorage(newState)
      return newState
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      updateLocalStorage(newState)
      return newState
    }

    case 'CLEAR_CART': {
      updateLocalStorage([])
      return []
    }

    case 'DECREMENT_QUANTITY': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)

        if (newState[productInCartIndex].quantity > 1) {
          newState[productInCartIndex].quantity -= 1
          updateLocalStorage(newState)
          return newState
        }

        const filteredState = state.filter(item => item.id !== id)
        updateLocalStorage(filteredState)
        return filteredState
      }
      return state
    }

  }

  return state
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({
    type: 'CLEAR_CART'
  })

  const decrementQuantity = product =>
    dispatch({
      type: 'DECREMENT_QUANTITY',
      payload: product
    })

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      decrementQuantity,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
