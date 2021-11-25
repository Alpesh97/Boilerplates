<?php
@header('Content-Type: text/html; charset=UTF-8');
require_once("config.php");
require_once("function.php");
$currentURL = '';
$currentURL = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$currentURL = explode("?", $currentURL);

?>
<!DOCTYPE html>
<html>
<head>
