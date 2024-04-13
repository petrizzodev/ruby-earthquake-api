import { useState, useEffect } from 'react';
import '../../index.css';
import Searcher from '../molecules/Searcher';
import CardFeatures from '../molecules/CardFeatures';
import Pagination from '../molecules/Pagination';

export default function Features() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [magType, setMagType] = useState([]); 

    const generateApiUrl = () => {
        
        let apiUrl = `http://127.0.0.1:3000/api/features?page=${page}&per_page=${perPage}`;
        
        const filteredMagType = magType.filter(type => type.trim() !== '');
        
        if (filteredMagType.length > 0) {
            const magTypeParams = filteredMagType.map(type => `&mag_type[]=${type}`).join('');
            apiUrl += magTypeParams;
        }
    
        return apiUrl;
    };

    const fetchData = async () => {
        const apiUrl = generateApiUrl(); 
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, perPage, magType]);

    return (
        <main style={{ width: '80vw', margin: 'auto' }}>
            <div className='card'>
                <div className='card-body'>
                <h5 className='card-title'>Valores posibles para filtrar:</h5>
                    <p className='card-text'><strong>md</strong></p>
                    <p className='card-text'><strong>ml</strong></p>
                    <p className='card-text'><strong>ms</strong></p>
                    <p className='card-text'><strong>mw</strong></p>
                    <p className='card-text'><strong>me</strong></p>
                    <p className='card-text'><strong>mi</strong></p>
                    <p className='card-text'><strong>mb</strong></p>
                    <p className='card-text'><strong>mlg</strong></p>
                </div>
            </div>
            <Searcher setMagType={setMagType} />
            {data === null || data.length === 0 ? (
                <div className="alert-warning" role="alert">
                    No hay resultados, por favor verifica que estés usando los valores para filtrar
                </div>
            ) : (
                data.map((feature) => (
                    <CardFeatures key={feature.id} data={feature} />
                ))
            )}
            <Pagination setPage={setPage} page={page} />
        </main>
    );
}