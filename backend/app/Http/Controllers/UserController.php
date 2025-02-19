<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class UserController extends Controller
{
    public function login(Request $request)
    {
        $this->enableCors($request);

        $username = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $username)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ]);
        }

        // Check if user is on cooldown
        if ($user->cooldown && Carbon::parse($user->cooldown)->isFuture()) {
            $timeLeft = max(0, now()->diffInMinutes(Carbon::parse($user->cooldown)));
            $timeLeft = number_format($timeLeft, 2); // Format to 2 decimal places
            return response()->json([
                'message' => 'Too many attempts. Please try again in later',
                'time_left' => $timeLeft // Always returns a positive number
            ]);
        }

        if (Hash::check($password, $user->password)) {
            // Reset attempts on successful login
            $user->attempts = 0;
            $user->cooldown = null;
            $user->save();

            // Simulate a token (In production, use Laravel Sanctum or JWT)
            // $token = base64_encode(str_random(40));

            return response()->json([
                'message' => 'Login successful',
                // 'token' => $token,
                'user' => [
                    'email' => $user->email,
                    'name' => $user->name
                ]
            ]);
        } else {
            // Increment failed attempts
            $user->attempts += 1;

            // If attempts are 3 or more, set cooldown for 5 minutes
            if ($user->attempts >= 3) {
                $user->cooldown = Carbon::now()->addMinutes(5);
            }

            $user->save();

            return response()->json([
                'message' => 'Invalid email or password'
            ]);
        }
    }

    public function logout(Request $request)
    {
        $this->enableCors($request);

        // Validate input
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        // Reset attempts on logout
        $user->attempts = 0;
        $user->save();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }

    public function register(Request $request)
    {
        $this->enableCors($request);


        $isExisting = User::where('email', $request->email)->first();
        if ($isExisting) {
            if ($isExisting->email_verified_at == null) {
                // Generate a 6-character random verification code (letters & numbers)
                $verificationCode = strtoupper(Str::random(6));

                // Create user in database (but mark as unverified)
                $isExisting->name = $request->name;
                $isExisting->email = $request->email;
                $isExisting->password = Hash::make($request->password);
                $isExisting->verification_code = $verificationCode; // Store code
                $isExisting->email_verified_at = null; // Unverified
                $isExisting->save();

                // Send verification email
                $this->sendEmailCode($request->name, $request->email, $verificationCode);

                return response()->json([
                    'message' => 'Verification code has been sent to your email',
                    'status' => 'success'
                ]);
            } else {
                return response()->json([
                    'message' => 'Email already exists',
                    'status' => 'error'
                ]);
            }
        }

        // Generate a 6-character random verification code (letters & numbers)
        $verificationCode = strtoupper(Str::random(6));

        // Create user in database (but mark as unverified)
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->verification_code = $verificationCode; // Store code
        $user->email_verified_at = null; // Unverified
        $user->save();

        // Send verification email
        $this->sendEmailCode($request->name, $request->email, $verificationCode);

        return response()->json([
            'message' => 'Verification code has been sent to your email',
            'status' => 'success'
        ]);
    }

    public function sendEmailCode($name, $email, $verificationCode)
    {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->Host = 'smtp.gmail.com';
            $mail->Username = 'misternonoy11@gmail.com'; // Replace with your email
            $mail->Password = 'zwnx vmxk vghl igzt'; // Replace with your email app password
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('lifewood@gmail.com', "Lifewood");
            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'Lifewood Email Verification Code';

            // Email body
            $email_template = "
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Email Verification</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; background-color: #f9f9f9; color: #333; }
                    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); text-align: center; }
                    h3 { color: #007BFF; margin-bottom: 15px; }
                    .verification-code { font-size: 24px; color: #ffffff; background-color: #28a745; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; }
                    .email-footer { margin-top: 20px; font-size: 12px; color: #888; text-align: center; }
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <h3>Hello $name,</h3>
                    <p>Thank you for registering with Lifewood. Please use the verification code below to complete your email verification.</p>
                    <div class='verification-code'>$verificationCode</div>
                    <p>This code is valid for a limited time.</p>
                    <div class='email-footer'>
                        <p>&copy; " . date('Y') . " Lifewood. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            ";

            $mail->Body = $email_template;
            $mail->send();
        } catch (Exception $e) {
            return 0; // Email failed to send
        }
    }

    public function verifyCode(Request $request)
    {
        $this->enableCors($request);
        $user = User::where('email', $request->email)->first();
        if ($user->verification_code == $request->code) {
            $user->email_verified_at = now();
            $user->save();
            return response()->json([
                'message' => 'Email verification successful',
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid verification code',
                'status' => 'error'
            ]);
        }
    }

}
