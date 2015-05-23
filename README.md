# The Best JavaScript Flash Cards You Have Ever Seen!

#### Algorithm IV's question manager app is designed to give you the power to easily organize, answer (in JavaScript), and review practice questions for learning computer science focused algorithms and data structures, improving programming skill-sets, and preparing for technical interviews.

<br />
<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-master-algorithms.jpg" alt="Master the Art of Algorithms" /></a>

<br />
## Getting Started
- Download [algorithmIV-app.min.js](https://github.com/imaginate/algorithmIV-question-manager/blob/master/src/algorithmIV-app.min.js) and [algorithmIV-app.css](https://github.com/imaginate/algorithmIV-question-manager/blob/master/src/algorithmIV-app.css)
- Create an HTML document with your settings for the app
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <link href="algorithmIV.css" rel="stylesheet" />
    </head>
    <body>
        <script src="algorithmIV-app.min.js"></script>
        <script>
            (function() {

                // Define your settings
                var settings = {};
                settings.config     = { ... };
                settings.sources    = { ... };
                settings.categories = { ... };
                settings.resources  = { ... };
                settings.questions  = [ ... ];

                // Init the app with your settings
                aIV.app(settings);
            })();
        </script>
    </body>
</html>
```

<br />
## Example
Visit this repo's [example section](https://github.com/imaginate/algorithmIV-question-manager/tree/master/example) for a detailed example of this app in-action.

<br />
##Contributing
See our [guideline to contributing](https://github.com/imaginate/algorithmIV-question-manager/blob/master/CONTRIBUTING.md).

<br />
##Contact Us
- [Open an issue](https://github.com/imaginate/algorithmIV-question-manager/issues) on this GitHub repository
- Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)

<br />
--
**Enjoy Mastering Your Algorithms,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
