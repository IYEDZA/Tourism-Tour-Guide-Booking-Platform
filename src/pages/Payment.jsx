import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_payment_Key)


const Payment = () => {

    
    return (
        <div className='mt-20'>
            <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
        </div>
    );
};

export default Payment;