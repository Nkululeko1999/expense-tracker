export const verificationTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        .container-box {
            background-color: #f1f5f9;
            padding: 50px;
        }

        .content-box {
            width: 60%;
            border-radius: 10px;
            box-shadow: 1 2 10px rgba(0, 0, 0, 0.1), -1 -2 10px rgba(0, 0, 0, 0.1);
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
        }

        .content-box p {
            font-size: 20px;
            opacity: 0.9;
        }

        
        .content-box h1 {
            font-size: 22px;
            color: #0f172a;
        }

        .content-box h2 {
            font-size: 24px;
            color: #0f172a;
            text-align: center;
        }

        .footer-text {
            font-size: 15px;
            text-align: center;
        }
    </style>
</head>
<body>   
    <div class="container-box">
        <div class="content-box">
            <h1>Action Required: One-Time Verification Code</h1>
            <p>You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
            <p>Please enter the following code for verification:</p>
            <h2>${code}</h2>
            <p>If you did not request this change, please change your password.</p>
        </div>

        <p class="footer-text">This message was sent from Expense Tracker, Inc., 1633 Fox, 38th floor, JHB, DT 1634</p>
    </div>
</body>
</html>`;






export const forgotPasswordTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        .container-box {
            background-color: #f1f5f9;
            padding: 50px;
        }

        .content-box {
            width: 60%;
            border-radius: 10px;
            box-shadow: 1 2 10px rgba(0, 0, 0, 0.1), -1 -2 10px rgba(0, 0, 0, 0.1);
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
        }

        .content-box p {
            font-size: 20px;
            opacity: 0.9;
        }

        .content-box h1 {
            font-size: 22px;
            color: #0f172a;
        }

        .content-box h2 {
            font-size: 24px;
            color: #0f172a;
            text-align: center;
        }

        .footer-text {
            font-size: 15px;
            text-align: center;
        }
    </style>
</head>
<body>   
    <div class="container-box">
        <div class="content-box">
            <h1>Forgot Your Password?</h1>
            <p>You are receiving this email because a request was made to reset your password.</p>
            <p>Please use the following code to reset your password:</p>
            <h2>${code}</h2>
            <p>If you did not request this change, please ignore this email.</p>
        </div>

        <p class="footer-text">This message was sent from Expense Tracker, Inc., 1633 Fox, 38th floor, JHB, DT 1634</p>
    </div>
</body>
</html>`;




export const signUpSuccessTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up Success</title>
    <style>
        .container-box {
            background-color: #f1f5f9;
            padding: 50px;
        }

        .content-box {
            width: 60%;
            border-radius: 10px;
            box-shadow: 1 2 10px rgba(0, 0, 0, 0.1), -1 -2 10px rgba(0, 0, 0, 0.1);
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
        }

        .content-box p {
            font-size: 20px;
            opacity: 0.9;
        }

        .content-box h1 {
            font-size: 22px;
            color: #0f172a;
        }

        .footer-text {
            font-size: 15px;
            text-align: center;
        }
    </style>
</head>
<body>   
    <div class="container-box">
        <div class="content-box">
            <h1>Welcome to Expense Tracker!</h1>
            <p>You have successfully signed up for Expense Tracker. Get started now to manage your expenses effectively.</p>
            <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        </div>

        <p class="footer-text">This message was sent from Expense Tracker, Inc., 1633 Fox, 38th floor, JHB, DT 1634</p>
    </div>
</body>
</html>`;




export const profileUpdatedTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Updated</title>
    <style>
        .container-box {
            background-color: #f1f5f9;
            padding: 50px;
        }

        .content-box {
            width: 60%;
            border-radius: 10px;
            box-shadow: 1 2 10px rgba(0, 0, 0, 0.1), -1 -2 10px rgba(0, 0, 0, 0.1);
            margin: 30px auto;
            padding: 20px;
            background-color: #fff;
        }

        .content-box p {
            font-size: 20px;
            opacity: 0.9;
        }

        .content-box h1 {
            font-size: 22px;
            color: #0f172a;
        }

        .footer-text {
            font-size: 15px;
            text-align: center;
        }
    </style>
</head>
<body>   
    <div class="container-box">
        <div class="content-box">
            <h1>Profile Updated</h1>
            <p>Your profile has been successfully updated. Enjoy using Expense Tracker with your updated information.</p>
            <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        </div>

        <p class="footer-text">This message was sent from Expense Tracker, Inc., 1633 Fox, 38th floor, JHB, DT 1634</p>
    </div>
</body>
</html>`;
