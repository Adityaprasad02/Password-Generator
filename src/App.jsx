import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const [length,setLength] = useState(12)
  const [number,setNumber] = useState(false)
  const [character,setChar] = useState(false)
  const [password,setPassword] = useState("")

  //useRef Hook
const refPassword = useRef()

const passGenerate = useCallback(() => {
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmanopqrstuvwxyz"
  let Newgen = "";
  if(number){ //to increase string length
    str += "1234567890"
  }
  if(character){ //to increase string length
    str += "@_^#$%&*!"
  }
  for(let i=0;i<length;i++){
  Newgen += str[Math.floor(Math.random()*(str.length))];
  }
setPassword(Newgen);

},[length,number,character,setPassword]);



//optimization
const copyPassword = useCallback(() => {
  refPassword.current?.select();
window.navigator.clipboard.writeText(password)
} , [password]);

//useEffect Hook
useEffect(() => {
  passGenerate();
},[length,number,character,setPassword])
  
return (
 <>
    <div className='bg-gray-900 h-screen flex justify-center'>
      <div className='card bg-slate-400 w-3/4 h-max   fixed flex flex-col items-center space-y-7 my-80 '>
        <span className="text-center text-amber-50 font-mono text-xl bg-gradient-to-r from-sky-500 to-indigo-900 w-full md:w-42 lg:w-72">Password Generator</span>
        <div>
          <input className='text-center max-sm: text-red-700 outline-none' value={password} ref={refPassword} readOnly />
          <input className='bg-blue-600 text-white text-center text-s w-14 rounded-e-2xl cursor-pointer hover:bg-blue-900 active:bg-violet-700 focus:outline-none focus:ring focus:ring-sky-600-300' onClick={copyPassword}   type="button" value="Copy" />
        </div>
        <div className='space-x-5'>
          <input type="range" min={8} max={12} onChange={(e) => { setLength(e.target.value)}} />
          <span>Length:{length}</span>
          <input type="radio" name="radio" onClick={(e) => setNumber(e.target.value)} />Number
          <input type="radio" name="radio" onClick={(e) => setChar(e.target.value)} />Character
        </div>

      </div>
    </div>
  </>
)
}

export default App
