import { useCallback, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [includeAlphabets, setIncludeAlphabets] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numberChars = "1234567890";
  const specialChars = "~@#$%^&*()+=}]{[|\\?/>.<,";

  const generatePassword = useCallback(() => {
    let characterSet = '';
    if (includeAlphabets) characterSet += alphabetChars;
    if (includeNumbers) characterSet += numberChars;
    if (includeSpecialChars) characterSet += specialChars;

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += characterSet.charAt(Math.floor(Math.random() * characterSet.length));
    }
    setGeneratedPassword(newPassword);
  }, [includeAlphabets, includeNumbers, includeSpecialChars, passwordLength]);

  useEffect(() => {
    generatePassword();
  }, [includeAlphabets, includeNumbers, includeSpecialChars, passwordLength, generatePassword]);

  return (
    <>
      <div className='bg-white rounded-xl py-2 px-10 pb-6 mb-20 w-128'>
        <h1 className='font-mono m-4 text-2xl text-gray-700'>Password Generator</h1>

        <input 
          type="text"
          value={generatedPassword} id="inputfield"
          className="w-72 px-4 py-1 border-white focus:outline-none rounded-l-md placeholder-gray-500"
          placeholder="Password will be shown here..."
          readOnly
        />
        <button onClick={() =>
          navigator.clipboard.writeText(generatedPassword)
            .then(() => document.querySelector("#inputfield")?.select())
            .catch(err => console.error("Failed to copy", err))} className='px-3 py-1 font-mono rounded-r-md bg-orange-400 hover:bg-orange-600'>Copy</button>

        <div className='flex justify-center justify-around mt-3'>
          <div className='flex align-middle m-3'>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(prev => !prev)}
              id="Numbers"
              className="mr-1"
            />
            <label htmlFor="Numbers">Numbers</label>
          </div>
          <div className='flex align-middle m-3'>
            <input
              type="checkbox"
              checked={includeAlphabets}
              onChange={() => setIncludeAlphabets(prev => !prev)}
              id='Alphabets'
              className='mr-1'
            />
            <label htmlFor="Alphabets">Alphabets</label>
          </div>
          <div className='flex align-middle m-3'>
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(prev => !prev)}
              id='Sp. Characters'
              className='mr-1'
            />
            <label htmlFor="Sp. Characters">Special Characters</label>
          </div>
        </div>

        <div className='flex align-middle m-4 mb-5'>
          <input
            type="range"
            min="1"
            max="24"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            id='Length'
            className='w-64 mr-2 cursor-pointer overflow-hidden'
          />
          <label htmlFor='Length'>Length: {passwordLength}</label>
        </div>
      </div>

      <footer className='text-center text-gray-500 text-sm mt-6'>
        <p>Made by <span className='font-mono text-gray-700'>Subhan Kausar</span></p>
      </footer>
    </>
  );
}

export default App;
