$(document).ready(function(){
  "use strict";

  //declare time vars
  var startTime=new Date().getTime();
  var endTime=0;
  var elapsedTime=0;

  //declare object holding x & y
  var position={
    "x":0,
    "y":0
  };

  //gamestate boolean
  var gameOn=false;

  //start game linchpin
  $("html").one("keypress", function(){
    $("#openPrompt").addClass("invis");
    $("#attackDiv").removeClass("invis");
    $("body").css("background-color","rgb(0,102,204)");
    gameOn=true;
  });

  //assign x & y (mouse position) to object
  $("body").on("mousemove", function(){
    if(gameOn===true){
      position={
        "x":event.pageX,
        "y":event.pageY
      };
    }
  });

  //update position of attacking div every .5s (also .7s transition in css)
  setInterval(function(){
    $("#attackDiv").css({"left":position.x-40,"top":position.y-40});
  },500);

  //detects if attackDiv catches player
  $("#attackDiv").one("mouseenter", function myFunction(event){
    endTime=new Date().getTime();
    elapsedTime=Number(endTime)-Number(startTime);
    elapsedTime=elapsedTime/1000;
    $("#attackDiv").css({"background-color":"maroon","width":"100%","height":"100%","position":"static","-webkit-animation":""});
    $("div div").removeClass("invis");
    $("div div").eq(0).text("GAME OVER");
    $("div div").eq(1).text("Time elapsed: "+elapsedTime+" seconds");
  });

  //timeouts to make game more difficult
  setTimeout(function(){
    if(endTime === 0){
      $("#attackDiv").css({"width":"100px","height":"100px"});
    }
  }, 10000);
  setTimeout(function(){
    if(endTime === 0){
      $("#attackDiv").css({"width":"150px","height":"150px","-webkit-animation":"spin 0.7s infinite linear"});
    }
  }, 20000);
  setTimeout(function(){
    if(endTime === 0){
      $("#attackDiv").css({"width":"200px","height":"200px"});
    }
  }, 30000);
  setTimeout(function(){
    if(endTime === 0){
      $("#attackDiv").css("transition","left .4s linear, top .4s linear");
    }
  }, 50000);


  //single click changes background color
  var r=0;
  var g=102;
  var b=204;
  var i=0;
  $("html").on("click", function(){
    if(i<10){
      r=r+10;
      g=g+10;
      b=b-10;
      $("body").css("background-color","rgb("+r+","+g+","+b+")");
      i++;
    }
  });

  //double click freezes game (available 3x)
  var freeze=3;
  $("html").on("dblclick", function(){
    if(freeze>0){
      gameOn=false;
      setInterval(function(){
        gameOn=true;
      },4000);
      freeze--;
      console.log(freeze);
    }
  });


//events: click, mouseover, mouseout, keyup, keydown, submit, change, focus, search
});
