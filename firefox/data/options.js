$(document).ready(function(){

	if(!localStorage.updateInterval)localStorage.updateInterval = "10";
	if(!localStorage.daysSinceCreation)localStorage.daysSinceCreation = "7";
  	if(!localStorage.maxCount)localStorage.maxCount = "15";
  	if(!localStorage.starCutoff)localStorage.starCutoff = "5";

	$('#updateInterval')[0].value = localStorage.updateInterval;
	$('#daysSinceCreation')[0].value = localStorage.daysSinceCreation;
	$('#maxCount')[0].value = localStorage.maxCount;
	$('#starCutoff')[0].value = localStorage.starCutoff;

	$('#updateInterval').change(function(){
		localStorage.updateInterval = $('#updateInterval')[0].value;
	});

	$('#daysSinceCreation').change(function(){
		localStorage.daysSinceCreation = $('#daysSinceCreation')[0].value;
	});

	$('#maxCount').change(function(){
		localStorage.maxCount = $('#maxCount')[0].value;
	});

	$('#starCutoff').change(function(){
		localStorage.starCutoff = $('#starCutoff')[0].value;
	});

});