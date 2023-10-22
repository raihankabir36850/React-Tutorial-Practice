export default function List({ quantity, description, isPacked, id, cancelItemsHandler, onToggleItems }) {

    return (
        <li key={id}>
            <input type="checkbox" value={isPacked} onChange={() => onToggleItems(id)} />
            <span style={isPacked === true ? { textDecoration: 'line-through' } : {}}>{quantity} {description}</span>
            <button onClick={(e) => cancelItemsHandler(e, id)}>&times;</button>
        </li>
    )
}