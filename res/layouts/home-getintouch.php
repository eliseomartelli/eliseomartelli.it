<?php
$socials = json_decode(file_get_contents("https://cdn.rawgit.com/eliseomartelli/personal-site__data/master/social-links.json"));
?>
<div class="full-width center-content section">
    <h2>Get in touch</h2>
    <p style="font-weight: 300;">I love connecting with people :)</p>
    <div class="grid">
        <p id="social">
            <?php foreach ($socials as $social): ?>
                <a class="icon-a" href="<?php echo $social->url; ?>" target="_blank">
                    <i class="fa fa-2x fa-<?php echo $social->icon; ?>" aria-hidden="true"></i>
                </a>
            <?php endforeach; ?>
        </p>
        <p class="or">- or -</p>
        <p style="font-weight: 300;">email me:</p>
        <a class="icon-a email" href="mailto:me@eliseomartelli.it">me@eliseomartelli.it</a>
    </div>

</div>
