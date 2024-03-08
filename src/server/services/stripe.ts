import Stripe from 'stripe';
import { ProccessStatusType } from '../actions/types';

export const payment = async (name: string, email: string) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const customer = await stripe.customers.create({
        name,
        email,
    });

    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        mode: 'subscription',
        line_items: [
            {
                price: process.env.SUBCRIPTION_PRiCE_ID,
                quantity: 1,
            },
        ],
        success_url: '/app/payment-success',
        cancel_url: '/app',
    });

    return session;
};

export const checkIsActive = async (sessionId: string) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
        return { isActive: true, subscriptionId: session.subscription }
    }

    return { isActive: false, subscriptionId: '' }

};

export const cancelSubcription = async (subcriptionId: string): Promise<ProccessStatusType> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const result = await stripe.subscriptions.cancel(subcriptionId);

    return { success: result.status === 'canceled' };
};

const createSubscription = async () => {
    // const plan = await stripe.plans.create({
    //     amount: 1200, 
    //     currency: 'usd',
    //     interval: 'month', 
    //     product: 'prod_PhUZ0BzlNzzPdW', 
    // });

    // const { price, product } = await stripe.products.create({
    //     name: 'Premium subscriptions',
    //     description: '$12/Month subscription',
    // }).then(async (product) => {
    //     const price = await stripe.prices.create({
    //         unit_amount: 1200,
    //         currency: 'usd',
    //         recurring: {
    //             interval: 'month',
    //         },
    //         product: product.id,
    //     }).then(price => {
    //         console.log('Success! Here is your starter subscription product id: ' + product.id);
    //         console.log('Success! Here is your starter subscription price id: ' + price.id);
    //         return price;
    //     });

    //     return { price, product }
    // });
}