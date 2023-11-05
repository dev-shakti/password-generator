import { useState } from "react";
import "./app.css"
import usePasswordGenerator from "./components/usePasswordGenerator";
import Checkbox from "./components/checkbox";
import PasswordStrength from "./components/PasswordStrength";

function App() {

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);

  const [charLength, setCharLength] = useState(4)
  const [copy,setCopy]=useState(false)
  const {password, errorMessage, generatePassword}=usePasswordGenerator()

  const handleCheck = (index) => {
    const updateCheckBoxData = [...checkboxData]
    updateCheckBoxData[index].state = !updateCheckBoxData[index].state
    setCheckboxData(updateCheckBoxData)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopy(true)

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  

  return (
    <div className="main">
      <div className="box">
        {/* Display password & copy */}
        {
          password && (
            <div className="row show-password">
            <h4>{password}</h4>
            <button 
            className="btns copy-btn"
            onClick={handleCopy}
            >{copy ? "Copied" : "Copy"}</button>
          </div>
          )
        }
       
        {/* Char length */}
        <div className="row">
          <p>Character Length</p>
          <span>{charLength}</span>
        </div>
        <div className="row">
          <input
            type="range"
            min={4}
            max={20}
            value={charLength}
            onChange={(e) => setCharLength(e.target.value)}
          />
        </div>
        {/* checkboxes */}
        <div className="checkbox-container">
          {checkboxData.map((item, index) => {
            return (
              <Checkbox
              key={index}
              title={item.title}
              onChange={() => handleCheck(index)}
              state={item.state}
              />
            );
          })}
        </div>

        {/* strength Indicator */}
        <PasswordStrength password={password}/>
 
          {/* Error Handling */}
         {errorMessage && <div className="errorMessage">{errorMessage}</div>} 

        <button 
          className="btns" 
          onClick={() => generatePassword(checkboxData, charLength)}>
          Generate password
        </button>
      </div>
    </div>
  )
}

export default App
