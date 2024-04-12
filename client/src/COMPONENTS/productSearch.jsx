import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        console.log(keyword)
        try {
            const response = await axios.get(`http://localhost:5000/api/products/search/${keyword}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <div>
                    <h2>Search Results:</h2>
                    {searchResults.map(product => (
                        <div key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
