// Mock Payment
// Simulate payment processing and return success or failure response
class Payment{
    static async processPayment(req, res){
        const { amount, paymentMethod, cartItems } = req.body;
        // console.log('Processing payment...');
        // console.log('Amount:', amount);
        // console.log('Payment Method:', paymentMethod);
        // console.log('Cart Items:', cartItems);
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
            res.status(200).json({
                message: 'Payment successful',
                transactionId: `txn_${Date.now()}`,
            });
        } else {
            res.status(400).json({ message: 'Payment failed. Please try again.' });
        }
    }
}
export default Payment;