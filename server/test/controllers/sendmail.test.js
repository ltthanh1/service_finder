const nodemailer = require('nodemailer');

const sendMail = require('../../controllers/sendmail');

// jest.mock('nodemailer', () => ({
//   createTransport: jest.fn(() => ({
//     sendMail: jest.fn().mockResolvedValue({
//       messageId: 'mock-message-id',
//     }),
//   })),
// }));

// describe('sendMail', () => {
//   it('should send email successfully', async () => {
//     process.env.EMAIL_NAME = 'test@gmail.com';
//     process.env.EMAIL_APP_PASSWORD = 'test-password';

//     const email = 'recipient@example.com';
//     const subject = 'Test Email';
//     const html = '<p>This is a test email.</p>';

//     const result = await sendMail({ email, subject, html });

//     expect(nodemailer.createTransport).toHaveBeenCalledWith({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_NAME,
//         pass: process.env.EMAIL_APP_PASSWORD,
//       },
//     });

//     expect(transporter.sendMail).toHaveBeenCalledWith({
//       from: '"Phòng trọ Đỗ Thành" <no-relply@cellphones.com>',
//       to: email,
//       subject,
//       html,
//     });

//     expect(result).toEqual({
//       messageId: 'mock-message-id',
//     });
//   });
// });

// -------------------------------
describe('sendMail', () => {

    it('sendMail', async () => {
        const email = 'test@example.com'
        const html = '<h1>Test email</h1>'
        const subject = 'Test email subject'

        const info = await sendMail({ email, html, subject })
        expect(info).toBeDefined()
    })
});