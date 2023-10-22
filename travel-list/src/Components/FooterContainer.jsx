export default function FooterContainer({ data }) {
    const ItemCount = data.length;
    const isPackedItems = [...data].filter(item => item.isPacked).length;
    const packedParcentage = Math.round((isPackedItems / ItemCount) * 100);
    if (!ItemCount) {
        return (
            <p className="stats"><em>Start adding some items to your packing list 🚀</em></p>
        );
    }

    return (
        <p className="stats"><em>You have {ItemCount} items on your list, and you already packed {isPackedItems} ({packedParcentage}%) </em></p>
    )

};