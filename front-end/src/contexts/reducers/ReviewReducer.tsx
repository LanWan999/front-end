export const initialState = {
  username: '',
  body: '',
  favoriteCapybara: '',
}

type State = typeof initialState

type Action =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_BODY'; payload: string }
  | { type: 'SET_FAVORITECAPYBARA'; payload: string }

export const reviewFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_BODY':
      return { ...state, body: action.payload }
    case 'SET_FAVORITECAPYBARA':
      return { ...state, favoriteCapybara: action.payload }
    default:
      return state
  }
}
