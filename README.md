# GithubLatestProjects
A Mozilla Firefox add-on that lets you discover up &amp; coming Github projects.  
The add-on displays a list of Open Source Projects on Github that were created within the past few days ( 7 by default,can be changed ).   
  
Check out the Chrome extension repo here:  
https://github.com/nishanthvijayan/GithubLatestProjects-Chrome/  
  
## Download  
GithubLatestProjects is  available for download at:
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/github-latest/
- Chrome: Coming Soon   

## Manual Installation
This add-on was created using Firefox Add-on SDk.  
Follow these instructions to install and setup the SDK:   
https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation  
  
Once you have installed and activated the SDK, do the following:    
```
git clone git@github.com:nishanthvijayan/GithubLatestProjects-Firefox.git  
cd GithubLatestProjects-Firefox
  
# To run the add-on to test out changes use:
cfx run
# To build an installable file (xpi) use:
cfx xpi
```
You can read more about the cfx tool here:  
https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx  
  
## Planned Changes/Features
- ~~Add a better settings page~~
- Improve the design  
- Option to filter by language  
- Hide repos that have already been starred