// // src/components/ProductCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//     // You will typically use the product's unique ID for the link
//     const productLink = `/product/${product._id}`; 

//     return (
//         <Link to={productLink} className="group block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
//             <div className="w-full h-64 bg-gray-100 overflow-hidden">
//                 <img
//                     src={`http://192.168.29.217:5000/${product.image}`} // Adjust to your backend image path
//                     alt={product.name}
//                     className="w-full h-full object-cover object-center group-hover:opacity-75"
//                 />
//             </div>
//             <div className="p-4">
//                 <h3 className="text-lg font-medium text-gray-900 truncate">
//                     {product.name}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                     {product.category?.name || 'Category'} 
//                 </p>
//                 <p className="mt-1 text-xl font-bold text-green-600">
//                     ${product.price.toFixed(2)}
//                 </p>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;



import React from 'react';
import { Link } from 'react-router-dom';

// IMPORTANT: Define the base URL for your backend to load images
const BACKEND_BASE_URL = "http://192.168.29.217:5000"; 

const ProductCard = ({ product }) => {
    // Ensure product data is valid before rendering
    if (!product || !product._id) return null;
    
    // Link uses the product's unique ID for navigation to the detail page
    const productLink = `/product/${product._id}`;

    // Construct image URL
    const imageUrl = product.image 
        ? `${BACKEND_BASE_URL}/${product.image}` 
        : 'https://via.placeholder.com/300x300?text=No+Image';

    return (
        <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
            {/* Link wrapper for the whole card */}
            <Link to={productLink}>
                <div className="w-full h-64 overflow-hidden lg:aspect-none aspect-h-1 aspect-w-1">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-sm text-gray-700 truncate">
                        {/* Link to Product Detail Page */}
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                        {product.brand || 'No Brand'}
                    </p>
                    <p className="text-lg font-medium text-green-600">
                        ${product.price ? product.price.toFixed(2) : 'N/A'}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;



