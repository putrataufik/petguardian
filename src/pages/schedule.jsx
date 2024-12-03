import React from 'react'
import { useAuthUser, useLogout } from "../hooks/authHooks";
import BurgerMenu from '../components/burgerMenu'
const schedule = () => {
  const user = useAuthUser(); // Custom hook untuk mendapatkan user
  const logout = useLogout(); // Custom hook untuk handle logout
  return (
    <div className='min-h-screen bg-gray-100 p-6 flex flex-col items-center'>
      <div className="flex justify-between w-full items-center">
        <BurgerMenu user={user} logout={logout} />
        {user && (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
    </div>
  )
}

export default schedule
