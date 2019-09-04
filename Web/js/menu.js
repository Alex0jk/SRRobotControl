$(document).ready(function () {
    var template =[ 
        '<nav id="sidebar">',
                '<div class="sidebar-header">',
                    '<h3>Control y Monitoreo de robots</h3>',
                '</div>',    
                '<ul class="list-unstyled components">',
                    '<li class="active">',
                        '<a href="../index.html" aria-expanded="false">Inicio</a>',
                    '</li>',
                    '<li class="active">',
                        '<a href="../robot/mainRobot.html">Registro de Robots</a>',
                    '</li>',
                    '<li class="active">',
                        '<a href="../records/mainRecord.html">Historial de Misiones</a>',
                    '</li>',
                    '<li class="active">',
                        '<a href="../control/mainControl.html">Sala de control</a>',
                    '</li>',
                '</ul>',
            '</nav>',
    ].join("\n");
    var templateContent =[
        '<button type="button" id="sidebarCollapse" class="btn btn-info">',
                '<i class="fas fa-align-left"></i>',
                '<span>Toggle Sidebar</span>',
        '</button>',
    ].join("\n");
    $("#menu").append(template);
    $("#toggle").append(templateContent);
    
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});