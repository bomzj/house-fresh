import $ from "./jquery";

window.onscroll = function () {
	if (document.location.pathname == "/") return;
		
    if (document.body.scrollTop > $(window).height() + 60 || document.documentElement.scrollTop > $(window).height() + 60) {
        $('#back-to-top-btn').fadeIn();
		document.getElementById("back-to-top-btn").style.display = "block";
    } else {
		$('#back-to-top-btn').fadeOut();
        document.getElementById("back-to-top-btn").style.display = "none";
    }
}