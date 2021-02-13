import { createContext, useEffect, useReducer } from "react"

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
      return items.filter((item) => item.slug !== action.item.slug)
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

  const isEmpty = items.length === 0
  const itemsCount = items.length

  function addItem(itemToAdd) {
    if (!itemToAdd) {
      throw new Error(`Specify item that needs to be added first`)
    }

    const { slug, name, image, price } = itemToAdd

    if (!slug || !name || !image || !price) {
      throw new Error(`Cannot add item since there is some missing data`)
    }

    updateItems({
      type: actionTypes.ADD_ITEM,
      item: {
        slug,
        name,
        image,
        price,
      },
    })
  }

  function removeItem(itemToRemove) {
    if (!itemToRemove) {
      throw new Error(`Specify item that needs to be removed first`)
    }

    if (!itemToRemove.slug) {
      throw new Error(`Cannot remove item since there is some missing data`)
    }

    if (items.every((item) => item.slug !== itemToRemove.slug)) {
      throw new Error(
        `Cannot remove item which is not inside the shopping cart`
      )
    }

    updateItems({
      type: actionTypes.REMOVE_ITEM,
      item: itemToRemove,
    })
  }

  function submit() {
    if (isEmpty) {
      throw new Error(`Cannot submit empty shopping cart`)
    }

    updateItems({
      type: actionTypes.SUBMIT,
    })
  }

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return [
    { items, itemsCount, isEmpty },
    { addItem, removeItem, submit },
  ]
}

export const ShoppingCartContext = createContext()
