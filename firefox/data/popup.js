function putData(json)
{ 
  for (var i = 0; i < parseInt(localStorage.maxCount) && i<json.items.length;i++ ) {

    repo = json.items[i];

    if(parseInt(repo.stargazers_count)<parseInt(localStorage.starCutoff)){break;}
    
    var node = document.createElement("li");

    var ownerNameText = document.createTextNode(repo.owner.login+'/');
    var ownerName = document.createElement("span");
    ownerName.className = "ownerName";
    ownerName.appendChild(ownerNameText);
    
    var repoNameText = document.createTextNode(repo.name);
    var repoName = document.createElement("span");
    repoName.className = "repoName";
    repoName.appendChild(repoNameText);
    
    var nameNode = document.createElement("span");
    nameNode.appendChild(ownerName);
    nameNode.appendChild(repoName);
    nameNode.data = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/i.exec(repo.html_url)[0];
    nameNode.className = "name";

    node.appendChild(nameNode);

    node.appendChild(document.createElement("br"));
    node.appendChild(document.createElement("br"));
    
    if(repo.description!=null){
      var descText = document.createTextNode(repo.description);
      var descNode = document.createElement("h5");
      descNode.appendChild(descText);
      descNode.className = "desc";
      node.appendChild(descNode);
      node.appendChild(document.createElement("br"));  
    }

    buildTime = (repo.tag==null)?moment(repo.created_at).fromNow():repo.tag;
    if(repo.language!=null)bottomText = repo.stargazers_count+' Stars  •  '+repo.language+'  •  '+buildTime;
    else bottomText = repo.stargazers_count+' Stars  •  '+buildTime;
    var starText = document.createTextNode(bottomText);
    var starNode = document.createElement("h5");
    starNode.appendChild(starText);
    starNode.className = "stars"
    node.appendChild(starNode);
    
    document.getElementById("hot").appendChild(node);
    document.getElementById("hot").appendChild(document.createElement("hr"));
  };

}

function fetchData(){
  imgToggle();
  daysSinceCreation = parseInt(localStorage.daysSinceCreation);
  date = new Date(new Date().getTime()-daysSinceCreation*24*60*60*1000).toISOString().slice(0,10)
  req =  new XMLHttpRequest();
  req.open("GET",'https://api.github.com/search/repositories?q=created:%3E'+date+'&sort=stars&order=desc',true);
  req.send();
  req.onload = function(){
    imgToggle();
    res = JSON.parse(req.responseText);
    putData(res);

  };
  req.onerror = function(){
    imgToggle();
  }

}

function fetchFeatured(){
  imgToggle();
  reqf =  new XMLHttpRequest();
  reqf.open("GET",'https://ghtrending.herokuapp.com/featured/',true);
  reqf.send();
  reqf.onload = function(){
    imgToggle();
    res = JSON.parse(reqf.responseText);
    putData(res);
  };

  reqf.onerror = function(){
    imgToggle();
  };
}

function fillData(){

  $("#hot > li").remove();
  $("hr").remove();
  $("#hot").append("<hr>");
  
  fetchFeatured();
  setTimeout(function(){fetchData();},2000);
}

function imgToggle(){
  $( ".fa-refresh" ).toggleClass( "fa-spin" );
}

$(document).ready(function(){
  
  if(!localStorage.updateInterval)localStorage.updateInterval = "10";
  if(!localStorage.daysSinceCreation)localStorage.daysSinceCreation = "7";
  if(!localStorage.maxCount)localStorage.maxCount = "15";
  if(!localStorage.starCutoff)localStorage.starCutoff = "5";
  
  fillData();
  setInterval(function(){
    fillData();
  }, 60000*parseInt(localStorage.updateInterval));

  
  //sends "link to be opened" to main.js
  $("body").on('click',".name", function(){
    self.port.emit("linkClicked",this.data);
    return false;
  });

  $("body").on('click',".fa-gear", function(){
    self.port.emit("linkClicked", "options.html" );
  });

  $("body").on('click',".fa-code", function(){
    self.port.emit("linkClicked", "https://github.com/nishanthvijayan/GithubLatestProjects-Firefox/" );
  });  
  
  $("body").on('click',".fa-refresh", function(){
    if(!$( ".fa-refresh" ).hasClass( "fa-spin" )) fillData();
  });

});
