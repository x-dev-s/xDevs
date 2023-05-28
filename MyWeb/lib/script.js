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

// $(function(){
//   document.querySelector("#Search2").addEventListener("focusout", function(event){
//       document.getElementById("SearchContent2").innerHTML = "";
//   })
// });


(function(global){
var store = {};
var HomeSnippet = "src/public/home/homeSnippet.html";
var BlogNewsContentSnippet = "src/public/BlogsandNews/BlogNewsContentSnippet.html";
var SearchHtml = "src/common/Search/search.html";
var SearchData = "data/Search/Search.json";
var count = 0;

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};
function sidenavbar(){
  $.ajax({type:'GET', url: sidebarHtml,
    success: function (responseText) {
      document.querySelector("#sidenav").innerHTML = responseText;
    }
  });
}

store.showDropdown = function(event){
  if (window.innerWidth < 768){
    var element = document.querySelector("#dropdown-content");
    if (count === 0){
      element.style.display = "block";
      count++;
    }
    else{
      element.style.display = "none";
      count--;
    }
    
      
  }
}

document.addEventListener("scroll", 
  function(event){
      //   document.querySelector("header").style.position = "fixed";
      //   document.querySelector("header").style.top = "0"

    //SideNavBar
    if (window.innerWidth >= 992){
      var top = document.querySelector("#wrapper").offsetTop + 32;
      var bottom = document.querySelector("footer").offsetTop - window.innerHeight - 32;

      if (window.pageYOffset >= top && window.pageYOffset <= bottom) {
        document.getElementById("sidebar").style.position = "fixed";
      } 
      else if (window.pageYOffset < top || window.pageYOffset > bottom){
        document.getElementById("sidebar").style.position = "sticky";
      }
    }

    //Goto Top button
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

    //Search Hide
    if (window.innerWidth >= 768 && document.getElementById("SearchContent1").innerHTML !== '') {
      document.getElementById("SearchContent1").innerHTML = '';
    }
    else if( window.innerWidth < 768 && document.getElementById("SearchContent2").innerHTML !== ''){
      document.getElementById("SearchContent2").innerHTML = '';
    }
  }
);

store.Searching = function(num){
  insertHtml("#SearchContent" + num, '')
  let val = document.querySelector('#searchbar' + num).value
  val = val.toLowerCase();
  $.ajax({type: 'GET', url: SearchData, 
    success: function(res){
      $.ajax({type: "GET", url: SearchHtml,
        success: function(SearchHtml){
          if(val !== ''){
            for (i = 0; i < res.length; i++) {
              var data = res[i].name.toLowerCase(); 
              if (data.includes(val)) {
                var html = SearchHtml;
                html = insertProperty(html, "linkname", res[i].name.toUpperCase())
                html = insertProperty(html, "article", res[i].article);
                html = insertProperty(html, "articlename", res[i].name);
                $("#SearchContent" + num).append(html);
              }
              var content = document.querySelector("#SearchContent" + num).innerHTML
              if (i === res.length - 1 && content === '') {       
                insertHtml("#SearchContent" + num, "<span class='mx-auto'>No results found</span>")
              }
            }
          }             
        }
      })                
    }
  })
};

// store.HideSearchContent = function(num){
//       document.getElementById("SearchContent" + num).innerHTML = "";
// };

global.$store = store;
})(window);