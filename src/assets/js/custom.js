$(function () {
    $("#sideNavToggler").click(function () {
        $("#mySidenav").toggleClass("sidenavvisible");
    });

    $("#sideNavTogglerInner").click(function () {
        $("#mySidenav").removeClass("sidenavvisible");
    });

    $("#sideNavTogglerRight").click(function () {
        $("#mySidenavRight").toggleClass("sidenavvisibleright");
    });

    $("#sideNavTogglerInnerRight").click(function () {
        $("#mySidenavRight").removeClass("sidenavvisibleright");
    });

    $(window).scroll(function () {
        $("#mySidenav").removeClass("sidenavvisible");
        $("#mySidenavRight").removeClass("sidenavvisibleright");
    });

    if ($(window).width() < 575) {
        $("#mobileFooterContentLeft").addClass("mobileFooterContentLeft");
    };
    $('[data-toggle="tooltip"]').tooltip();
});



$('.triggerSidebar').click(function() {
    $('.sidebar').css('left', '0px')
    $('.overlay').css('opacity', '0.3')
    $('.overlay').css('width', '100%')
 })
 
 var sembunyikan = function() {
   $('.overlay').css('opacity', '0')
   $('.sidebar').css('left', '-300px')
   $('.overlay').css('width', '0%')
 }
 
 $('.hideSidebar').click(sembunyikan)
 $('.overlay').click(sembunyikan)

