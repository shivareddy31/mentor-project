document.getElementById('Mentorbtn').addEventListener('click',()=>{
    window.location.href = "./index.html";
})

document.getElementById('Studentbtn').addEventListener('click',()=>{
    window.location.href = "./addStudent.html";
})

document.getElementById('assignMentorbtn').addEventListener('click',()=>{
    window.location.href = "./AssignMentor.html";
})
document.getElementById('UpdateMentorbtn').addEventListener('click',()=>{
    window.location.href = "./UpdateMentor.html";
})

document.getElementById('ListMentorsBtn').addEventListener('click',()=>{
  window.location.href = "./listMentors.html";
})

if ($(window).width() > 350) {
  $(window).scroll(function(){  
if ($(this).scrollTop() > 50) {
   $('#navbar_top').addClass("fixed-top");
   $('#navbar_top').addClass("fade-in");
  // add padding top to show content behind navbar
  $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
}
else{
  $('#navbar_top').removeClass("fixed-top");
  $('#navbar_top').removeClass("fade-in");	      
  // remove padding top from body
  $('body').css('padding-top', '0');
  }   
});
} 


function custom_alert(type, message) {
  let newAlert = $("#message");
  newAlert.html(`
  <div class="fade-in text-center m-0 alert alert-${type} alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class=" close" data-dismiss="alert" aria-label="Close">
     <span aria-hidden="true">&times;</span>
  </button>
  </div>`);
  $("html, body").animate(
    {
    scrollTop: $("#message").offset().top,
    },
    500
  );
  setTimeout(() => {
    newAlert.html("");
  }, 3000);
}


var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
        
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } 
    else {
       mybutton.style.display = "none";
   }
 }

 function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}