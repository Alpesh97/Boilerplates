<?php 
require_once("config.php");
global $pagename;
$pagenameExplode=explode('/',$_SERVER["PHP_SELF"]);

$pagename=$pagenameExplode[count($pagenameExplode)-1];

$pagename = explode('.',$pagename);
if (!empty($pagename)) {
	$pagename = $pagename[0];
}
if ($pagename == 'index') {
	$pagename=$pagenameExplode[count($pagenameExplode)-2];
}
function getPageName(){
	$pagenameExplode=explode('/',$_SERVER["PHP_SELF"]);
	$pageNameURL = $pagenameExplode[count($pagenameExplode)-2];
	$pageNameURL = explode('.',$pageNameURL);
	if (!empty($pageNameURL)) {
		$pageNameURL = $pageNameURL[0];
	}
	return $pageNameURL; 
}

?>
	