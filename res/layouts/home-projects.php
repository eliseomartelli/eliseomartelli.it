<?php
$apps = json_decode(file_get_contents("https://cdn.rawgit.com/eliseomartelli/personal-site__data/master/apps.json"));
?>
<div class="full-width center-content section section-bis">
    <h2>Check out my projects</h2>
    <div class="grid">
        <?php foreach ($apps as $app): ?>
            <div class="card container">
                <h4><?php echo $app->name ?></h4>
                <img src=<?php echo $app->icon; ?> alt=""><br>
                <a href=<?php echo $app->url; ?>>
                    <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
            </div>
        <?php endforeach; ?>
    </div>
</div>
