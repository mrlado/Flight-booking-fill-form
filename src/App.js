import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DatePicker, Space } from 'antd';
import { AutoComplete } from 'antd';
import { BsPersonFillAdd } from 'react-icons/bs';


function App() {

const [inputValue, setInputValue] = useState
({
  return:false,
  OneWay:true,
  weref:'',
  weret:'',
  Departure:'',
  Return:'',
  DepartureReturn:'',
  adults:1,
  children:0,
  infants:0
})
const [addClients,setaddClients] = useState(false)
const [inputError, setInputError] = useState(
  {
    return:false,
    OneWay:false,
    weref:false,
    weret:false,
    Departure:false,
    Return:false,
  }
)
const { RangePicker } = DatePicker;

const CityArr = [
  "Atkinson", "Atlanta", "Atlantic", "Atlantic Beach", "Atlantic City", "Atlantic Highlands",
   "Atmore", "Atoka", "Attalla", "Attica", "Attleboro", "Attleboro Falls", "Atwater", 
 "Zimmerman", "Zion", "Zionsville", "Zionville", "Zolfo Springs", "Zuni"]

 const cityObjects = CityArr.map((city) => ({ value: city }));
 
useEffect(()=>{
if(inputValue.Departure < inputValue.Return){
  return setInputError(prev => ({...prev, Departure:true, Return:true}))
}else setInputError (prev => ({...prev, Departure:false, Return:false}))

},[inputValue])

useEffect(()=>{

if(inputValue.adults< 1){
  setInputValue(prev => ({...prev,adults:1}))
}if(inputValue.children<=0){
  setInputValue(prev => ({...prev,children:0}))
}if(inputValue.infants<=0){
  setInputValue(prev => ({...prev,infants:0}))
}


},[inputValue.adults,inputValue.children,inputValue.infants])

const checkedFunction = (e) => {
  const { name, checked } = e.target;

  if (name === "OneWay" && checked) {
    setInputValue(prev => ({ ...prev, OneWay: true, return: false }))
    setInputValue(prev => ({...prev,Departure:'',Return:''}));
  } else if (name === "return" && checked) {
    setInputValue(prev => ({ ...prev, return: true, OneWay: false }))
    setInputValue(prev => ({...prev,Departure:'',Return:''}))
  } 
  else {
    setInputValue(prev => ({ ...prev, OneWay: true, return:false }))
    setInputValue(prev => ({...prev,Departure:'',Return:''}))
  }
  
}

console.log(inputValue)

  return (
    <div className=" h-[100vh] w-full bg-black text-white flex flex-col justify-center items-center">

        <form className='flex flex-col justify-center items-center relative'>
          <div className='flex items-center gap-4 absolute left-0 -top-8'>
            <input 
            type="checkbox" 
            name="return" 
            value={inputValue.return} 
            className={`rounded-lg checkbox transition-all transition-duration: 14s ${inputValue.return ?  'border-green-500':'border-white '}`}
            onChange={checkedFunction}
            checked={inputValue.return}
            />
            <h1>Return</h1>
            <input type="checkbox" 
            name="OneWay" 
            value={inputValue.OneWay} 
            className={`rounded-lg  transition-all checkbox transition-duration: 1s ${inputValue.OneWay ? 'border-green-500':'border-white ' }`}
            onChange={checkedFunction}
            checked={inputValue.OneWay}
            />
            <h1>One way</h1>
          </div>
          <div className='flex justify-center items-center md:gap-1 w-full  flex-col sm:flex-row gap-3  transition-all transition-duration: 14s'>
          <AutoComplete className={`placeholder:italic placeholder:text-slate-400 border-none block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black`}
                options={cityObjects}   
                placeholder='where from?' 
                value={inputValue.weref} 
                onChange={(data)=>{setInputValue((prev) => ({...prev,weref:data}))}} 
                  filterOption={(inputValue, cityObjects) =>
                  cityObjects.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                } 
                />
               <AutoComplete className={`placeholder:italic placeholder:text-slate-400 border-none block bg-white w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black`}
                options={cityObjects}   
                placeholder='where to?' 
                value={inputValue.weret} 
                onChange={(data)=>{setInputValue((prev) => ({...prev, weret:data}))}} 
                  filterOption={(inputValue, cityObjects) =>
                  cityObjects.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                } 
                />

            
       {inputValue.OneWay &&  <input 
            type="date" 
            name="Departure" 
            value={inputValue.Departure} 
            className={`${!inputError.Departure ? 'border-slate-300' : 'border-red-500 text-red-500'} placeholder:italic placeholder:text-slate-400 block bg-white w-full border rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none   focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-black`} 
            placeholder='Departure'
            onChange={(e)=>{setInputValue(prev =>({...prev,  Departure:e.target.value}))}}
            autoComplete="off"
            />}
   
  {inputValue.return &&     <RangePicker
       className='w-[800px]'
        cellRender={(current) => {
          const style = {};
          if (current.date() === 1) {
            style.border = '1px solid #1890ff';
            style.borderRadius = '50%';
          }
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }}
        onChange={(value, Datestring) => { setInputValue(prev =>({...prev,  Departure:Datestring[0] , Return:Datestring[1]}))}}
        />}
            
            
            <div className='w-[250px] h-full bg-white rounded-md '>
              <div 
              className='text-center flex justify-center items-center relative'
              onClick={()=>{setaddClients(!addClients)}}
              >
                <h1 className='text-black mt-1'>{inputValue.adults+ inputValue.children+inputValue.infants}</h1>
                <div className='mt-1'>
                <BsPersonFillAdd className='text-black'/>
                </div>
              </div>
            { addClients && <div className='absolute top-[35px] right-[0] bg-white w-[200px] mt text-black rounded-md'>
                  <div className='flex justify-start items-center text-left ml-1'>
                    <h1 className='text-sm'> Adults(12+)</h1>
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2  ml-[27px]'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, adults:inputValue.adults-1}))}}
                      >-</button>
                      {inputValue.adults}
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, adults:inputValue.adults+1}))}}
                      >+</button>
                  </div>
                  <div className='flex justify-start items-center text-left ml-1'>
                    <h1 className='text-sm'> Children(2-11)</h1>
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2 ml-[10px]'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, children:inputValue.children-1}))}}
                      >-</button>
                      {inputValue.children}
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, children:inputValue.children+1}))}}
                      >+</button>
                  </div>
                  <div className='flex justify-start items-center text-left ml-1'>
                    <h1 className='text-sm'> Infants(--2)</h1>
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2 ml-[29px]'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, infants:inputValue.infants-1}))}}
                      >-</button>
                      {inputValue.infants}
                      <button className='bg-white border-[1px] border-blue-700 w-8 h-8 rounded-full m-2'
                      onClick={(e) => {e.preventDefault() ; setInputValue(prev =>({...prev, infants:inputValue.infants+1}))}}
                      >+</button>
                  </div>
                  <button 
                  onClick={(e)=>{ 
                    e.preventDefault ()
                    setaddClients(!addClients)
                  }
                }
                  className='w-full h-[30px] bg-black text-white border border-white hover:bg-white hover:text-black hover:border-black'>
                    Submit
                    </button>
              </div>}
            </div>

          </div>


          <button className='w-80 h-12 border-2 border-white mt-8 md:ml-[550px] hover:bg-white hover:text-black ml-[0] transition-all transition-duration: 14s'>Search</button>
        </form>

    </div>
  );
}

export default App;
