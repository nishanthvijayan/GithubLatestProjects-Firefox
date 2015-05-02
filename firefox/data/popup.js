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
  date = new Date(new Date().getTime()-7*24*60*60*1000).toISOString().slice(0,10)
  req =  new XMLHttpRequest();
  req.open("GET",'https://api.github.com/search/repositories?q=created:%3E'+date+'&sort=stars&order=desc',true);
  req.send();
  req.onload = function(){

    $("span").remove();
    $("footer a:nth-child(2)").before('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<iframe src="https://ghbtns.com/github-btn.html?user=nishanthvijayan&repo=GithubLatestProjects-Firefox&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe></span>');
    
    // cache creation
    localStorage.cache  = req.responseText;

    res = JSON.parse(req.responseText);
    putdata(res);

  };

}



$(document).ready(function(){

  if(localStorage.cache){
    localData = JSON.parse(localStorage.cache);
    putdata(localData);
  }

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

