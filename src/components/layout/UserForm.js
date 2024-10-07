import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import AddressInputs from '../layout/AddressInput'
const UserForm = ({user,onSubmit}) => {
    // const [userName, setUserName] = useState(user?.userName || '')
    // const [phone, setPhone] = useState(user?.phone || '');
    // const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    // const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    // const [city, setCity] = useState(user?.city || '');
    // const [country, setCountry] = useState(user?.country || '');
    const [userName, setUserName] = useState('');
    // const [userEmail, setuserEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [admin,setAdmin] = useState('')
    // Cập nhật form khi user thay đổi
    useEffect(() => {
        if (user) {

            setUserName(user?.name || '');
            // setuserEmail(user?.email || '');
            setPhone(user?.phone || '');
            setStreetAddress(user?.streetAddress || '');
            setPostalCode(user?.postalCode || '');
            setCity(user?.city || '');
            setCountry(user?.country || '');
        }
    }, [user]); 
    // Chạy lại khi `user` thay 
    const handleProfileInfoUpdate = (ev) => {
        ev.preventDefault();
        // console.log('this is new menu')
        // if (!validateForm()) {
        //     return; // Dừng gửi form nếu có lỗi
        // }

        onSubmit(ev, {name:userName,phone,streetAddress,postalCode,city,country})
    };
    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
      }
    
    return (
        <div className='max-w-xs mx-auto '>
            <div className='flex items-center text-center'>
                {/* <Image src={userImage} width={50} height={50} alt='avatar' /> */}
            </div>
            <form onSubmit={handleProfileInfoUpdate}>
                <input type="text" placeholder='First and last name' value={userName} onChange={ev=> setUserName(ev.target.value)}/>
                <input type="email" disabled={true}  value={user?.email}  />
                {/* <input type="tel"  placeholder='Phone number'  value={phone || ''} onChange={ev => setPhone(ev.target.value)}/>
                <input type="text"  placeholder='Street address' 
                value={streetAddress || ''} onChange={ev => setStreetAddress(ev.target.value)}/>
                <div className='flex gap-2'>
                    <input type="text"  placeholder='City'  value={city || ''} onChange={ev => setCity(ev.target.value)}/>
                    <input type="text"  placeholder='Postal Code' value={postalCode || ''} onChange={ev => setPostalCode(ev.target.value)}/>
                </div>
                
                <input type="text"  placeholder='Country'  value={country || ''} onChange={ev => setCountry( ev.target.value)}/> */}
                  <AddressInputs
                    addressProps={{phone, streetAddress, postalCode, city, country}}
                    setAddressProp={handleAddressChange}
                    />
                <div>
                    {/* {JSON.stringify(admin)} */}
                    {/* <label htmlFor='adminCb'>
                        <input type="checkbox" id="adminCb" className='' value={'1'} checked={admin}
                            onClick={ev=> setAdmin(ev.target.checked)}
                        />
                        <span className='p-2'>Admin</span>
                    </label>
                    */}
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default UserForm