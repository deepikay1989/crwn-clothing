import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
    "pk_test_51L0fGk2QLINAsPpezzHCm3WwBPGEYIPBqtZE0zjdHVVjbfpfolvyP5AkIOfcwkc8WawuzxvSma7jLRz83eS9aoho00WNYWmFJn"
)