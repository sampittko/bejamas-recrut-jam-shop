import { useEffect, useReducer } from "react"

const LOCAL_STORAGE_KEY = "cart"

const actionTypes = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  SUBMIT: "SUBMIT",
}

function shoppingCartReducer(items, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return [...items, action.item]
    case actionTypes.REMOVE_ITEM:
      return items.filter((item) => item !== action.item)
    case actionTypes.SUBMIT:
      return []
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

  function addItem(item) {
    updateItems({
      type: actionTypes.ADD_ITEM,
      item,
    })
  }

  function removeItem(item) {
    updateItems({
      type: actionTypes.REMOVE_ITEM,
      item,
    })
  }

  function submit() {
    updateItems({
      type: actionTypes.SUBMIT,
    })
  }

  const isEmpty = items.length === 0
  const itemsCount = items.length

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return [items, addItem, removeItem, submit, isEmpty, itemsCount]
}
