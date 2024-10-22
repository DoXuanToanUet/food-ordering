import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'
import toast from 'react-hot-toast'
import MenuItemTile from '../menu/MenuItemTile'
const MenuItem = (menuItem) => {
  const {addToCart} = useContext(CartContext)
  const { name, description, basePrice,sizes, extraIngredientPrice} = menuItem
  const [showPopup, setShowPopup] = useState(false)
  const [selectedSize, setselectedSize] = useState(null)
  const [selectedExtra, setselectedExtra] = useState([])

  // console.log('this is menuItem',menuItem)
  // console.log('this is size' ,sizes)
  function handelAddToCardButtonClick(){
    const hasOptions = sizes.length > 0 || extraIngredientPrice.length > 0
     if( hasOptions && !showPopup ){
      setShowPopup(true)
      return;
      }
		addToCart(menuItem,selectedSize,selectedExtra)
		setShowPopup(false)
		toast.success('Added to cart!')
  }

 
  const handleExtraClick = (ev,extra) => {
     const checked = ev.target.checked
     if(checked){
      setselectedExtra( prev => [...prev,extra])
     } else{
      setselectedExtra( prev =>{
        return prev.filter(e => e.name !== extra.name)
      })
     }
    // const { value, checked } = ev.target;
    // setselectedExtra((prev) => {
    //   if (checked) {
    //     return [...prev, value];
    //   } else {
    //     return prev.filter(extra => extra !== value);
    //   }k
    // });
  };
  let selectedPrice = parseFloat(basePrice);
  
    if( selectedSize ){
      selectedPrice+= parseFloat(selectedSize.price)
    } 
    if( selectedExtra?.length){
       for ( const extra of selectedExtra){
        selectedPrice+= parseFloat(extra.price)
       }
    }
  // console.log('select price', selectedPrice)


  return (
    <>
      { showPopup && (
        <div onClick={ () => setShowPopup(false) }   className='fixed inset-0  bg-black/80 flex items-start justify-center '>
          <div 
          onClick={ ev => ev.stopPropagation()} 
          className='bg-white mt-[50px] p-4 rounded-sm max-w-md  overflow-hidden overflow-y-scroll max-h-[90vh]'>
            <img src='/pizza.png'/>
            <h4 className='font-semibold text-xl my-4'>{name}</h4>
            <p className='text-gray-500 text-sm my-3 line-clamp-3'>
                {description}
            </p>
            <div className='bg-gray-200 rounded-md p-2 mb-4' >
              {/* {JSON.stringify(selectedSize)} */}
              <h3>Pick your size</h3>
              {
                    sizes?.length > 0 && sizes.map(size => (
                        <label key={size.name} className='block flex gap-2 items-center'> {/* Thêm key để tránh cảnh báo từ React */}
                            <input type="radio" 
                              onClick={ (ev)=> {  setselectedSize(size) }}
                              checked={selectedSize?.name == size.name}
                              name="size" 
                              value={size.name} />
                            {size.name} ${size.price}
                        </label>
                    ))
                }
            </div>
            <div className='bg-gray-200 rounded-md p-2'>
              <h3>Pick your extraIngredientPrice</h3>
              {/* {JSON.stringify(selectedExtra)} */}
              {extraIngredientPrice?.length > 0 && extraIngredientPrice.map(extra => (
                <label key={extra.name} className='block flex gap-2 items-center'>
                  <input
                    type="checkbox"
                    onClick={ev => handleExtraClick(ev,extra)}
                    name="extra"
                    value={extra.name}
                  
                    // checked={selectedExtra.includes(extra.name)}
                  />
                  {extra.name} ${extra.price}
                </label>
              ))}
            </div>
            <button 
              onClick={handelAddToCardButtonClick}
            className='bg-primary text-white px-6 p-2 m-2'>Add to cart ${selectedPrice}</button>
				 <button 
              onClick={()=>setShowPopup(false)}
            className='bg-red-600 text-white px-6 p-2 m-2'>Cancel</button>
          </div>
        </div>
      )}
       <MenuItemTile onAddToCart={handelAddToCardButtonClick} {...menuItem}/>
    </>
   
  )
}

export default MenuItem