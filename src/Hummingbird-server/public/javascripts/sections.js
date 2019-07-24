(function () {
    const DESKTOP_SCREEN_WIDTH = 992;
    console.log('Page initialized!');
    document.addEventListener('DOMContentLoaded', function () {
        initPageActions();
    
        function initPageActions () {
            initPaginationResizeAction();
            initWebsiteHeading();

            function initPaginationResizeAction () {
                window.addEventListener('resize', _.debounce(setPanginatorSize));
    
                function setPanginatorSize () {
                    var width = window.innerWidth;
                    var elPaginator = document.getElementById('paginator') 
                    if (width < DESKTOP_SCREEN_WIDTH) {
                        elPaginator.classList.remove('pagination-lg');
                    } else {
                        elPaginator.classList.add('pagination-lg');
                    }
                }
    
                setPanginatorSize();
            }
    
            function initWebsiteHeading () {
                window.addEventListener('resize', _.debounce(setHeading));
    
                function setHeading () {
                    width = window.innerWidth;
                    var elHeadings = document.getElementsByClassName('heading');

                    for (var i = 0; i < elHeadings.length; i++) {
                        if (width < DESKTOP_SCREEN_WIDTH) {
                            elHeadings[i].classList.add('sm-heading');
                        } else {
                            elHeadings[i].classList.remove('sm-heading');
        
                        }
                    }
                }

                setHeading();
            }
        }
    });
}());
var a = 3;