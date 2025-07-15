import React, { useState, useEffect } from 'react'
import '../css/PasswordRating.css'
import PasswordStrengthBar from 'react-password-strength-bar'
import zxcvbn from 'zxcvbn'

function PasswordRating({ password }) {
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState('')
    const [headerMessage, setHeaderMessage] = useState('')
    const [result, setResult] = useState(null)

    const headerMessages = [
        "🔥 Let’s take your password to the gym and see if it lifts or limps.",
        "💪 Time to pump up your password’s muscles!",
        "🏋️‍♂️ Is your password ready for the workout?",
        "🚴‍♀️ Pedal harder, password!",
        "🥊 Let’s see if your password can knock out hackers.",
        "⚔️ Ready to battle hackers with your password?",
        "🚀 Launch your password into the security stratosphere!",
        "🛡️ Shield up! Let’s test your password’s defense.",
        "🎯 Hit the bullseye with a strong password!",
        "🔥 Burn weak passwords to ashes!"
    ]

    const weakMessages = [
        "🪫 Your password couldn't lift a feather!",
        "😴 Even my grandma could guess this.",
        "🥱 Is that all you've got? Weak!",
        "🐢 Slow and steady loses the race here.",
        "🍂 This password falls apart like autumn leaves.",
        "🧸 Soft as a teddy bear, but easy to break.",
        "💤 Snooze alert! Try something stronger.",
        "⚠️ Danger zone: hackers love passwords like this."
    ]

    const mediumMessages = [
        "💪 Getting better, but still not gym-ready.",
        "⚖️ Your password is on a diet, add more spice!",
        "🤔 Not bad, but I’ve seen stronger ones.",
        "🚧 Work in progress—almost there!",
        "🦾 Building strength, keep pushing!",
        "🌱 Growing, but needs more muscle.",
        "🔧 Keep tuning it up for maximum power.",
        "⏳ Almost gym-ready, keep training!"
    ]

    const strongMessages = [
        "🏋️ Your password could bench press a car!",
        "🔥 Hulk would be proud of this password.",
        "🚀 Your password is ready for takeoff!",
        "🦸‍♂️ Password superhero, saving the day!",
        "⚡ Lightning-fast and rock solid!",
        "🥇 Gold medal password, champion level!",
        "🎯 Bullseye! Can't get any better than this.",
        "💥 Password power unleashed!"
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
        const randomIndex = Math.floor(Math.random() * headerMessages.length)
        setHeaderMessage(headerMessages[randomIndex])
    }, [])

    useEffect(() => {
        setRating(calculateStrength(password))

        if (password) {
            const zResult = zxcvbn(password)
            setResult(zResult)
        } else {
            setResult(null)
        }
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
            <PasswordStrengthBar password={password} />
            {password && <h4>{message}</h4>}

            <ul className="password-checklist">
                <li className={hasLower ? 'valid' : 'invalid'}>
                    {hasLower ? '✔️' : '❌'} Lower case
                </li>
                <li className={hasUpper ? 'valid' : 'invalid'}>
                    {hasUpper ? '✔️' : '❌'} Upper case
                </li>
                <li className={hasNumber ? 'valid' : 'invalid'}>
                    {hasNumber ? '✔️' : '❌'} Digits
                </li>
                <li className={hasSpecial ? 'valid' : 'invalid'}>
                    {hasSpecial ? '✔️' : '❌'} Special characters
                </li>
            </ul>

            {result && (
                <div className="password-cracking-info">
                    <p>🧮 <strong>Score (0–4):</strong> {result.score}</p>
                    <p>🧩 <strong>Entropy estimate:</strong> {result.guesses_log10.toFixed(2)} bits</p>
                    <p>⏳ <strong>Crack time (offline fast):</strong> {result.crack_times_display.offline_fast_hashing_1e10_per_second}</p>
                    <p>⚠️ <em>Note:</em> Crack time varies by attacker’s resources and methods.</p>
                </div>
            )}
        </div>
    )
}

export default PasswordRating
