$(document).ready(function(){
    
   get_con('js/list.json');

});

function get_con(file_name){
    $.getJSON(file_name, function(data){
              
    $("section").empty();
    $.each(data, function(index, en){
    
        var html ='<div class="box">';
	    html +='<div class="textbox">';
	    html +='<h1>'+en['number']+'</h1>';
	    html +='<h2>'+en['title']+'</h2>';
        html +='<h3>'+en['software']+'</h3></div>';
	   html+='<div class="picbox"><iframe width="350" height="198" src="https://www.youtube.com/embed/'+en['url']+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div>';
        
        $("section").append(html);
        
    });
              });}