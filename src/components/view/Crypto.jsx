import React from 'react';
import { useRouter } from 'next/router';
import { SingleCoin } from "../../config/api"
import axios from 'axios';
function Crypto() {
    const router = useRouter()
    const { id } = router.query;
    return (
        <div>
            <h1>Raj</h1>
        </div>
    );
}

export default Crypto;
