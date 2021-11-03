import React from 'react';
import { useSelector } from 'react-redux';

const Catalog: React.FC = () => {
    const catalog = useSelector( state => state);

    console.log( 'Pelé' , catalog )

    return(
        <h1>Component catalogo</h1>
    );
}

export default Catalog;