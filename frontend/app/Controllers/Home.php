<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
     // Ambil data dari API pertama
$apiUrl1 = 'http://localhost:5000/get-chart';
$response1 = \Config\Services::curlrequest()->get($apiUrl1);
$dataFromApi1 = json_decode($response1->getBody(), true);

// Ambil data dari API kedua
$apiUrl2 = 'http://localhost:5000/get-tabel';
$response2 = \Config\Services::curlrequest()->get($apiUrl2);
$dataFromApi2 = json_decode($response2->getBody(), true);

// Kirim data ke view
$data = [
    'dataFromApi1' => $dataFromApi1,
    'dataFromApi2' => $dataFromApi2,
];

return view('welcome_message', $data);
    }
}
