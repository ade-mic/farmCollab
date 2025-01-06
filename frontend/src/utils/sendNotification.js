import emailjs from "@emailjs/browser";


// initialize emailjs with your user id
emailjs.init(process.env.EMAILJS_USER_API_ID);

const sendCustomerEmailNotification = (customerName, orderDetails) => {
  const templateParams = {
    to_name: customerName,
    message: `Your order has been placed successfully. Order details: ${JSON.stringify(orderDetails)}`,
  };

  emailjs
    .send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams)
    .then((response) => console.log('Email sent successfully:', response.status, response.text))
    .catch((error) => console.error('Error sending email:', error));
};

const sendSellerEmailNotification = (sellerName, orderDetails) => {
  const templateParams = {
    to_name: sellerName,
    message: `You have received a new order. Order details: ${JSON.stringify(orderDetails)}`,
  };

  emailjs
    .send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams)
    .then((response) => console.log('Email sent successfully:', response.status, response.text))
    .catch((error) => console.error('Error sending email:', error));
}

export { sendCustomerEmailNotification, sendSellerEmailNotification };