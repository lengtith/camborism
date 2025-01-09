"use client";
import React, { useEffect } from "react";
import { useStateContext } from "../../context/stateContext";
import { createItem, deleteItem } from "../../context/actions";
import { Item } from "../../context/reducer";

export const ListDestination: React.FC = () => {
  const { state, dispatch } = useStateContext();

  useEffect(() => {
    const fetchDestinations = async () => {
      dispatch({ type: "FETCH_ITEMS_REQUEST" });
      try {
        const response = await fetch("/api/destinations");
        const items = await response.json();
        const data: Item[] = items.data;
        dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_ITEMS_FAILURE",
          payload: error instanceof Error ? error.message : "Unknown error"
        });
      }
    };
    // Fetch items when the component mounts
    fetchDestinations();
  }, [dispatch]);

  const handleCreateItem = () => {
    const newItem: Item = { id: Date.now(), name: "New Item" };
    createItem(newItem);
  };

  const handleDeleteItem = (id: number) => {
    deleteItem(id);
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div>
      <button onClick={handleCreateItem}>Create Item</button>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
