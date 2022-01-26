import React, { useState } from 'react';
import debit_card from '../Assets/Images/atm-card.png';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const PinVerification = () => {
    let navigate = useNavigate();
    const [pin, setPin] = useState("");
    const PinVerify = async (e) => {
        e.preventDefault();

        const res = await fetch('/PinVerify', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pin })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid pin");
        }
        else {
            window.alert("Verification sucessfull");
            navigate("/Singup");
        }
    }

    return (
        <>
            <main role='main' className='main'>

                <div className='main-image'>
                    <img src={debit_card} alt='atm' />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Enter your PIN number"
                        variant="outlined"
                        value={pin || ''}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                    onClick={PinVerify}
                    >Verify</Button>
                </div>
                <div>
                </div>
            </main>

        </>
    );
};

export default PinVerification;
