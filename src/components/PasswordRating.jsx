import React, { useState, useEffect } from 'react'
import '../css/PasswordRating.css'

function PasswordRating({ password }) {
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const [headerMessage, setHeaderMessage] = useState('')

    const headerMessages = [
        "🔥 Let’s take your password to the gym and see if it lifts or limps.",
        "💪 Time to pump up your password’s muscles!",
        "🏋️‍♂️ Is your password ready for the workout?",
        "🚴‍♀️ Pedal harder, password!",
        "🥊 Let’s see if your password can knock out hackers."
    ]

    const weakMessages = [
        "🪫 Your password couldn't lift a feather!",
        "😴 Even my grandma could guess this.",
        "🥱 Is that all you've got? Weak!"
    ]
    const mediumMessages = [
        "💪 Getting better, but still not gym-ready.",
        "⚖️ Your password is on a diet, add more spice!",
        "🤔 Not bad, but I’ve seen stronger ones."
    ]
    const strongMessages = [
        "🏋️ Your password could bench press a car!",
        "🔥 Hulk would be proud of this password.",
        "🚀 Your password is ready for takeoff!"
    ]

    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasNumber = /\d/.test(password);
    let hasSpecial = /[^A-Za-z0-9]/.test(password);

    function calculateStrength(password) {
        let score = 0;

        if (!password) return 0;

        const lengthScore = Math.min(password.length, 20) * 2;
        score += lengthScore;

        let varietyCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
        score += varietyCount * 15;

        if (password.length > 12 && varietyCount >= 3) {
            score += 10;
        }

        return Math.min(score, 100);
    }

    useEffect(() => {
        // Scegli frase header random solo al montaggio
        const randomIndex = Math.floor(Math.random() * headerMessages.length)
        setHeaderMessage(headerMessages[randomIndex])
    }, [])

    useEffect(() => {
        setRating(calculateStrength(password))
    }, [password])

    let strengthClass = ''
    if (rating < 40) strengthClass = 'weak'
    else if (rating < 80) strengthClass = 'medium'
    else strengthClass = 'strong'

    useEffect(() => {
        if (!password) {
            setMessage('')
            return
        }
        let arr = []
        if (strengthClass === 'weak') arr = weakMessages
        else if (strengthClass === 'medium') arr = mediumMessages
        else arr = strongMessages
        if (arr.length > 0) {
            const randomIndex = Math.floor(Math.random() * arr.length)
            setMessage(arr[randomIndex])
        }
    }, [strengthClass, password])

    return (
        <div className="password-rating-container">
            <h2 className="password-rating-title">{headerMessage}</h2>
            <progress
                value={rating}
                max="100"
                className={`password-progress ${strengthClass}`}
            />
            {password && <h4>{message}</h4>}

            <ul className="password-checklist">
                <li className={hasLower ? 'valid' : 'invalid'}>
                    {hasLower ? '✔️' : '❌'} Lower case
                </li>
                <li className={hasUpper ? 'valid' : 'invalid'}>
                    {hasUpper ? '✔️' : '❌'} Upper case
                </li>
                <li className={hasNumber ? 'valid' : 'invalid'}>
                    {hasNumber ? '✔️' : '❌'} Numbers
                </li>
                <li className={hasSpecial ? 'valid' : 'invalid'}>
                    {hasSpecial ? '✔️' : '❌'} Special characters
                </li>
            </ul>
        </div>
    )
}

export default PasswordRating
