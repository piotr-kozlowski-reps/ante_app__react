<!DOCTYPE html>
<html lang="pl" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ante</title>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css">
    <!-- Bootstrap -->
    <link th:href="@{/favicon.ico}" rel="shortcut icon" type="image/vnd.microsoft.icon" />
    <link th:href="@{/css/bootstrap.css}" rel="stylesheet">
    <link th:href="@{/css/bootstrap-custom.css}" rel="stylesheet">
    <link th:href="@{/css/cookiesEU.css}" rel="stylesheet">
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-9180660-1', 'auto');
        ga('send', 'pageview');

    </script>
</head>
<body data-spy="scroll" data-target="#myScrollspy" data-offset="125">

<nav class="navbar">
    <div class="container">
        <div class="row menu-top">
            <div class="col-xs-2">
                <div class="lang">
<!--                    <a th:href="@{/main(lang='EN',type=${type})}" th:if="${lang} == 'PL'">EN</a>-->
<!--                    <a th:href="@{/main(lang='PL',type=${type})}" th:if="${lang} == 'EN'">PL</a>-->
                </div>
            </div>
            <div class="col-xs-10">
                <ul class="nav top-nav">
                    <li><a th:href="@{/main(lang='PL',type='0')}">BACK TO PORTFOLIO</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="logo-top text-center" style="padding-bottom: 130px">
                <img th:src="@{/images/ante-logo.png}" alt="Ante logo">
            </div>
        </div>
    </div>

    <div id="the-sticky-div" class="container">
        <!-- Brand and toggle get grouped for better mobile display -->


        <div class="row">
            <div class="col-lg-12">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                </div>
                <h2>PROJECTS LIST</h2>

            </div>

        </div>
        <div class="row menu">
            <div class="col-lg-12">
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="defaultNavbar1">
                    <ul class="nav navbar-nav">
                        <li class="active cat"><a th:href="@{/admin(type=0)}">ALL<span class="sr-only">(current)</span></a></li>
                        <li class="cat"><a th:href="@{/admin(type=1)}">Competitions</a></li>
                        <li class="cat"><a th:href="@{/admin(type=2)}">Interiors</a></li>
                        <li class="cat"><a th:href="@{/admin(type=3)}">Exteriors</a></li>
                        <li class="cat"><a th:href="@{/admin(type=4)}">Animacje</a></li>
                        <li class="cat"><a th:href="@{/admin(type=5)}">Products Modeling</a></li>
                        <li class="cat"><a th:href="@{/admin(type=6)}">360° Panoramas</a></li>
                        <li class="cat"><a th:href="@{/admin(type=7)}">AR apps</a></li>
                    </ul>
                </div>
            </div>
            <!-- /.navbar-collapse -->
        </div>



    </div>
    <!-- /.container-fluid -->
</nav>


<div id="portfolio" class="container">
    <div class="row" id="parent">


        <div class="row create-project-button">
            <div class="raw box-outer col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxxs-12" style="margin-bottom: 12px"></div>

            <div class="lang" >
                <a th:href="@{/admin/create}" class="btn-portfolio">CREATE NEW PROJECT</a>
            </div>
        </div>



        <!--/*@thymesVar id="projects" type="java.util.List<pl.ante.portfolioanteapp.model.projection.ProjectSimpleInfoReadModel>"*/-->
        <div class="row">
                <ol>

                    <!-- li - every project list - START-->
                    <li  th:each="project : ${projects}">
                        <div class="project-text">
                            <h3 th:text="${project.getName()}">Project Name</h3>
                            <p th:text="|id: ${project.getId()}&nbsp;&nbsp;&nbsp;&nbsp;${project.getYear()}-${project.getMonth()}&nbsp;&nbsp;&nbsp;${project.getCity()} &#91;${project.getCountry()}&#93;|">project info</p>
                        </div>

                        <div class="lang buttons-edit-delete">
                            <a href="#" th:href="@{/admin/edit/__${project.getId()}__}" class="btn-portfolio">EDIT</a>
                            <a href="#"  th:href="@{/admin/delete/__${project.getId()}__}" class="btn-portfolio btn-delete">DELETE</a>
                        </div>
                    </li>
                    <!-- li - every project list - END-->

                </ol>
        </div>

    </div><!--end row-->
</div><!--end container-->



<div class="footer" id="kontakt">
    <div class="container">
        <div class="row">

            <!--PL-->
            <div class="text-center col-lg-12">
                <div class="logo-bottom text-center">
                    <img th:src="@{/images/ante-logo.png}" alt="Ante logo">
                </div>
                <p>&copy; <strong>firma Ante Piotr Kozłowski</strong>,  ul. Hagera 41, 41-800 Zabrze<br>
                    tel: <strong>691 235 259</strong>   /   e-mail: <script type="text/javascript">user = 'info';site = 'ante.pl';document.write('<strong>' + user + '@' + site + '</strong>');</script>
                </p>
            </div>
            <!--PL end-->

        </div>
    </div>
</div>
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script th:src="@{/js/jquery.mobile.custom.min.js}"></script>
<script th:src="@{/js/bootstrap.js}"></script>

<script type="text/javascript"th:src="@{/js/jquery.interactive_bg.js}"></script>
<script type="text/javascript">
    $(".bg").interactive_bg();
</script>

<!--cookies info start-->
<script type="text/javascript" src="http://ciasteczka.eu/cookiesEU-latest.min.js"></script>

<script type="text/javascript">
    jQuery(document).ready(function(){
        jQuery.fn.cookiesEU({
            text: 'Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do Twoich potrzeb. Każdy może zaakceptować pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne informacje. <a href="../static/polityka-prywatnosci.html">Dowiedz się więcej na temat naszej polityki prywatności oraz sposobu wyłączenia plików cookies.</a>',
            close: 'x',
            test: false,
            box_class: 'cookies-info-box-bottom',
            animation: 'fade',
            time: '500',
            auto_accept: false
        });
    });
</script>
<!--cookies info end-->

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script>
    var $btns = $('.cat').click(function() {
        if (this.id == 'all') {
            $('#parent > div').removeClass('gray');
        } else {
            var $el = $('.' + this.id).removeClass('gray');
            $('#parent > div').not($el).addClass('gray');
        }
        $btns.removeClass('active');
        $(this).addClass('active');
    })
</script>
<script>
    jQuery('.carousel').carousel({
        interval: 6000
    })
</script>
<script>
    // ------------------------------
    // http://twitter.com/mattsince87
    // ------------------------------

    function scrollNav() {
        $('.nav li a').click(function(){
            //Animate
            $('html, body').stop().animate({
                scrollTop: $( $(this).attr('href') ).offset().top
            }, 1000);
            return true; //bylo false
        });
        $('.scrollTop a').scrollTop();
    }
    scrollNav();
</script>
<script>
    var $window = $(window),
        $stickyEl = $('#the-sticky-div'),
        elTop = $stickyEl.offset().top;

    $window.scroll(function() {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });
</script>

</body>
</html>