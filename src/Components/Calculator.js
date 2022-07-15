import * as math from "mathjs";
import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function Calculator() {

    
    const btnColor = "#154360";
    const txtColor = "#ffffff";
   
 
    const [isOperatorChanged, setOperatorChanged] = React.useState(true)//state can be used to avoid errors when changing the operator continuously
    const [needToClear, setNeedToClear] = React.useState(false)// state can be used to clear the input space after an operator is clicked
    const [changeTheSymbol, setChangeSymbol] = React.useState(true)//This can be used to get the the inverse of a particular number
    const [text, setText] = React.useState("")//This state can be used to set and change the text (result) entered into the input screen
    const [question, setQuestion] = React.useState("")//This state can be used to set and change the question entered into the input screen
    const [count, setCount] = React.useState(0)//This counter can be used to recognize the first time the user enters the number into the calculator
   
    
    //This will add text to the input screen 
    const addToText = (val) => {

        setOperatorChanged(false) 
        

        //checks the question is already evaluated or not 
        //checks the question string is a numerical expression or not
        if(question.includes("=") || !/[0-9]/.test(question)){ 
          setQuestion("")
        }

        if(needToClear){
             setText("") //clear the input text to enter a new number 
             setNeedToClear(false)
            
            
             
        }
        //adding the clicked text into the input screen 
        setText((text) => [...text, val].join(""))        
    }

    //This will add the question to the upper part of input screen 
    const addToQuestion = (val) => {

        const expression = question + text
        
        const answer = math.evaluate(expression)
           
        setCount(count + 1) 
        setNeedToClear(true)
        setChangeSymbol(true)
        
        if((isOperatorChanged  || count === 0 )){
            setQuestion(text + " " + val)
        }

        else if(val !== "=" && count  > 0 && !isOperatorChanged  ){
         
            if(answer === Infinity ){
                setQuestion("Cannot divide by zero") 
                setText("#")
            } else {
                setQuestion(answer + " " + val) 
                setText(answer)
            }      
    }
        
        else {
         
            if(answer === Infinity ){
                setQuestion("Cannot divide by zero") 
                setText("#")
            } else {
                 setQuestion(question + " " + text + " " + val) 
                 setText(answer)  
            } 
 
        }
       setOperatorChanged(true)
    }

    //This will return the inverse of a number
    const getInverse = () => {
        setChangeSymbol(prevValue => !prevValue)
        setText((prevText) => {
          return  changeTheSymbol ?  "-" + prevText: prevText.slice(1)
        })
        
    }

    //This will clear all the text from input screen 
    const clearInput = () => {
        setText("")
        setQuestion("")
       
    }


    return (
 
        <div className="calc--container">
             <Input text={text} question={question}/>

             <div className="row">
                 <Button label="7" handleClick={addToText}/>
                 <Button label="8" handleClick={addToText}/>
                 <Button label="9" handleClick={addToText}/>
                 <Button label="/" txtColor={txtColor} color={btnColor} handleClick={addToQuestion}/>
             </div>
             <div className="row">
                 <Button label="4" handleClick={addToText}/>
                 <Button label="5" handleClick={addToText}/>
                 <Button label="6" handleClick={addToText}/>
                 <Button label="*" txtColor={txtColor}  color={btnColor} handleClick={addToQuestion}/>
             </div>
             <div className="row">
                 <Button label="1" handleClick={addToText}/>
                 <Button label="2" handleClick={addToText}/>
                 <Button label="3" handleClick={addToText}/>
                 <Button label="+" txtColor={txtColor} color={btnColor} handleClick={addToQuestion}/>
             </div>
             <div className="row">
                 <Button label="0" handleClick={addToText}/>
                 <Button label="." handleClick={addToText}/>
                 <Button label="=" color="#660000" txtColor={txtColor} handleClick={addToQuestion} />
                 <Button label="-" txtColor={txtColor} color={btnColor} handleClick={addToQuestion}/>
             </div>
             <div className="row">
                 <Button label="+ / -" color="black" txtColor={txtColor} handleClick={getInverse} />
                 <Button label="Clear" color="black"  txtColor={txtColor} handleClick={clearInput}/>
             </div>
        </div>
    )

}