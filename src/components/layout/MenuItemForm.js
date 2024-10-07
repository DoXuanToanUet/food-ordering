import React from 'react'
import { useState } from 'react'
import MenuItemPriceProps from './MenuItemPriceProps'
import { useEffect } from 'react'

const MenuItemForm = ({onSubmit,menuItem}) => {
    const [name, setName] = useState(menuItem?.name  || '')
    const [description, setDescription] = useState(menuItem?.description || '')
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [extraIngredientPrice, setextraIngredientPrice] = useState(menuItem?.extraIngredientPrice || [])
    const [category, setCategory] = useState(menuItem?.category || '')
    const [categories, setcategories] = useState([])
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        basePrice: ''
    });
     // useEffect để log sizes khi có thay đổi
     useEffect(() => {
        // console.log(sizes, 'new sizes');
        fetch('/api/categories')
        .then(response => response.json())
        .then(catItem => {
            // console.log(catItem, 'menu item ...');
            setcategories(catItem);
        });

    }, [sizes]);

    const validateForm = () => {
        const newErrors = { name: '', description: '', basePrice: '' };
        let isValid = true;

        if (name.trim() === '') {
            newErrors.name = 'Item name is required';
            isValid = false;
        }

        if (description.trim() === '') {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (basePrice.trim() === '' || isNaN(basePrice)) {
            newErrors.basePrice = 'Base Price must be a valid number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        // console.log('this is new menu')
        if (!validateForm()) {
            return; // Dừng gửi form nếu có lỗi
        }

        onSubmit(ev, {name,description,basePrice,sizes,extraIngredientPrice,category})
    };

  return (
    <form className='my-4'
        onSubmit={handleSubmit}
    >
        <div className='mb-4'>
            <label>Name</label>
            <input
                type="text"
                placeholder='Item name'
                value={name}
                onChange={ev => setName(ev.target.value)}
                className={`border p-2 w-full `}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div className='mb-4'>
            <label>Description</label>
            <input
                type="text"
                placeholder='Description'
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                className={`border p-2 w-full`}
            />
            {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>

        <div className='mb-4'>
            <label>Price</label>
            <input
                type="text"
                placeholder='Base Price'
                value={basePrice}
                onChange={ev => setBasePrice(ev.target.value)}
                className={`border p-2 w-full `}
            />
            {errors.basePrice && <span className="text-red-500">{errors.basePrice}</span>}
        </div>
        <div className='mb-4'>
            <label>Categories</label>
            <div>
                <select value={category} onChange={ ev=> setCategory(ev.target.value)}>
                    {categories?.length >0 && categories.map( c=>(
                         <option value={c._id} key={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>
           
        </div>
        {/* This is layout size  */}
        <MenuItemPriceProps 
            name={'Sizes'} 
            props={sizes} 
            setProps={setSizes} 
            addLabel={'Add item size'}/>
        <MenuItemPriceProps 
            name={'Extra ingredients'} 
            props={extraIngredientPrice} 
            setProps={setextraIngredientPrice} 
            addLabel={'Add ingredients prices'}/>
        <div>
            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                Save
            </button>
        </div>
    </form>
  )
}

export default MenuItemForm