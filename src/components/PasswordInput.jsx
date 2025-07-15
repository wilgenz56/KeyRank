import React, { useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import '../css/PasswordInput.css'
import PasswordRating from './PasswordRating'

function PasswordInput() {
  const [inputValue, setInputValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="page-wrapper">
<<<<<<< HEAD
=======
      <img src="./src/assets/keyrank_icon.jpg" alt="KeyRank Logo" className="logo" />
>>>>>>> master
      <h1 className="page-title">
        Is your password strong enough?<br /> Let’s see what you’ve got.
      </h1>

      <div className="input-area">
        <div className="input-wrapper">
          <FiLock className="input-icon" />
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your awesome password here..."
            autoComplete="current-password"
            className="password-input"
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <PasswordRating password={inputValue} />
      </div>
    </div>
  )
}

export default PasswordInput
