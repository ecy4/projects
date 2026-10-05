import type { AppDispatch, RootState } from '../store/Index'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
