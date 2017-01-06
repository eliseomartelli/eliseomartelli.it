<?php
    header("Content-type: text/css; charset: UTF-8");
    $json_object = @file_get_contents( "https://api.instagram.com/v1/users/30820750/media/recent/?access_token=30820750.1677ed0.0af9f0c987944ff89753db1b2d1942c0&count=1");
    $indata = json_decode($json_object);
?>

body {
    margin: 0;
    padding: 0;
    background: #FAFAFA;
    text-align: center;
    font-family: 'Roboto', sans-serif;
}

.profile-pic {
    position: relative;
    margin-bottom: calc(-192px/2);
    width: 192px;
    height: 192px;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
}

.container {
    width: 800px;
    margin: 0 auto;
}

.card {
    margin-left: 16px;
    margin-right: 16px;
    background: #fff;
    border-radius: 4px;
    padding: 16px;
    padding-top: calc(192px - 64px);
    padding-bottom: 32px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
}

#main-container {
    position: relative;
    z-index: 3;
    margin-top: calc(-484px/2);
}

p {
    margin: 0;
    padding: 0;
    margin-top: 8px;
    font-size: 16px;
}
p#name {
    font-size: 24px;
    color: #212121;
}
p#job {
    color: #505050;
}
p#email {
    color: #0091EA;
}
p#social {
    margin-top: 32px;
    color: #0091EA;
}

header .hero {
    height: 484px;
    width: 100vw;
    background: linear-gradient(
      rgba(13, 59, 95, 0.8),
      rgba(13, 59, 95, 0.8)
    ),  url(<?php echo $indata->data[0]->images->standard_resolution->url; ?>);
    background-repeat: no-repeat;
    background-size: cover, cover;
    background-position: center;
}

@media screen and (max-width: 832px) {
    .container {
        width: 100%;
    }
    .profile-pic {
      width: 128px;
      height: 128px;
      margin-bottom: calc(-128px/2);
    }
    header .hero {
        height: 384px;
    }
    .merrychristmas {
      font-size: 3rem;
    }
    .card {
      padding-top: calc(128px - 64px);
    }
    #main-container {
      margin-top: calc(-384px/2);
    }
}

@media screen and (max-width: 256px) {
    .card {
      padding-top: calc(30vw - 15vw);
    }
    .profile-pic {
        width: 30vw;
        height: 30vw;
        margin-bottom: calc(-30vw/2);
    }

}

@media screen and (max-height: 512px) {
    .merrychristmas {
        font-size: 1.5rem;
    }
    header .hero {
        height: 300px;
    }
    #main-container {
      margin-top: calc(-300px/1.5);
    }
}

footer {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 12px;
    color: #666;
}
.fa {
    margin-left: 4px;
    margin-right: 4px;
}

.icon-a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
}

.icon-a:hover {
    color: #212121;
}

header {
  transform-style: preserve-3d;
}
