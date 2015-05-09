function putdata(json)
{ 

  $("#hot > li").remove();
  $("hr").remove();


  $.each(json.items , function(i,repo){ 

    var node = document.createElement("li");
    node.data = repo.html_url;

    var nameText = document.createTextNode(repo.name);
    var nameNode = document.createElement("h3");
    nameNode.appendChild(nameText);
    node.appendChild(nameNode);
    
    if(repo.language!=null){
      var languageText = document.createTextNode('('+repo.language+')');
      var languageNode = document.createElement("h4");
      languageNode.appendChild(languageText);
  
      node.appendChild(languageNode);
      node.appendChild(document.createElement("br"));
    }
    if(repo.description!=null){
      var descText = document.createTextNode(repo.description);
      var descNode = document.createElement("h4");
      descNode.appendChild(descText);
      descNode.className = "desc";
  
      node.appendChild(descNode);
      node.appendChild(document.createElement("br"));  
    }

    var starText = document.createTextNode(repo.stargazers_count+' Stars');
    var starNode = document.createElement("h4");
    starNode.appendChild(starText);
    node.appendChild(starNode);
    
    document.getElementById("hot").appendChild(node);
    document.getElementById("hot").appendChild(document.createElement("hr"));
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


    now = (new Date()).getTime()/1000;
    localStorage.cache  = req.responseText;
    localStorage.time = now;
    
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

  now = (new Date()).getTime()/1000;
  if(!localStorage.cache || now - parseInt(localStorage.time) > 5*60){
    // cache is old or not set
    fetchdata();
  }
  else{
    // cache is fresh
    putdata(JSON.parse(localStorage.cache));
    if(localStorage.scrollTop){
      document.body.scrollTop = localStorage.scrollTop;
    }
  }

  addEventListener('scroll', function(){
    localStorage.scrollTop = document.body.scrollTop;
  });

  $("body").on('click',"li", function(){
       chrome.tabs.create({url: this.data});
       return false;
     });

  $("body").on('click',"a", function(){
     chrome.tabs.create({url: $(this).attr('data')});
     return false;
   });


  $("body").on('click',".loading", function(){
    src = $('.loading').attr('src');
    if(src=="refresh-white.png") fetchdata();
  });

  $("body").on('click',".info", function(){
    window.alert("The Github projects show here were all created within the past 7 days and are ordered according to the number of star they have.");
    return false;
  });

	setTimeout(function(){
    $("footer a:nth-child(2)").before('<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<iframe src="https://ghbtns.com/github-btn.html?user=nishanthvijayan&repo=GithubLatestProjects-Firefox&type=star&count=true" frameborder="0" scrolling="0" width="100px" height="20px"></iframe></span>');
  },1000);

});

