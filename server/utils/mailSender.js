const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                // Add connection timeout to prevent hanging
                connectionTimeout: 10000, // 10 seconds
                greetingTimeout: 10000, // 10 seconds
                socketTimeout: 10000, // 10 seconds
            })


            let info = await transporter.sendMail({
                from: 'Studybuddy || Aayan',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
        throw error; // Re-throw error so caller knows it failed
    }
}


module.exports = mailSender;