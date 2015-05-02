function putdata(json)
{ 

  $("#hot > li").remove();
  $("hr").remove();


  $.each(json.items , function(i,repo){ 
    
    if(repo.language!=null)language = '<h5>('+repo.language+')</h5><br>';
    else language = "";

    if(repo.description!=null)description = '<h5 class="desc">'+repo.description+'</h5><br>';
    else description = "";

    $("#hot").append('<li data="'+repo.html_url+'"><h4>'+repo.name+'</h4>\
      <iframe src="https://ghbtns.com/github-btn.html?user='+repo.owner.login+'&repo='+repo.name+'&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="40px"></iframe><br>'+
      language+
      description+'</li><hr>')
  });

}

function fetchdata(){

  req =  new XMLHttpRequest();
  req.open("GET",'https://api.github.com/search/repositories?q=created:%3E2015-04-25&sort=stars&order=desc',true);
  req.send();
  req.onload = function(){

    $("span").remove();
    $("footer a:nth-child(2)").before('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<iframe src="https://ghbtns.com/github-btn.html?user=nishanthvijayan&repo=codercalendar&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe></span>');
    
    res = JSON.parse(req.responseText);
    putdata(res);

  };

}



$(document).ready(function(){

  fetchdata();
  setInterval(function(){
    fetchdata();
  }, 300000);

  
  //sends "link to be opened" to main.js
  $("body").on('click',"li", function(){
    self.port.emit("linkClicked",$(this).attr('data'));
    return false;
  });
  
  //sends "link to be opened" to main.js
  $("body").on('click',"a", function(){
    self.port.emit("linkClicked",$(this).attr('data'));
    return false;
  });

});

