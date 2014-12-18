<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <?php
  $meta = array(
    'title' => 'Allegations against Kyle police chief Jeff Barnett',
    'description' => 'Eight months after Jeff Barnett settled into his new job as Kyle\'s police chief, a lawsuit claimed he had his old department in Princeton settle unfinished personal business by arranging for them to arrest his girlfriend’s husband on domestic violence charges.',
    'thumbnail' => 'http://projects.statesman.com/news/kyle-chief-timeline/assets/share.png',
    'url' => 'http://projects.statesman.com/news/kyle-chief-timeline/',
    'twitter' => 'statesman'
  );
?>

  <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
  <link rel="icon" type="image/png" href="//projects.statesman.com/common/favicon.ico">

  <link rel="canonical" href="<?php print $meta['url']; ?>" />

  <meta name="description" content="<?php print $meta['description']; ?>">

  <meta property="og:title" content="<?php print $meta['title']; ?>"/>
  <meta property="og:description" content="<?php print $meta['description']; ?>"/>
  <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
  <meta property="og:url" content="<?php print $meta['url']; ?>"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
  <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
  <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
  <meta name="twitter:image" content="<?php print $meta['thumbnail']; ?>" />
  <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="dist/style.css">
  <link href='http://fonts.googleapis.com/css?family=Lusitana:400,700' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=Merriweather+Sans:400,300,300italic,400italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
</head>
<body>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
          <img width="273" height="26" src="assets/logo.png">
        </a>
      </div>
       <ul class="nav navbar-nav navbar-right social hidden-xs">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
          <li><a target="_blank" href="https://plus.google.com/share?url=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-google-plus"></i></a></li>
        </ul>
    </div>
  </nav>

  <div class="container">
    <header class="header">
      <h1>Timeline: Allegations against Kyle police chief Jeff Barnett</h1>
      <p class="author">Interactive by Andrew Chavez and Tony Plohetski, Austin American-Statesman</p>
      <p>Eight months after Jeff Barnett settled into his new job as Kyle's police chief, a lawsuit claimed he had his old department in Princeton settle unfinished personal business by arranging for them to arrest his girlfriend’s husband on domestic violence charges.</p>
      <p>Our timeline outlines the ensuing fallout and the nine years of events that now have the City of Kyle caught in the middle.</p>
    </header>

    <div role="main" class="clearfix">
      <div id="timeline"></div>
    </div>
  </div>

  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/handlebars/handlebars.runtime.js"></script>
  <script src="src/js/helpers.js"></script>
  <script src="bower_components/tabletop/src/tabletop.js"></script>
  <script src="bower_components/imagesloaded/imagesloaded.pkgd.js"></script>
  <script src="bower_components/moment/moment.js"></script>
  <script src="bower_components/underscore/underscore.js"></script>
  <script src="build/templates.js"></script>
  <script src="src/js/script.js"></script>
</body>
</html>
