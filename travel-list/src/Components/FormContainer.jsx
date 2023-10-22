
import { useState } from 'react';
export default function FormContainer({ addItemHandler }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description) return;
        const newItem = { description, quantity, isPacked: false, id: Date.now() };
        addItemHandler(newItem);
        setDescription('');
        setQuantity(1);
    };

    return (
        <form className="form-field" onSubmit={(event) => handleSubmit(event)}>
            <h3>What do you need for your 😍 trip?</h3>
            <select name="itemNumber" id="itemNumber" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array(20).fill(0).map((x, index) => (<option value={index + 1} key={index + 1}>{index + 1}</option>))}
            </select>
            <input type="text" placeholder="item..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">ADD</button>
        </form>
    );
};