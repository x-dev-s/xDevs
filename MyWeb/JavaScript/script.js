$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
      $("header").style.position = "fixed"
    }
  });

  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

(function (global) {

var store = {};
var homeHtml = "snippets/home-snippet.html";
var sidebarHtml = "snippets/sidebar.html";
var Allblogs = "data/blogs.json";
var Blog_snippet = "snippets/Blogs-News.html";
var lengths = $(document.getElementById("main-content")).outerHeight();
console.log(length)
// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/loading.gif'></div>";
  insertHtml(selector, html);
};

function sidenavbar(){
  $ajaxUtils.sendGetRequest(
        sidebarHtml,function (responseText) {
          document.querySelector("#sidenav").innerHTML = responseText;
        },false);
}
// On page load (before images or CSS)
$(function (event) {
// On first load, show home view
showLoading("#main-content");
sidenavbar();
$ajaxUtils.sendGetRequest(Allblogs,
  function buildingHomeHtml(res){
    $ajaxUtils.sendGetRequest(Blog_snippet, 
      function(Blog_snippet){
        for (var i = 0; i < res.Blogs.length; ++i) {
          var html = Blog_snippet;
          html = insertProperty(html, "articlename", res.Blogs[i].articlename);
          html = insertProperty(html, "blogContent", res.Blogs[i].blogContent);
          $('#grid').prepend(html);
        }
      },false
    )
  },true
)


$ajaxUtils.sendGetRequest(homeHtml,
  function (responseText) {
    var height = window.lengths + "px" 
    //document.getElementById("wrapper").style.height = "852px";
    console.log("height")
    document.querySelector("#main-content").innerHTML = responseText;
  },
  false);
});

document.addEventListener("scroll", 
  function(){
    if (window.innerWidth < 768){
      document.querySelector("header").style.position = "fixed";
      document.querySelector("header").style.top = "0"
    }
    var top = document.querySelector("#wrapper").offsetTop;
    //console.log(top);
    var bottom = top + window.lengths - window.innerHeight;
    //console.log(bottom);
    if (window.pageYOffset >= 110 && window.pageYOffset <= 320) {
      document.getElementById("sidebar").style.position = "fixed";
      } 
    else if (window.pageYOffset < 110 || window.pageYOffset > 320){
      document.getElementById("sidebar").style.position = "sticky"
      }
    if (window.pageYOffset > 100){
      document.getElementById("ToTop").style.display = "block"
      document.getElementById("ToTop").onclick = function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    }
    else{
      document.getElementById("ToTop").style.display = "none"
    }
  }
);


// JavaScript code
function Searching() {
    let input = document.querySelector('.Search').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('toSearch');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}

var post= document.getElementById("post");
post.addEventListener("click", function(){
  var letters = /^[A-Za-z]+$/;
  var commentBoxValue= document.getElementById("comment").value;
  var nameVal = document.getElementById("name").value
  var emailVal = document.getElementById("email").value
  if (commentBoxValue.includes(letters) && nameVal.includes(letters) && emailVal.includes(letters)) {
    document.getElementById("required").style.display = "none"
    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("comments").appendChild(li);
  }
  else{
    document.getElementById("required").style.display = "inline"
  } 
});

  
global.$store = store;

})(window);
