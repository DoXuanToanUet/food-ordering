'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from '../../components/menu/MenuItem'

const MenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch('api/categories');
                if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
                const categories = await categoriesResponse.json();
                setCategories(categories);
                
                const menuItemsResponse = await fetch('api/menuitems');
                if (!menuItemsResponse.ok) throw new Error('Failed to fetch menu items');
                const menuItems = await menuItemsResponse.json();
                setMenuItems(menuItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section>
            {categories.length === 0 ? (
                <div>No categories available.</div>
            ) : (
                categories.map(c => (
                    <div key={c._id} className='text-center'>
                        <div className='text-2xl text-primary uppercase m-10'>{c.name}</div>
                        <div className=' grid grid-cols-2 md:grid-cols-3 gap-4'> 
                            {menuItems
                                .filter(item => item.category === c._id)
                                .map(item => (
                                    <MenuItem key={item._id} {...item} />
                                
                                ))}
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}

export default MenuPage;
