import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ChevronDown from "../../components/icons/ChevronDown"
import ChevronUp from "../../components/icons/ChevronUp"

const MenuItemPriceProps = ({props, setProps,name,addLabel}) => {
   
    const [isOpen, setIsOpen] = useState(false);
    function addSize(){
        // console.log('this is add size')
        setProps( oldSizes =>{
            return [...oldSizes, {name: '',price:0}]
        })
        // console.log(sizes,'this is size arr')
    }
    function editSize(ev, index, prop ){
        const newValue = ev.target.value
        // console.log(newValue,'new value')
        setProps( prevSizes =>{
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
        // console.log(sizes,'new sizes')
    }

    function removeSize(index){
        setProps( pre => pre.filter( (v,i) => i!==index ) )
    }


   

    return (
        <div className='bg-gray-200 p-2 rounded-sm mb-2'> 
            <button className='inline-flex' type='button' onClick={ () =>setIsOpen( prev => !prev)}>
                {isOpen &&(
                    <ChevronUp/>
                )}
                 {!isOpen &&(
                    <ChevronDown/>
                )}
                <label>{name}</label>
                <label>({props?.length})</label>
            </button>
            <div className={isOpen ? 'block': 'hidden'}>
                {
                    props?.length >0 && props.map( (size,index) =>(
                        <div key={index} className='flex gap-2 sizes items-center'>
                            <input type="text" className='bg-white  m-0' placeholder='Size name' value={size.name} 
                                onChange={ ev=> editSize(ev,index,'name')}
                            />
                            <input type="text" className='bg-white  m-0'  placeholder='Extra price' value={size.price}
                                onChange={ ev=> editSize(ev,index,'price')}
                            />
                            <div>
                                <button   type='button'
                                    onClick={ev=> removeSize(index)}
                                    className='bg-white rounded-xl max-w-[100px] mb-2'> X</button>
                            </div>
                        </div>
                    ))
                }
                 <button 
                type='button'
                onClick={addSize}
                className='bg-white'>
                    {addLabel}
                </button>
            </div>
           
           
        </div>
    )
}

export default MenuItemPriceProps