# Hot Towel NG Angular SPA Template #

----------
> Hot Towel: Because you don't want to go to the SPA without one!

Want to build a SPA but can't decide where to start? Use Hot Towel NG and in seconds you'll have a SPA and all the tools you need to build on it! 

![](http://www.johnpapa.net/wp-content/uploads/2013/09/HotTowel-NG-Preview.png)

Hot Towel NG creates a great starting point for building a Single Page Application (SPA) with ASP.NET. Out of the box you it provides a modular structure for your code, view navigation, data binding, rich data management and simple but elegant styling. Hot Towel NG provides everything you need to build a SPA, so you can focus on your app, not the plumbing.

> Learn more about building a SPA from [John Papa's videos, tutorials and Pluralsight courses](http://johnpapa.net/spa).

## Application Structure ##
Hot Towel NG SPA provides an App folder which contains the JavaScript and HTML files that define your application. 

Inside the App folder:

![](http://johnpapa.net/wp-content/images/HotTowelAppFolder.png)

The App folder contains a collection of modules. These modules encapsulate functionality and declare dependencies on other modules. The views folder contains the HTML for your application and the viewmodels folder contains the presentation logic for the views (a common MVVM pattern). The services folder is ideal for housing any common services that your application may need such as HTTP data retrieval or local storage interaction. It is common for multiple viewmodels to re-use code from the service modules.

## Installing via the NuGet Package ##
Hot Towel is a NuGet package that augments an existing empty ASP.NET project. Just install using NuGet and then run!

    Install-Package HotTowel-NG

## How Do I Build On Hot Towel? ##
Simply start adding code! 

1. Add your own server-side code, preferably Entity Framework and Web API (which really shines with Breeze.js)
2. Add views and controllers
3. Update the navigation routes in `config.routes.js`

## Resources ##

+ [SPA Resources](http://johnpapa.net/spa)
+ [Hot Towel on GitHub](https://github.com/johnpapa/HotTowel)

### Hot Towel NG SPA on NuGet ###
<img src="http://www.johnpapa.net/wp-content/images/towelicon.png" width="48" height="48" class="alignleft" />Hot Towel also comes as a <a href="http://nuget.org/packages/HotTowel/" target="_blank">NuGet package</a> that you can add to an ASP.NET MVC application. If you start from scratch, the template is the way to go. If you have an existing project, you can use the NuGet package (which lacks the start-up hooks that the template has).
