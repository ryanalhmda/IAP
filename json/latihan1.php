<?php 

// $mahasiswa = [
//     "nama" => "Ryan Alhamda Syukra",
//     "NIM"  => "2217020147",
//     "email" => "ryanalhmda@gmail.com"
// ];

$dbh = new PDO('mysql:host=localhost;dbname=kb_penyuluhan', 'root', '');
$db = $dbh->prepare('SELECT * FROM users');
$db->execute();
$users = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($users);
echo $data;

?>