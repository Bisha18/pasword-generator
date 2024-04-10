import { useCallback, useState,useEffect ,useRef} from 'react'


function App() {
  const[length,setLength] = useState(8);
  const[character,setCharacter] = useState(false);
  const[number,setNumber] = useState(false);
  const[password,setPassword]=useState("");

  const passwordref=useRef(null)
  
  const pass = useCallback(()=>{
    let s=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str+="1234567890";
    if(character) str+="!@#$%^&*()";

    for(let i =1; i<=length; i++)
    {
       let char = Math.floor(Math.random()*str.length+1)
       s += str.charAt(char);
    }
    setPassword(s);
  },[length,number,character,setPassword])

  const copyPasswordToclipboard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert('password copied');
  },
[password])

  useEffect(()=>{
    pass();
  },
[length,number,character,pass])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
    text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref = {passwordref}
        />
        <button 
        onClick={copyPasswordToclipboard}
        className='outline-none bg-blue-900 text-white 
        px-3 py=0.5 shrink-0'>
          copy
        </button>
        </div> 
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}} />
            <label >Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={()=>{
              setNumber((prev)=!prev)
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={character}
            id="charInput"
            onChange={()=>{
              setCharacter((prev)=!prev)
            }} />
             <label htmlFor="charInput">character</label>
          </div>
        </div>
     </div>
    </>
  )
}

export default App
