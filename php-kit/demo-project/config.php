<?php
$siteName='demo-project/';
$rootUrl = (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/'.$siteName.'';
$rootPath=rtrim($_SERVER['DOCUMENT_ROOT'], '/') .'/'.$siteName.'';
?>