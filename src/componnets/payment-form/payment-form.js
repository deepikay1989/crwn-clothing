import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Button, BUTTON_TYPE_CLASSES } from "../button/button";
import { PaymentButton, FormContainer, PaymentFormContainer} from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response;
        console.log(client_secret)
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName: 'Guest',
                }
            }
        });
        setIsProcessingPayment(false);
        if(paymentResult.error) {
            console.log(paymentResult.error)
            alert(paymentResult.error)
        }
        else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                console.log(paymentResult.paymentIntent.status)
                alert('Payment successfull');
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export {PaymentForm}