export default function LocationPick({moves}) {
    return (
        <>
            <ol>
                {moves.map(((move, moveIndex) => (
                    <li key={moveIndex}>Vị trí hàng: {move.row}, cột: {move.col}</li>
                )))}
            </ol>
        </>
    )
}
