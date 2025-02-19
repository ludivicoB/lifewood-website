<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{

    protected $table = 'applications'; // Define table name if different

    protected $primaryKey = 'application_id'; // Custom primary key


    protected $fillable = [
        'application_id',
        'firstname',
        'lastname',
        'email',
        'num',
        'fileid',
        'status',
        'filename',
        'projectname',
        'isapproved',
        'age',
        'degree',
        'job_experience',
        'contact_time',
    ];
}
