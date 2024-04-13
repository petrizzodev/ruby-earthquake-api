import '../../index.css';

export default function Pagination({ setPage, page }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} class='btn-primary'>
                Anterior
            </button>
            <span>Página {page}</span>
            <button onClick={() => setPage((prevPage) => prevPage + 1)} class='btn-primary'>
                Siguiente
            </button>
        </div>
    );
}