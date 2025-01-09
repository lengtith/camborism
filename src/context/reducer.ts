// reducer.ts
export interface Item {
  id: number;
  name: string;
}

export interface State {
  items: Item[];
  loading: boolean;
  error: string | null;
  foundItem?: Item | null;
}

export const initialState: State = {
  items: [],
  loading: false,
  error: null,
  foundItem: null
};

export type Action =
  | { type: "FETCH_ITEMS_REQUEST" }
  | { type: "FETCH_ITEMS_SUCCESS"; payload: Item[] }
  | { type: "FETCH_ITEMS_FAILURE"; payload: string }
  | { type: "CREATE_ITEM"; payload: Item }
  | { type: "UPDATE_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "FIND_ITEM"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ITEMS_SUCCESS":
      return { ...state, loading: false, items: action.payload };
    case "FETCH_ITEMS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_ITEM":
      return { ...state, items: [...state.items, action.payload] };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };

    case "FIND_ITEM":
      return {
        ...state,
        foundItem:
          state.items.find((item) => item.id === action.payload) || null
      };

    default:
      return state;
  }
};

export default reducer;
