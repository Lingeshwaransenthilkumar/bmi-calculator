// useState is used to maintain states or datas
/* things learnt while building bmi calculator
->BMI calculation
->useState
->errorMessage
->onkeydown
->onchange
->test() for valid values 
->digits testing (/^\d+$/)
->conditional rendering
->clearall function
->importing images and storing it like variable or values and used easily
*/


// BMI Calculator
import {useState} from 'react';
import bmiImg from './assets/bmi.png';
function Bmicalc(){
    const [height,setHeight]=useState("");
    const [weight,setWeight]=useState("");
    const [bmi,setBmi]=useState(null);
    const [bmiStatus,setBmiStatus]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    function calculateBmi(){
        // used to test and tell only digits are valid
        const isValidHeight=/^\d+$/.test(height);
        const isValidWeight=/^\d+$/.test(weight);
        // work when height and weight is valid
        if(isValidHeight && isValidWeight){
            const heightInMeters = height/100;
            const Bmivalue = weight/(heightInMeters * heightInMeters);
            setBmi(Bmivalue.toFixed(2));
            // bmi calculation
            if(Bmivalue<18.5){
                setBmiStatus("Underweight")
            }else if(Bmivalue>=18.5 && Bmivalue<24.9){
                setBmiStatus("Normal Weight");
            }else if (Bmivalue>25 && Bmivalue<29.9){
                setBmiStatus("Overweight")
            }else{
                setBmiStatus("Obese")
            }
            setErrorMessage("");
        }else{
            setBmi(null);
            setBmiStatus("");
            setErrorMessage("Please enter valid height and weight details");
        }
    }
    // by clicking enter key it should work
    function clickToCalculate(e){
        if(e.key==="Enter"){
            calculateBmi();
        }
    }
    // clear all the content after getting output
    function clearAll(){
        setBmi(null);
        setHeight("");
        setWeight("");
        setBmiStatus("");
        setErrorMessage("");
    }
    
    return(
        <>
        <div className='bmi-calculator'>
            <div className="box">
                <img src={bmiImg} alt="" />
            </div>
            <div className="data">
                    <h1>BMI Calculator</h1>
                    {/* if error exists it will come and give us attention */}
                    {errorMessage && <p className='error'>{errorMessage}</p>}
                    <div className="input-container">
                        <label htmlFor="height">Height (cm):</label>
                        <input type="text" id='height' value={height} onKeyDown={clickToCalculate} onChange={(e)=>{setHeight(e.target.value)}}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="weight">Weight (kg):</label>
                        <input type="text" id='weight' value={weight} onKeyDown={clickToCalculate} onChange={(e)=>{setWeight(e.target.value)}}/>
                    </div>
                    <button onClick={calculateBmi}>Calculate BMI</button>
                    <button onClick={clearAll}>Clear</button>
                    {/* if bmi is null the box will be absent */}
                    {bmi!==null && <div className="result">
                        <p>Your BMI is {bmi}</p>
                        <p>Status : {bmiStatus}</p>
                    </div>}
            </div>
        </div>
        </>
    )
}

export default Bmicalc;