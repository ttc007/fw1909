<!DOCTYPE html>
<html>
<head>
	<title>Fw1909 + Vue js</title>
	<script src="<?php echo webroot('js/vue/vue.js')?>"></script>
	<!-- https://cdn.jsdelivr.net/npm/vue -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo webroot('css/app.css')?>">
</head>
<body>
	<div id="app">
	  {{ message }}
	  <camera></camera>
	  <button-counter></button-counter>
	</div>

	<script src="<?php echo webroot('js/component/camera.js')?>"></script>
	<script src="<?php echo webroot('js/component/map.js')?>"></script>
	<script src="<?php echo webroot('js/component/creep.js')?>"></script>
	<script src="<?php echo webroot('js/component/hero.js')?>"></script>
	<script src="<?php echo webroot('js/component/skill.js')?>"></script>

	<script src="<?php echo webroot('js/app.js')?>"></script>
	
</body>
</html>