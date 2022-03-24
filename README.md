# Clear, Simple, & Easy JavaScript Flash Cards

Algorithm IV's question manager app is designed to give you the power to
easily organize, answer (in JavaScript), and review practice questions for
learning computer science focused algorithms and data structures, improving
programming skill-sets, and preparing for technical interviews. It is
cross-browser compatible and does not require any server environment or even
the internet to accomplish its basic functionality.


## Getting Started

- Download [algorithmIV-app.min.js](https://github.com/imaginate/algorithmIV-question-manager/blob/master/src/algorithmIV-app.min.js)
  and [algorithmIV-app.css](https://github.com/imaginate/algorithmIV-question-manager/blob/master/src/algorithmIV-app.css)
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
- Load your HTML document in any browser
- Learn your algorithms & data structures


## The App's Settings


### Configuration

The configuration object, ``` settings.config ```, allows you to customize the
look, feel, and actions of the app with minimal effort. As of version 1.1.2 it
contains five sections you may set. Each section and its defaults follow:
- **[Search Settings](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/configuration.js#L18-37)**
  ~ Allows you to show or hide different search options available to the app.
- **[Search Defaults](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/configuration.js#L39-64)**
  ~ Allows you to chose the on-load value for each search option available to the app.
- **[Question Format](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/configuration.js#L66-95)**
  ~ Allows you to show or hide each of the question's sections.
- **[Prettify Format](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/configuration.js#L97-114)**
  ~ Allows you to format how your JavaScript solutions will be prettified.
- **[Show Links](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/configuration.js#L116-133)**
  ~ Allows you to show or hide the available shortcut links for the question's sections.

### Sources

The sources object, ``` settings.sources ```, is where you add each source for
your questions. If the object is undefined, null, or empty the source
functionality is disabled for the app. Visit the
[sources example](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/sources.js)
to learn more.

### Categories

The categories object, ``` settings.categories ```, is where you add each
category for your questions. If the object is undefined, null, or empty the
category functionality is disabled for the app. Visit the
[categories example](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/categories.js)
to learn more.

### Resources

The resources object, ``` settings.resources ```, is where you can load JSON
resources for use in any of your question's solutions. The
[getResource method](https://github.com/imaginate/algorithmIV-question-manager/blob/9c2262196421e/src/pre-compiled-parts/public-api.js#L26-35),
``` aIV.app.getResource ```, is used to access any uploaded resources from
within your question's solution. Visit the
[resources example](https://github.com/imaginate/algorithmIV-question-manager/blob/d0db504b896e/example/pre-compiled-settings/resources.js)
to learn more. **Note:** Using the resources functionality requires a server
environment due to its use of ajax calls.

### Questions

The questions array, ``` settings.questions ```, is where you add your
questions. Each question's id defined by its order in the array, and each
question is represented by an object with its details. Visit the
[questions example](https://github.com/imaginate/algorithmIV-question-manager/blob/421dfb8122e/example/pre-compiled-settings/questions.js)
to see all of the options available for each question and more.


## Other Important Information


### Example

Visit this repository's [example section](https://github.com/imaginate/algorithmIV-question-manager/tree/master/example)
for a detailed example of this app in-action.

### Contributing

See our [guideline for contributing](https://github.com/imaginate/algorithmIV-question-manager/blob/master/CONTRIBUTING.md)

### Contact Us

- [Open an issue](https://github.com/imaginate/algorithmIV-question-manager/issues)
  on this GitHub repository
- Send an email to [imagineadamsmith@gmail.com](mailto:imagineadamsmith@gmail.com)


----
**Enjoy Mastering Your Algorithms**
