
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlinePlus } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { Nuvbar } from '../component/Frame38763';

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true); // מצב טעינה

    useEffect(() => {
        // Fetch shopping list from server when component mounts
        const fetchShoppingList = async () => {
            try {
                const response = await axios.get("http://localhost:5000/ShoppingList");
                setShoppingList(response.data.data);
            } catch (error) {
                console.error('Error fetching the shopping list:', error);
            } finally {
                setLoading(false); // סיום מצב הטעינה אחרי הבקשה
            }
        };

        fetchShoppingList();
    }, []);

    const updateItemQuantity = async (id, amount) => {
        try {
            const response = await axios.put(`http://localhost:5000/ShoppingList/amount/${id}`, { amount });
            if (response.status === 200 || response.status === 204) {
                return response.data;
            } else {
                console.error('Failed to update item quantity:', response);
                return null;
            }
        } catch (error) {
            console.error('Error updating item quantity:', error.response ? error.response.data : error.message);
            return null;
        }
    };

    const incrementQuantity = async (id, newAmount) => {
        const updatedItem = await updateItemQuantity(id, newAmount);
        if (updatedItem) {
            setShoppingList(
                shoppingList.map(item =>
                    item._id === id ? { ...item, amount: newAmount } : item
                )
            );
        }
    };

    const decrementQuantity = async (id, newAmount) => {
        if (newAmount >= 0) {
            const updatedItem = await updateItemQuantity(id, newAmount);
            if (updatedItem) {
                setShoppingList(
                    shoppingList.map(item =>
                        item._id === id ? { ...item, amount: newAmount } : item
                    )
                );
            }
        }
    };
    
    return (
        <div>
            <Nuvbar />
            <div className="shopping-list-container p-6 bg-[#f5eadb] min-h-screen flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#391e0f] mb-6">רשימת קניות</h2>
                
                {loading ? ( // בדיקה אם מצב הטעינה פעיל
                    <p className="text-center text-[#391e0f]">...המוצרים נטענים</p>
                ) : (
                    <ul className="w-full max-w-3xl divide-y divide-[#391e0f]">
                        {shoppingList.length > 0 ? (
                            shoppingList.map(item => (
                                <li key={item._id} className="py-4 flex justify-between items-center">
                                    {/* שם המוצר בצד שמאל */}
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xl font-semibold text-[#391e0f]">{item.product_name}</span>
                                        <p className="text-sm text-gray-600">{item.category}</p>
                                    </div>

                                    {/* אייקונים בשורה אחת בצד ימין */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => decrementQuantity(item._id, item.amount - 1)}
                                            className="p-1 text-[#391e0f] hover:text-red-600"
                                        >
                                            <BiMinus className="text-lg" />
                                        </button>
                                        <span className="text-sm font-medium text-[#391e0f]">כמות: {item.amount}</span>
                                        <button
                                            onClick={() => incrementQuantity(item._id, item.amount + 1)}
                                            className="p-1 text-[#391e0f] hover:text-green-600"
                                        >
                                            <HiOutlinePlus className="text-lg" />
                                        </button>
                                        <Link to={`/shoppimgList/deleteProduct/${item._id}`} className="text-[#391e0f] hover:text-red-600">
                                            <RiDeleteBin5Line className='text-lg' />
                                        </Link>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-center text-[#391e0f]">אין מוצרים ברשימה</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ShoppingList;
