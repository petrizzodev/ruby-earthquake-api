import '../../index.css';
import Comments from '../organisms/Comments';

const magTypeColors = {
    md: '#00FF00',
    ml: '#FFFF00',
    ms: '#FF0000',
    mw: '#0000FF',
    me: '#FFA500',
    mi: '#800080',
    mb: '#A52A2A',
    mlg: '#808080'
};

export default function CardFeatures({ data }) {

    const {
        id,
        attributes: {
            title,
            external_id,
            magnitude,
            place,
            time,
            tsunami,
            mag_type,
            coordinates: { longitude, latitude }
        },
        links: { external_url }
    } = data;
    const color = magTypeColors[mag_type] || '#FFFFFF';

    return (
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'> <span style={{ color: color }}>O</span> {`ID: ${id}. Title: ${title}`}</h5>
                <p className='card-text'><strong>Tipo:</strong> Feature</p>
                <p className='card-text'><strong>ID Externo:</strong> {external_id}</p>
                <p className='card-text'><strong>Magnitud:</strong> {magnitude}</p>
                <p className='card-text'><strong>Lugar:</strong> {place}</p>
                <p className='card-text'><strong>Hora:</strong> {time}</p>
                <p className='card-text'><strong>Tsunami:</strong> {tsunami ? 'Sí' : 'No'}</p>
                <p className='card-text'><strong>Tipo de magnitud:</strong> {mag_type}</p>
                <p className='card-text'><strong>Coordenadas - Longitud:</strong> {longitude}</p>
                <p className='card-text'><strong>Coordenadas - Latitud:</strong> {latitude}</p>
                <p className='card-text'><a href={external_url}>URL Externa</a></p>
                <Comments id={data.id} />
            </div>
        </div>
    )
}