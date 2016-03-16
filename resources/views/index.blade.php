<html ng-app="app">
<head>



    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/app.css">

    <!--[if lte IE 10]>
        <script type="text/javascript">document.location.href ='/unsupported-browser'</script>
    <![endif]-->

</head>
<body>

    <h1>Superfly's Angular & Laravel Seed</h1>

    <div ui-view="main"></div>

    <script src="js/vendor.js"></script>
    <script src="js/app.js"></script>

    {{--livereload--}}
    @if ( Config::get('app.debug') )

        <!--
            In Production Mode, the templates.js file will be concat with app.js
            In Debug Mode templates.js will be separated, to keep gulp jucy.
        -->
        <script src="../frontend/templates.js"></script>

        <script type="text/javascript">
            document.write('<script src="//{{ env('APP_HOST') }}:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
        </script>

    @endif

</body>
</html>