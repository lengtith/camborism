// actions.ts
import { Dispatch } from "react";
import { Action } from "./reducer";
import { Item } from "./reducer";

export const fetchItems = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "FETCH_ITEMS_REQUEST" });

  console.log("Data :");
  try {
    const response = await fetch("/api/destinations");
    const data: Item[] = await response.json();
    dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "FETCH_ITEMS_FAILURE",
      payload: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const createItem =
  (item: Item) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" }
      });
      const newItem: Item = await response.json();
      dispatch({ type: "CREATE_ITEM", payload: newItem });
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

export const updateItem =
  (item: Item) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" }
      });
      const updatedItem: Item = await response.json();
      dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

export const deleteItem =
  (id: number) => async (dispatch: Dispatch<Action>) => {
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_ITEM", payload: id });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

export const findItem = (id: number) => (dispatch: Dispatch<Action>) => {
  dispatch({ type: "FIND_ITEM", payload: id });
};
