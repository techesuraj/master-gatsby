const nodemailer = require("nodemailer");

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent order for ${total}</h2>
    <p>Please start walking over we will have your order ready in 20 mins</p>
    <ul>
    ${order.map(
      (item) => `
      <li>
        <img src="${item.thumbnail}" alt="${item.name}" />
      </li>
    `
    )}
    </ul>
  </div>`;
}
// Create a transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const requiredFields = ["email", "name", "order"];
  for (const field of requiredFields) {
    console.log(`checking that ${field} is goood`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }
  console.log(process.env.USER);
  const info = await transporter.sendMail({
    from: "Slick Slice <suraj@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: "New order!",
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
