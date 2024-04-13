import '../../index.css';

export default function Banner() {
    const logoPath = 'https://cdn-icons-png.freepik.com/512/1092/1092944.png';
    return (
        <div className='banner'>
            <img style={{width:'50px',height:'50px'}} src={logoPath} alt='Earthquake Icon' />
        </div>
    );
}