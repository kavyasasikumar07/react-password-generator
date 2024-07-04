import React, { useState } from 'react';
import './App.css';

const containerStyle = {
    
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#bcbbce",
    width: "300px",
    margin: "auto",
    marginTop: "50px"
};

const inputContainerStyle = {
    margin: "10px 0"
};

const labelStyle = {
    marginRight: "10px"
};

const inputStyle = {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box"
};

const checkboxContainerStyle = {
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between"
};

const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
};

const copyButtonStyle = {
    marginLeft: "10px"
};

const App = () => {
    const [password, setPassword] = useState("");
    const [passwordLength, setPasswordLength] = useState(14);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");

    const generatePassword = () => {
        let charset = "";
        let newPassword = "";

        if (useSymbols) charset += "!@#$%^&*()+_-[]";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(
                Math.floor(Math.random() * charset.length)
            );
        }
        setPassword(newPassword);
    };

    const copyToClipboard = () => {
        const el = document.createElement("textarea");
        el.value = password;
        document.body.appendChild(el);
        el.select();
        document.execCommand("Copy");
        document.body.removeChild(el);
        setSuccessMessage("Password copied to clipboard");
        setTimeout(() => setSuccessMessage(""), 2000);
    };

    return (
        <center>
            <div style={containerStyle}>
                <h1
                    style={{
                        color: "green",
                        textAlign: "center",
                    }}
                >
                    Generator
                </h1>
                <h3 style={{ textAlign: "center" }}>
                    Random Password Generator
                </h3>
                <div style={inputContainerStyle}>
                    <label style={labelStyle}>Password Length:</label>
                    <input type="number"
                        min="8"
                        max="500"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(e.target.value)}
                        style={inputStyle} />
                </div>
                <div style={checkboxContainerStyle}>
                    <label>
                        <input type="checkbox"
                            checked={useSymbols}
                            onChange={() =>
                                setUseSymbols(!useSymbols)
                            }
                        />
                        Symbols
                    </label>
                    <label>
                        <input type="checkbox"
                            checked={useNumbers}
                            onChange={() =>
                                setUseNumbers(!useNumbers)
                            }
                        />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox"
                            checked={useLowerCase}
                            onChange={() =>
                                setUseLowerCase(!useLowerCase)
                            }
                        />
                        Lowercase
                    </label>
                    <label>
                        <input type="checkbox"
                            checked={useUpperCase}
                            onChange={() =>
                                setUseUpperCase(!useUpperCase)
                            }
                        />
                        Uppercase
                    </label>
                </div>
                <button
                    style={buttonStyle}
                    onClick={generatePassword}
                >Generate Password</button>
                {password && (
                    <div style={inputContainerStyle}>
                        <label style={labelStyle}>
                            Generated Password:
                        </label>
                        <input
                            type="text"
                            value={password}
                            readOnly
                            style={inputStyle} />
                        <button
                            style={{
                                ...buttonStyle,
                                ...copyButtonStyle,
                            }}
                            onClick={copyToClipboard}
                        >Copy</button>
                    </div>
                )}
                {successMessage && (
                    <p style={{ color: "green", textAlign: "center" }}>
                        {successMessage}
                    </p>
                )}
            </div>
        </center>
    );
};

export default App;
