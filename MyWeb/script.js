// $(function () { // Same as document.addEventListener("DOMContentLoaded"...

//   // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
//   $("#navbarToggle").blur(function (event) {
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       $("#collapsable-nav").collapse('hide');
//     }
//   });

//   $("#navbarToggle").click(function (event) {
//     $(event.target).focus();
//   });
// });

(function (global) {

var store = {};
var homeHtml = "snippets/home-snippet.html";
var sidebarHtml = "snippets/sidebar.html";
var Allblogs = "data/blogs.json";
var Blog_snippet = "snippets/Blogs-News.html";
var Blog_content_snippet = "snippets/Blog-content.html";
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
  var html = "<div style= 'position: absolute; top: 30%; right: 50%'>";
  html += "<img src='images/loading.gif'></div>";
  insertHtml(selector, html);
};

// function screenHeight(time){
//   setTimeout(() => { 
//     var height = document.querySelector("footer").offsetTop - document.getElementById("wrapper").offsetTop + "px"; 
//     console.log(height);
//     document.getElementById("wrapper").style.height = "'" + height + "'";
//   }, time);
// }

function sidenavbar(){
  $.ajax({type:'GET', url: sidebarHtml,
    success: function (responseText) {
      document.querySelector("#sidenav").innerHTML = responseText;
    }
  });
}
// On page load (before images or CSS)
$(function (event) {
// On first load, show home view
showLoading("#main-content");
sidenavbar();
$.ajax({type: 'GET', url: Allblogs,
  success: function (res){
    $.ajax({type: 'GET', url: Blog_snippet, 
      success: function(Blog_snippet){
        for (var i = 0; i < 4; ++i) {
          var html = Blog_snippet;
          html = insertProperty(html, "articlename", res.Blogs[i].articlename);
          html = insertProperty(html, "blogContent", res.Blogs[i].blogContent);
          $('#Blogs').append(html);
        }
        for (var i = 0; i < 4; ++i) {
          var html = Blog_snippet;
          html = insertProperty(html, "articlename", res.News[i].articlename);
          html = insertProperty(html, "blogContent", res.News[i].blogContent);
          $('#News').append(html);
        }
      }
    });
  }
});

//window.history.pushState("", "", "")

$.ajax({TYPE: 'GET', url: homeHtml,
  success: function (responseText) {
    document.querySelector("#main-content").innerHTML = responseText;
    //window.location.replace("http://xdevs.tech");
  }
});

store.loadBlogs = function() {
  showLoading("#main-content")
  // window.history.pushState("", "HowTos: Blogs", "/blogs")
  $.ajax({type : 'GET', url : Allblogs,
   success: function (res){
      $.ajax({type: 'GET', url: Blog_snippet, 
        success: function(Blog_snippet){
          insertHtml("#main-content", "<div id='Blogs' class='row'>");
          document.getElementById("Blogs").style.padding = "0px 12px"
          for (var i = 0; i < res.Blogs.length; ++i) {
            var html = Blog_snippet;
            html = insertProperty(html, "articlename", res.Blogs[i].articlename);
            html = insertProperty(html, "blogContent", res.Blogs[i].blogContent);
            if(i === 0){}
            $('#Blogs').append(html);
          }
          $("main-content").append("</div") 
        }
      });
    }
  });
}

store.loadNews = function() {
  showLoading("#main-content")
  // window.history.pushState("", "HowTos: News", "/news")
  $.ajax({type : 'GET', url : Allblogs,
   success: function (res){
      $.ajax({type: 'GET', url: Blog_snippet, 
        success: function(Blog_snippet){
          insertHtml("#main-content", "<div id='News' class='row'>");
          document.getElementById("News").style.padding = "0px 12px"
          for (var i = 0; i < res.News.length; ++i) {
            var html = Blog_snippet;
            html = insertProperty(html, "articlename", res.News[i].articlename);
            html = insertProperty(html, "blogContent", res.News[i].blogContent);
            if(i === 0){}
            $('#News').append(html);
          }
          $("main-content").append("</div") 
        }
      });
    }
  });
}

store.loadBlogsandNewsContent = function(name, val){
  showLoading("#main-content");
  $.ajax({type: 'GET', url: Blog_content_snippet,
    success: function(Blog_content_snippet){
      var html = Blog_content_snippet;
      html = insertProperty(html, "articlename", name);
      html = insertProperty(html, "blogContent", val);
      insertHtml("#main-content", html);  
      }
    });
  }
});

document.addEventListener("scroll", 
  function(event){
    // if (window.innerWidth < 768 && window.pageYOffset > 50){
    //   document.querySelector("header").style.position = "fixed";
    //   document.querySelector("header").style.top = "0"
    // }
    var top = document.querySelector("#wrapper").offsetTop + 32;
    var bottom = document.querySelector("footer").offsetTop - window.innerHeight - 32;

    if (window.pageYOffset >= top && window.pageYOffset <= bottom) {
      document.getElementById("sidebar").style.position = "fixed";
      } 
    else if (window.pageYOffset < top || window.pageYOffset > bottom){
      document.getElementById("sidebar").style.position = "sticky";
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
