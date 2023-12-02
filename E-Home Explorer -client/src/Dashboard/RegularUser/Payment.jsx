import { loadStripe } from "@stripe/stripe-js"

import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { useParams } from "react-router-dom"


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const {id} = useParams();
  return (
    <div>
        
        <div>
            <h2 className="text-4xl mb-10">
                Payment Page
            </h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm offerId={id} />
            </Elements>
        </div>
    </div>
  )
}

export default Payment