// import React from 'react'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'

// const Cartpage = () => {
//   const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Sienna',
//     inStock: true,
//     size: 'Large',
//     imageSrc: 'product4.jpg',
//     imageAlt: "Front of men's Basic Tee in sienna.",
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Black',
//     inStock: false,
//     leadTime: '3–4 weeks',
//     size: 'Large',
//     imageSrc: 'product5.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//   },
//   {
//     id: 3,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '$35.00',
//     color: 'White',
//     inStock: true,
//     imageSrc: 'product6.jpg',
//     imageAlt: 'Insulated bottle with white base and black snap lid.',
//   },
// ]
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
//         <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//           <section aria-labelledby="cart-heading" className="lg:col-span-7">
//             <h2 id="cart-heading" className="sr-only">
//               Items in your shopping cart
//             </h2>

//             <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
//               {products.map((product, productIdx) => (
//                 <li key={product.id} className="flex py-6 sm:py-10">
//                   <div className="shrink-0">
//                     <img
//                       alt={product.imageAlt}
//                       src={product.imageSrc}
//                       className="size-24 rounded-md object-cover sm:size-48"
//                     />
//                   </div>

//                   <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                     <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                       <div>
//                         <div className="flex justify-between">
//                           <h3 className="text-sm">
//                             <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
//                               {product.name}
//                             </a>
//                           </h3>
//                         </div>
//                         <div className="mt-1 flex text-sm">
//                           <p className="text-gray-500">{product.color}</p>
//                           {product.size ? (
//                             <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
//                           ) : null}
//                         </div>
//                         <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
//                       </div>

//                       <div className="mt-4 sm:mt-0 sm:pr-9">
//                         <div className="grid w-full max-w-16 grid-cols-1">
//                           <select
//                             name={`quantity-${productIdx}`}
//                             aria-label={`Quantity, ${product.name}`}
//                             className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                           >
//                             <option value={1}>1</option>
//                             <option value={2}>2</option>
//                             <option value={3}>3</option>
//                             <option value={4}>4</option>
//                             <option value={5}>5</option>
//                             <option value={6}>6</option>
//                             <option value={7}>7</option>
//                             <option value={8}>8</option>
//                           </select>
//                           <ChevronDownIcon
//                             aria-hidden="true"
//                             className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                           />
//                         </div>

//                         <div className="absolute top-0 right-0">
//                           <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
//                             <span className="sr-only">Remove</span>
//                             <XMarkIcon aria-hidden="true" className="size-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                       {product.inStock ? (
//                         <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                       ) : (
//                         <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
//                       )}

//                       <span>{product.inStock ? 'In stock' : `Ships in ${product.leadTime}`}</span>
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Order summary */}
//           <section
//             aria-labelledby="summary-heading"
//             className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
//           >
//             <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//               Order summary
//             </h2>

//             <dl className="mt-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <dt className="text-sm text-gray-600">Subtotal</dt>
//                 <dd className="text-sm font-medium text-gray-900">$99.00</dd>
//               </div>
//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="flex items-center text-sm text-gray-600">
//                   <span>Shipping estimate</span>
//                   <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Learn more about how shipping is calculated</span>
//                     <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
//                   </a>
//                 </dt>
//                 <dd className="text-sm font-medium text-gray-900">$5.00</dd>
//               </div>
//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="flex text-sm text-gray-600">
//                   <span>Tax estimate</span>
//                   <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Learn more about how tax is calculated</span>
//                     <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
//                   </a>
//                 </dt>
//                 <dd className="text-sm font-medium text-gray-900">$8.32</dd>
//               </div>
//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base font-medium text-gray-900">Order total</dt>
//                 <dd className="text-base font-medium text-gray-900">$112.32</dd>
//               </div>
//             </dl>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
//               >
//                 Checkout
//               </button>
//             </div>
//           </section>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Cartpage


// import React from 'react';
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/20/solid' // Removed QuestionMarkCircleIcon

// // Import the custom cart hook (Adjust path if needed!)
// import { useCart } from '../context/CartContext'; 

// // IMPORTANT: Define the base URL for your backend to load images
// const BACKEND_BASE_URL = "http://192.168.29.217:5000"; 

// // Helper function to calculate price safely
// const safePrice = (price) => {
//     return (parseFloat(price) || 0);
// }

// const Cartpage = () => {
//     // Access cart state and setter from the context
//     const { cartItems, setCartItems } = useCart();

//     // ----------------------------------------------------
//     // CART INTERACTION FUNCTIONS
//     // ----------------------------------------------------

//     const handleRemoveItem = (id) => {
//         setCartItems(prevItems => prevItems.filter(item => item._id !== id));
//     };

//     const handleUpdateQuantity = (id, newQuantity) => {
//         const quantity = parseInt(newQuantity, 10);
        
//         if (quantity < 1) return;

//         setCartItems(prevItems => 
//             prevItems.map(item => 
//                 item._id === id ? { ...item, quantity: quantity } : item
//             )
//         );
//     };

//     // ----------------------------------------------------
//     // CALCULATIONS (Simplified)
//     // ----------------------------------------------------

//     // Calculate subtotal (which is now the Order Total)
//     const orderTotal = cartItems.reduce((acc, item) => {
//         const itemPrice = safePrice(item.price);
//         return acc + (itemPrice * item.quantity);
//     }, 0);
    
//     // ----------------------------------------------------
//     // UI RENDER
//     // ----------------------------------------------------
    
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                
//                 <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//                     {/* Cart Items Section */}
//                     <section aria-labelledby="cart-heading" className="lg:col-span-7">
//                         <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

//                         <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
//                             {cartItems.length === 0 ? (
//                                 <p className="py-10 text-center text-lg text-gray-500">Your cart is empty. Start shopping!</p>
//                             ) : (
//                                 cartItems.map((product) => {
//                                     const itemPrice = safePrice(product.price);
                                    
//                                     const imageSrc = product.image 
//                                         ? `${BACKEND_BASE_URL}/${product.image}`
//                                         : 'https://via.placeholder.com/150?text=No+Image';

//                                     const isInStock = product.countInStock > 0;
                                    
//                                     return (
//                                         <li key={product._id} className="flex py-6 sm:py-10">
//                                             <div className="shrink-0">
//                                                 <img
//                                                     alt={product.name}
//                                                     src={imageSrc}
//                                                     className="size-24 rounded-md object-cover sm:size-48"
//                                                 />
//                                             </div>

//                                             <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                                                 <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                                                     <div>
//                                                         <div className="flex justify-between">
//                                                             <h3 className="text-sm">
//                                                                 <a href={`/product/${product._id}`} className="font-medium text-gray-700 hover:text-gray-800">
//                                                                     {product.name}
//                                                                 </a>
//                                                             </h3>
//                                                         </div>
//                                                         <div className="mt-1 flex text-sm">
//                                                             {product.selectedSize ? (
//                                                                 <p className="text-gray-500">Size: {product.selectedSize}</p>
//                                                             ) : null}
//                                                         </div>
//                                                         <p className="mt-1 text-sm font-medium text-gray-900">${itemPrice.toFixed(2)}</p>
//                                                     </div>

//                                                     <div className="mt-4 sm:mt-0 sm:pr-9">
//                                                         <div className="grid w-full max-w-16 grid-cols-1">
//                                                             <select
//                                                                 value={product.quantity}
//                                                                 onChange={(e) => handleUpdateQuantity(product._id, e.target.value)}
//                                                                 name={`quantity-${product._id}`}
//                                                                 aria-label={`Quantity, ${product.name}`}
//                                                                 className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                                                             >
//                                                                 {/* Generate options */}
//                                                                 {[...Array(Math.min(product.countInStock, 10) || 10).keys()].map(i => (
//                                                                     <option key={i + 1} value={i + 1}>{i + 1}</option>
//                                                                 ))}
//                                                             </select>
//                                                             <ChevronDownIcon
//                                                                 aria-hidden="true"
//                                                                 className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                                                             />
//                                                         </div>

//                                                         <div className="absolute top-0 right-0">
//                                                             <button 
//                                                                 type="button" 
//                                                                 onClick={() => handleRemoveItem(product._id)}
//                                                                 className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                                                             >
//                                                                 <span className="sr-only">Remove</span>
//                                                                 <XMarkIcon aria-hidden="true" className="size-5" />
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                                                     {isInStock ? (
//                                                         <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                                                     ) : (
//                                                         <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
//                                                     )}
//                                                     <span>{isInStock ? 'In stock' : 'Out of stock'}</span>
//                                                 </p>
//                                             </div>
//                                         </li>
//                                     );
//                                 })
//                             )}
//                         </ul>
//                     </section>

//                     {/* Order Summary (Simplified) */}
//                     <section
//                         aria-labelledby="summary-heading"
//                         className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
//                     >
//                         <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//                             Order summary
//                         </h2>

//                         <dl className="mt-6 space-y-4">
                            
//                             {/* The Subtotal is now the Total */}
//                             <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                                 <dt className="text-base font-medium text-gray-900">Order total</dt>
//                                 {/* Display Order Total */}
//                                 <dd className="text-base font-medium text-gray-900">${orderTotal.toFixed(2)}</dd>
//                             </div>
//                         </dl>

//                         <div className="mt-6">
//                             <button
//                                 type="submit"
//                                 // Disable checkout if the cart is empty
//                                 disabled={cartItems.length === 0} 
//                                 className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-xs focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden 
//                                     ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
//                             >
//                                 Checkout
//                             </button>
//                         </div>
                        
//                         {/* Optional: Add a link to continue shopping */}
//                         <div className="mt-6 flex justify-center text-center text-sm">
//                             <p>
//                                 or{' '}
//                                 <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
//                                     Continue Shopping
//                                     <span aria-hidden="true"> &rarr;</span>
//                                 </a>
//                             </p>
//                         </div>
//                     </section>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Cartpage;


import React from 'react';
// 👈 IMPORTANT: Ensure this path is correct based on your file structure
import { useCart } from '../context/CartContext'; 
import { TrashIcon } from '@heroicons/react/20/solid'; 

const BACKEND_BASE_URL = "http://192.168.29.217:5000"; // Use your actual URL

export default function Cartpage() {
    // 1. Get the cart state and functions
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        cartTotal 
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                <a href="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium">
                    Start Shopping
                </a>
            </div>
        );
    }
    
    // Helper function to handle quantity changes
    const handleQuantityChange = (item, event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity >= 1) {
            // Call the context function to update the specific item
            updateQuantity(item._id, item.selectedSize, newQuantity);
        }
    };
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    {/* Cart Items List */}
                    <section aria-labelledby="cart-heading" className="lg:col-span-8">
                        <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cartItems.map((item) => (
                                <li key={`${item._id}-${item.selectedSize}`} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            src={item.image ? `${BACKEND_BASE_URL}/${item.image}` : 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            {item.selectedSize && (
                                                <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center">
                                                <label htmlFor={`quantity-${item._id}`} className="mr-2 text-gray-500">
                                                    Qty
                                                </label>
                                                <select
                                                    id={`quantity-${item._id}`}
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item, e)}
                                                    className="rounded-md border border-gray-300 py-1 text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    {/* Generates options up to stock count (or a max of 10) */}
                                                    {[...Array(Math.min(item.countInStock || 10)).keys()].map(i => (
                                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item._id, item.selectedSize)}
                                                    className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    <TrashIcon className="size-5 mr-1" aria-hidden="true" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                    
                    {/* Order Summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${cartTotal}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${cartTotal}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}