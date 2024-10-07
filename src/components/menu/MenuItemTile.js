import React from 'react'

const MenuItemTile = ({onAddToCart,...item}) => {
    const { name, description, basePrice,sizes, extraIngredientPrice} = item
  return (
    <div className='bg-gray-300 p-4 rounded-lg text-center'>
          <img src='/pizza.png'/>
          <h4 className='font-semibold text-xl my-4'>{name}</h4>
          <p className='text-gray-500 text-sm my-3 line-clamp-3'>
              {description}
          </p>
          <button 
            onClick={onAddToCart}
          className='bg-primary text-white px-6 py-2'>
            { (sizes?.length > 0 || extraIngredientPrice?.length >0) ? (
                <span>Add to cart from (${basePrice})</span>
            ):(
                <span> Add to cart ${basePrice}</span>
            )}
           
            </button>
      </div>
  )
}

export default MenuItemTile
