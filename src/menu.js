$(function() {
    // prevent link with href="#"
    $('ul.navbar-nav a[href="#"]').click(function(e) {
        e.preventDefault(); 
    });
    
    // init bootstrap-submenu
    $('[data-submenu]').submenupicker();
    
    // sso logout
    $('#logout').click(function(e) {
        e.preventDefault(); 
        $.ajax({
            method: 'POST',
            url: '/uaa/logout',
            xhrFields: {
                withCredentials: true
            }
        }).done(function() {
            localStorage.removeItem('at');
            $('#logoutForm').submit();
        });
    });
});    
