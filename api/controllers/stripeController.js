import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;
    console.log(products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: product.imageUrls ? [product.imageUrls[0]] : [],
        },
        unit_amount: product.offer
          ? product.discountPrice * 100
          : product.regularPrice * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://127.0.0.1:5173/success",
      cancel_url: "http://127.0.0.1:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
};
