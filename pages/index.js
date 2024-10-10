import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    const { data } = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      fetchItems();
      setTitle('');
      setDescription('');
    }
  };

  const deleteItem = async (id) => {
    const res = await fetch('/api/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchItems(); // Refresh the list after deletion
    }
  };


  return (
    <div>
      <h1>Simple CRUD with Next.js & Mongoose</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <h2>Items List</h2>
      <ul>
        {items?.map((item) => (
          <li key={item._id}>
            <strong>{item.title}</strong>: {item.description}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

