$(function(){
    var result;
    var p;

    if (window.performance.navigation) {
        result=window.performance.navigation;
        if (result==255){result=4} // 4 is my invention!
    }

    if (window.performance.getEntriesByType("navigation")){
       p=window.performance.getEntriesByType("navigation")[0].type;

       if (p=='navigate'){result=0}
       if (p=='reload'){result=1}
       if (p=='back_forward'){result=2}
       if (p=='prerender'){result=3} //3 is my invention!
    }
    console.log(result);
});


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
    if (count === 0){
      $("#dropdown-content").show();
      count++;
    }
    else{
      $("#dropdown-content").hide();
      count--;
    }  
  }
}

document.addEventListener("scroll", 
  function(event){
      //   document.querySelector("header").style.position = "fixed";
      //   document.querySelector("header").style.top = "0"

    //Collapse TopNav
    if(window.pageYOffset > 350 && window.innerWidth < 768){
      $("#collapsable-nav").collapse('hide');   
    }

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
      document.getElementById("SearchContent1").style.maxHeight = "0"
    }
    else if( window.innerWidth < 768 && document.getElementById("SearchContent2").innerHTML !== ''){
      document.getElementById("SearchContent2").innerHTML = '';
      document.getElementById("SearchContent2").style.maxHeight = "0"
    }
  }
);

store.Searching = function(num){
  insertHtml("#SearchContent" + num, '')
  document.getElementById("SearchContent"+num).style.maxHeight = "262px"
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

// const navigationType = 
//     (window.performance.getEntriesByType('navigation')
//         [0] as PerformanceNavigationTiming).type;

// const isPageReload = navigationType === 'reload';
// const isNavigation = navigationType === 'navigate';
// const isBackForwarad = navigationType === 'back_forward';
// const isPrerender = navigationType === 'prerender';

// if (true) {}

global.$store = store;
})(window);