<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use Illuminate\Support\Str;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Storage;
class ApplicationController extends Controller
{
    public function text(Request $request)
    {
        $this->enableCors($request);
        $request->validate([
            'avatar' => ['file']
        ]);

        if ($request->hasFile('avatar')) {
            $avatar = Storage::disk('public')->put('/', $request->file('avatar'));
        }
        return response()->json(['message' => 'File uploaded successfully', 'status' => 'success']);
    }
    public function insertApplication(Request $request)
    {
        $this->enableCors($request);

        $request->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|email',
            'contactNumber' => 'required|string',
            'resume' => 'file' // File is optional
        ]);

        // Store file if provided
        $filePath = null;
        $fileName = null;

        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filePath = Storage::disk('public')->put('/', $file); // Store file
            $fileName = $file->getClientOriginalName(); // Get original filename
        }

        // Save application details
        $application = new Application();
        $application->firstname = $request->input('firstName');
        $application->lastname = $request->input('lastName');
        $application->email = $request->input('email');
        $application->num = $request->input('contactNumber');
        $application->projectname = $request->input('projectname');
        $application->degree = $request->input('degree');
        $application->contact_time = $request->input('contactTime');
        $application->job_experience = $request->input('jobExperience');
        $application->age = $request->input('age');
        $application->fileid = $filePath ? pathinfo($filePath, PATHINFO_FILENAME) : null; // Use file name as fileid
        $application->filename = $fileName; // Store filename
        $application->save();

        return response()->json(['message' => 'Application submitted successfully', 'status' => 'success']);
    }

    public function getAllApplications()
    {
        $this->enableCors(request());

        $applications = Application::all()->map(function ($application) {
            // Construct the full URL for file access
            if ($application->fileid) {
                $application->fileUrl = asset("storage/{$application->fileid}.pdf");
            }
            return $application;
        });

        return response()->json([
            'status' => 'success',
            'applications' => $applications
        ]);
    }

    public function approveApplication(Request $request)
    {
        $this->enableCors($request);
        $application = Application::find($request->application_id);
        $application->isapproved = 'approved';
        $this->sendApproveEmail($application->firstname, $application->email);
        $application->save();
        return response()->json(['message' => 'Application approved successfully', 'status' => 'success']);

    }

    public function sendApproveEmail($name, $email)
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        //Enable SMTP authentication
        $mail->Host = 'smtp.gmail.com';                     //Set the SMTP server to send through                                 
        $mail->Username = 'misternonoy11@gmail.com';                     //SMTP username
        $mail->Password = 'zwnx vmxk vghl igzt';

        $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
        $mail->Port = 587;

        $mail->setFrom('lifewood@gmail.com', "Lifewood");
        $mail->addAddress($email);     //Add a recipient

        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Lifewood Application Update';

        $email_template = "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Lifewood Application</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    background-color: #f9f9f9;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
                h3 {
                    color: #007BFF;
                    margin-bottom: 15px;
                }
                h4 {
                    color: #333;
                    margin-bottom: 10px;
                }
                .verification-code {
                    font-size: 18px;
                    color: #ffffff;
                    background-color: #28a745;
                    padding: 10px 20px;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 10px;
                }
                .email-footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class='email-container'>
                <h3>Hi $name,</h3>
                <h4>Thank you for sending your application to Lifewood</h4>
                <p>We are pleased to say that you have been invited to an interview, please wait for a followup email for the interview details.</p>
                <div class='email-footer'>
                    <p>&copy; " . date('Y') . " Lifewood. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";


        $mail->Body = $email_template;
        try {
            $mail->send();
            return 1; // Email sent successfully

        } catch (Exception $e) {
            return 0; // Error occurred while sending email
        }
    }

    public function rejectApplication(Request $request)
    {
        $this->enableCors($request);

        $application = Application::find($request->application_id);

        if (!$application) {
            return response()->json(['message' => 'Application not found', 'status' => 'error'], 404);
        }

        $application->isapproved = 'rejected'; // Set status to rejected
        $application->save();

        $this->sendRejectEmail($application->firstname, $application->email);

        return response()->json(['message' => 'Application rejected successfully', 'status' => 'success']);
    }

    public function sendRejectEmail($name, $email)
    {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = 'smtp.gmail.com';
        $mail->Username = 'misternonoy11@gmail.com';
        $mail->Password = 'zwnx vmxk vghl igzt';

        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('lifewood@gmail.com', "Lifewood");
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Lifewood Application Update';

        $email_template = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Lifewood Application</title>
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            h3 {
                color: #dc3545;
                margin-bottom: 15px;
            }
            h4 {
                color: #333;
                margin-bottom: 10px;
            }
            .email-footer {
                margin-top: 20px;
                font-size: 12px;
                color: #888;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <h3>Hi $name,</h3>
            <h4>Thank you for applying to Lifewood.</h4>
            <p>We appreciate the time you took to apply. Unfortunately, we have decided to move forward with other candidates at this time.</p>
            <p>We encourage you to apply again in the future as we continue to seek talented individuals.</p>
            <div class='email-footer'>
                <p>&copy; " . date('Y') . " Lifewood. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";

        $mail->Body = $email_template;
        try {
            $mail->send();
            return 1; // Email sent successfully
        } catch (Exception $e) {
            return 0; // Error occurred while sending email
        }
    }


}
