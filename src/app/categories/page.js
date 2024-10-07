'use client'
import React, { useDeferredValue, useEffect, useState } from 'react'
import UserTabs from "../../components/layout/UserTabs"
import useProfile from "../../components/UseProfile"
import toast from 'react-hot-toast'

const CategoriesPage = () => {
    const {loading:profileLoading, data:profileData}= useProfile()
    const [newCategoryName, setNewCategoryName] = useState('')
    const [categories, setcategories] = useState('')
    const [editedCategory, setEditedCategory] = useState(null)
    // console.log(profileLoading,profileData,'pr data')


    useEffect( ()=>{
        fetchCategories()
    },[])


    // function fetchCategories(){
    //     fetch('/api/categories').then(response =>{
    //         response.json().then(categories=>{
    //             console.log(categories,'cate is ..')
    //             setcategories(categories)
    //         })
    //     })
    // }

    const fetchCategories = async () => {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        console.log(categories, 'cate is ..');
        setcategories(categories);
    };
    

    const handleDeleteClick = async (_id) =>{

        if (!window.confirm('Are you sure you want to delete this category?')) {
            return; // Nếu người dùng nhấn "Cancel", thì không thực hiện xóa
        }
        console.log(_id,'this is del id')
        
        const promiseDel = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/categories?_id='+_id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
           
            });
            // setNewCategoryName('')
            
            if (response.ok)
              resolve()
            else
              reject();
          });
          
          await toast.promise(promiseDel, {
            loading: 'Deleting...',
            success: 'Category Deleted',
            error: 'Error',
          });
          fetchCategories()
      
    }   

    async function handleNewCategorySubmit(ev){
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const data = {name:newCategoryName}
            if( editedCategory ){
                data._id = editedCategory._id
                console.log(data._id,'editedCategory')
            }
            const response = await fetch('/api/categories', {
            method: editedCategory ? 'PUT': 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                   data
                ),
            });
            setNewCategoryName('')
            fetchCategories()
            if (response.ok)
              resolve()
            else
              reject();
          });
      
          await toast.promise(savingPromise, {
            loading: editedCategory ? 'Updating category':'Creating your new category...',
            success: editedCategory ? 'Category Updated':'Category saved!',
            error: 'Error',
          });
    }

    if(profileLoading){
        return 'Loading user info...'
    }
    if(!profileData.admin){
        return 'Not an admin'
    }
    return (
        <section className="m-4 ">
            <UserTabs isAdmin={true}></UserTabs>
            <div className='block max-w-sm mx-auto py-6'>
                <form className='' onSubmit={handleNewCategorySubmit}>
                    <label>
                        { editedCategory ? 'Update Category': 'New Category Name ' }
                        
                    </label>
                    <div className='flex gap-2 items-center'>
                        <div className='grow flex'>
                            <input type="text" placeholder='Enter your category' value={newCategoryName}
                                onChange={ev => setNewCategoryName(ev.target.value)}
                            />
                        
                        </div>
                        <div className='flex gap-2'> 
                            <button type="submit"> 
                                { editedCategory ? 'Update': 'Create'}
                            </button>
                            <button type='button' 
                                onClick={ ()=> {setEditedCategory(null); setNewCategoryName('')}  }
                                className='have-border bg-green-600  text-white p-3'>Cancel
                            </button>
                        </div>
                    </div>
                    
                
                </form>
                <h2 className='text-center mb-2'>Edit category</h2>
                {
                    categories?.length>0 && categories.map( c =>(
                        <div className='bg-gray-200 flex p-2 mb-2'  key={c._id} >
                             <div 
                                
                               
                                className=' grow p-3 mb-2 rounded-xl text-sm'>
                                <span >{c.name}</span>
                            </div>
                            <div className='flex gap-1'>
                                <button type='button' 
                                onClick={ ()=> {setEditedCategory(c); setNewCategoryName(c.name)}  }
                                className='have-border bg-green-600  text-white p-3 text-[12px]'>Edit</button>
                                <button type='button' 
                                     onClick={ ()=> handleDeleteClick(c._id)  }
                                    className='have-border bg-red-600 text-white  p-3 text-[12px]'>
                                    Delete
                                </button>
                               
                            </div>
                         
                        </div>
                       
                        
                    ))
                }
            </div>
            
        </section>
    )
}

export default CategoriesPage