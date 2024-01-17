import { useState } from 'react';
import List from './List';

export default function ListContainer({ data, cancelItemsHandler, onToggleItems }) {
    const [sortBy, setSortBy] = useState('input');
    let listItem;
    if (sortBy === 'input') listItem = data;
    if (sortBy === 'description') {
        listItem = [...data].sort((a, b) => a.description.localeCompare(b.description));
    }
    if (sortBy === 'isPacked') {
        listItem = [...data].sort((a, b) => Number(a.isPacked) - Number(b.isPacked));
    }

    return <div className="list-container">
        <h3>Create your own list</h3>
        <ul>
            {listItem.length > 0 && listItem.map((item, index) => {
                return <List {...item} key={index} cancelItemsHandler={cancelItemsHandler} onToggleItems={onToggleItems} />
            }
            )}
        </ul>
        <div className="sortContainer actions">
            <select name="status" id="status" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="input">Sort By Input Order</option>
                <option value="description">Sort By Description</option>
                <option value="isPacked">Sort By Packed Status</option>
            </select>
            <button onClick={(e) => cancelItemsHandler(e)}>Clear List</button>
        </div>
    </div>;
}