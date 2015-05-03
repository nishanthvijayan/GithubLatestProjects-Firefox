function putdata(json)
{ 

  $("#hot > li").remove();
  $("hr").remove();


  $.each(json.items , function(i,repo){ 
    
    if(repo.language!=null)language = '<h5 class="language">('+repo.language+')</h5><br>';
    else language = "";

    if(repo.description!=null)description = '<h5 class="desc">'+repo.description+'</h5><br>';
    else description = "";

    $("#hot").append('<li data="'+repo.html_url+'"><h4>'+repo.name+'</h4>'+
      language+
      description+'<h5>'+repo.stargazers_count+' Stars</h5></li><hr>')
  });

}

function fetchdata(){
  imgToggle();
  date = new Date(new Date().getTime()-7*24*60*60*1000).toISOString().slice(0,10)
  req =  new XMLHttpRequest();
  req.open("GET",'https://api.github.com/search/repositories?q=created:%3E'+date+'&sort=stars&order=desc',true);
  req.send();
  req.onload = function(){
    imgToggle();
    $("span").remove();
    $("footer a:nth-child(2)").before('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<iframe src="https://ghbtns.com/github-btn.html?user=nishanthvijayan&repo=GithubLatestProjects-Firefox&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe></span>');
    
    res = JSON.parse(req.responseText);
    putdata(res);

  };
  req.onerror = function(){
    imgToggle();
  }

}

function imgToggle(){
  src = $('.loading').attr('src');
  if(src=="img/refresh-white.png") $(".loading").attr("src","img/ajax-loader.gif");
  else $(".loading").attr("src","img/refresh-white.png");
}

$(document).ready(function(){

  fetchdata();
  // data is fetched only once in 1 hr.
  setInterval(function(){
    fetchdata();
  }, 600000);

  
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

  $("body").on('click',".info", function(){
    window.alert("The Github projects show here were all created within the past 7 days and are ordered according to the number of star they have.");
    return false;
  });

  $("body").on('click',".loading", function(){
    fetchdata();
    return false;
  });
});

