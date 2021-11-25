		<?php require_once("config.php");?>
		</main>
	
	<footer class="site-footer">		
		
	</footer>
</div><!--End of main-site-wrapper-->
 

  <?php 
	if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || preg_match('~Trident/7.0(; Touch)?; rv:11.0~',$_SERVER['HTTP_USER_AGENT'])) {
	?>
  		<script src="<?php echo $rootUrl ?>public/js/ie-vendor.js"></script>
  	<?php }
  	else {
  	?>
  	<script src="<?php echo $rootUrl ?>public/js/vendor.js"></script>
  	<?php
  	}
   	?>


