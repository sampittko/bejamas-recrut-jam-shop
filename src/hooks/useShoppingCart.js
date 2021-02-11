import { useEffect, useReducer } from "react"

const LOCAL_STORAGE_KEY = "cart"

export const actionTypes = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
}

function shoppingCartReducer(items, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return [...items, action.item]
    case actionTypes.REMOVE_ITEM:
      return items.filter((item) => item !== action.item)
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function init(initialItems) {
  const itemsInLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (itemsInLocalStorage) {
    return JSON.parse(itemsInLocalStorage)
  }
  return initialItems
}

export default function useShoppingCart(initialItems = []) {
  const [items, updateItems] = useReducer(
    shoppingCartReducer,
    initialItems,
    init
  )

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return [items, updateItems]
}
