function putdata(json)
{ 

  $("#hot > li").remove();
  $("hr").remove();


  $.each(json.items , function(i,repo){ 

    var node = document.createElement("li");
    node.data = repo.html_url;

    var nameText = document.createTextNode(repo.name);
    var nameNode = document.createElement("h4");
    nameNode.appendChild(nameText);
    node.appendChild(nameNode);
    
    if(repo.language!=null){
      var languageText = document.createTextNode('('+repo.language+')');
      var languageNode = document.createElement("h5");
      languageNode.appendChild(languageText);
  
      node.appendChild(languageNode);
      node.appendChild(document.createElement("br"));
    }
    if(repo.description!=null){
      var descText = document.createTextNode(repo.description);
      var descNode = document.createElement("h5");
      descNode.appendChild(descText);
      descNode.className = "desc";
  
      node.appendChild(descNode);
      node.appendChild(document.createElement("br"));  
    }

    var starText = document.createTextNode(repo.stargazers_count+' Stars');
    var starNode = document.createElement("h5");
    starNode.appendChild(starText);
    node.appendChild(starNode);
    
    document.getElementById("hot").appendChild(node);
    document.getElementById("hot").appendChild(document.createElement("hr"));
  });

}

function fetchdata(){
  imgToggle();
  daysSinceCreation = parseInt(localStorage.daysSinceCreation);
  date = new Date(new Date().getTime()-daysSinceCreation*24*60*60*1000).toISOString().slice(0,10)
  req =  new XMLHttpRequest();
  req.open("GET",'https://api.github.com/search/repositories?q=created:%3E'+date+'&sort=stars&order=desc',true);
  req.send();
  req.onload = function(){
    imgToggle();
    $("span").remove();
    $("header > h3").after('<span><iframe src="https://ghbtns.com/github-btn.html?user=nishanthvijayan&repo=GithubLatestProjects-Firefox&type=star&count=false" frameborder="0" scrolling="0" width="100px" height="20px"></iframe></span>');
    
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
  if(!localStorage.daysSinceCreation)localStorage.daysSinceCreation = "7";

  fetchdata();
  // data is fetched only once in 10min.
  setInterval(function(){
    fetchdata();
  }, 600000);

  
  //sends "link to be opened" to main.js
  $("body").on('click',"li", function(){
    self.port.emit("linkClicked",this.data);
    return false;
  });
  
  //sends "link to be opened" to main.js
  $("body").on('click',"a", function(){
    self.port.emit("linkClicked",$(this).attr('data'));
    return false;
  });

  $("body").on('click',".info", function(){
    window.alert("The Github projects shown here were all created within the past few days ( 7 by default ) and are ordered according to the number of star they have.");
    return false;
  });

  $("body").on('click',".loading", function(){
    fetchdata();
    return false;
  });

  self.port.on("Preference_Changed",function(data){
    localStorage.daysSinceCreation = data;
    fetchdata();
  });
});
