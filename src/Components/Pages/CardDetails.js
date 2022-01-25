import React, { useState } from 'react';
import debit_card from '../Assets/Images/atm-card.png';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import VerifiedModal from '../Modals/VerifiedModal';
import NotVerifiedModal from '../Modals/NotVerifiedModal';

const CardDetails = () => {
    let navigate = useNavigate();
    const [verified, setVerified] = useState(false);
    const [notverified, setNotVerified] = useState(false);
    const [cardNumber, setCardNumber] = useState("");

    const CardNumberVerify = async (e) => {
        e.preventDefault();

        const res = await fetch('/CardNumberVerify', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cardNumber })
        });
        const data = res.json();
        if (res.status === 400 || !data) {
            setNotVerified(true);
            setTimeout(() => {
                setNotVerified(false);
            }, 2000);
        }
        else {
            setVerified(true);
            setTimeout(() => {
                setVerified(false);
                navigate("/pinverification");
            }, 2000);
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
                        label="Enter your 12 digit card number"
                        variant="outlined"
                        value={cardNumber || ''}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={CardNumberVerify}
                    >Verify</Button>
                </div>
                <div>
                    <Link to="Singup">click here to make account</Link>
                </div>
            </main>
            <VerifiedModal open={verified} handleClose={() => setVerified(false)} />
            <NotVerifiedModal open={notverified} handleClose={() => setNotVerified(false)} />
        </>
    );
};

export default CardDetails;
