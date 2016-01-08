[33mcommit 9f09c264ec754be7c709633609f1ae960354df7d[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 17:37:07 2015 +0100

    redirect from server

[33mcommit 6b00783c23b0a9f1479e6c454def438b2b2b0fe1[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Sat Nov 28 17:16:28 2015 +0100

    Added printouts to make it easier to follow the execution on backend in the token model

[33mcommit a9cf418678abd36da161c12e431fb6faad20547b[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 15:50:15 2015 +0100

    now saves email in tokens table

[33mcommit 8af919e61b5944c5341ffd3c4eef61321ee9e876[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 15:36:19 2015 +0100

    added migration email to tokens

[33mcommit 79b24807192935a366b0cb27ed8ffeeb4f826c49[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 15:29:30 2015 +0100

    automated refresh_token from example

[33mcommit 030b7cafb8b8758106b620c8b6161599661a9d00[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 15:21:46 2015 +0100

    now saves token in databse also =)

[33mcommit 73b99b3789991723d7892e7ff1de34628ac04437[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 15:19:36 2015 +0100

    added migration for token

[33mcommit a6fb78ffcb50247a2f088567491a53cdd97f89c9[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 28 14:47:15 2015 +0100

    omnioauth added to be executed with google_api in backend

[33mcommit 188dbf17ce627e5b0258e0e5b4a6222a548fb7c5[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 19:33:10 2015 +0100

    new Gems, token is being sent to the server, still cant verify it with GOogle API Server side

[33mcommit 28de9ebc3dc3c04111c874ec24ef010a2eb1130c[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 18:54:24 2015 +0100

    now the servers takes the Id to check it with google

[33mcommit d2360f16999a5c664020b78a6f8964234b933d19[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 18:22:20 2015 +0100

    New service for auth

[33mcommit 7075f31af42df37e6aee8d38807e30249541ac19[m
Merge: b1a238d 6ddfe03
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 17:27:05 2015 +0100

    Merge branch 'development' into auth

[33mcommit 6ddfe03e2a1f603dfbb283af34459b2f2eb1ee40[m
Merge: a793fc6 ea9415f
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 17:26:45 2015 +0100

    Merge remote-tracking branch 'origin/development' into development

[33mcommit b1a238dedb6f36327acc22244485329115a79ed5[m
Merge: fb12b00 1155e99
Author: Teddy <tedwa306@student.liu.se>
Date:   Sat Nov 14 17:11:34 2015 +0100

    Merge remote-tracking branch 'origin/auth' into auth
    
    # Conflicts:
    #	public/js/controllers/LoginController.js

[33mcommit fb12b00b3cdb84cd09166f9cbec58575e1f68641[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Sat Nov 14 17:10:39 2015 +0100

    Added a if-statement in the .run function block in app.js reduce the need of isLogedIn eveluations.

[33mcommit 1155e999bbcf2373e07f52617acbdffffd968c64[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 17:07:41 2015 +0100

    top bar working as intended

[33mcommit ea9415ff394246833e2119848a6b81125a5b9380[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 17:06:58 2015 +0100

    Removed redundant code

[33mcommit 0f83c9ffc05c781995622449a83b7452401dcb37[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 16:58:32 2015 +0100

    Added column to projects table

[33mcommit 2abd8b311f365fc5aa96992847ca791b897137ff[m
Merge: 2c85f8f d75cf6d
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 16:37:50 2015 +0100

    fixed merge conflict

[33mcommit e40e135ab1f2a114df5022fd40e475068d5fcc1b[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 16:35:06 2015 +0100

    log in moved and started building on server side

[33mcommit 2c85f8f03d9bb4f2c3f938f229c7e3c4e6d7012a[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Sat Nov 14 15:36:37 2015 +0100

    Corrected typo

[33mcommit 1241d2d4a932c00e00418932c61bc5a938d6a36d[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 15:11:42 2015 +0100

    Added redirection to home page

[33mcommit c7b162b5b45a6a0bad83e1f375e50f109da1c641[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 15:02:22 2015 +0100

    Removed MainController

[33mcommit a793fc6c845ec408525990891bc6dccb022e447c[m
Merge: b8d6456 e093b17
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 14:39:22 2015 +0100

    Merge branch 'development' of gitlab.ida.liu.se:wilbe075/tddd272015_webproject into development

[33mcommit e093b171f57823043c2e0f320f97bd62b3ee94f9[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 14:20:05 2015 +0100

    Fixed issues in ReportController

[33mcommit 239d412c923eab617aa25bc2d57dd42a7466c861[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 14:15:20 2015 +0100

    Fixed issue in PeopleController

[33mcommit a9fc91960d7e1409ac26ac7022894420255e8595[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 14:11:38 2015 +0100

    Removed issues in ProjectController

[33mcommit 86512c6efb78673d64a12a4f5e7d876cd6271135[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 13:55:27 2015 +0100

    Removed active record migrations that are causing problems

[33mcommit b7d32fdca464237d74398e3b141a9268d13ca250[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Nov 14 13:44:21 2015 +0100

    Fixed issues on Home Page

[33mcommit b8d6456816ae7999dd436f7ca23baabc7b0ba46b[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sat Nov 14 11:08:36 2015 +0100

    daily auth problem still

[33mcommit 467fd3d3fe7e65b72f17deb0116238f354a909aa[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 20:52:59 2015 +0100

    data about suser saved in Seession

[33mcommit cbe95f2756fd4b2ccc8a152af2e1ad4bee3c1b0a[m
Merge: b3a249e a9e4d34
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 19:29:16 2015 +0100

    Merge branch 'issue13' into development
    
    Conflicts:
    	public/bower_components/angular-resource/.bower.json
    	public/bower_components/angular-resource/angular-resource.js
    	public/bower_components/angular-resource/angular-resource.min.js
    	public/bower_components/angular-resource/angular-resource.min.js.map
    	public/bower_components/angular-resource/bower.json
    	public/bower_components/angular-resource/package.json
    	public/index.html
    	public/js/app.js
    	public/js/controllers/MainController.js

[33mcommit b3a249ef9c7fd19d2341b48cb19eeb88da5e8e9d[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 19:12:41 2015 +0100

    modified bower.json

[33mcommit 13c5e27a169bdb7cea272afd2140440b5d2391a3[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 19:04:27 2015 +0100

    made it runnable :)

[33mcommit f8c5150ebcedd1b06abde234eb64cde591759aa8[m
Merge: 420588f 4a26c75
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 18:56:28 2015 +0100

    Merge branch 'master' into development
    
    Conflicts:
    	bower.json
    	public/bower_components/angular/.bower.json
    	public/index.html
    	public/js/app.js
    	public/js/controllers/ReportController.js
    	public/js/directive/d3.js
    	public/views/reports.html

[33mcommit 420588fdc51d22d4e6be2ea4362af8ac9d1c2392[m
Merge: 54dff8f b013f5f
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 13 18:38:30 2015 +0100

    Merge remote-tracking branch 'origin/issue13' into local_development
    
    Conflicts:
    	config/routes.rb
    	public/index.html
    	public/js/app.js
    	public/js/controllers/CalendarController.js
    	public/js/controllers/ReportController.js
    	public/js/directive/d3js.js
    	public/js/services/projects.js
    	public/views/reports.html

[33mcommit 54dff8fb6717a96de2caddcc78507e4ca62a29a9[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Wed Nov 11 20:41:41 2015 +0100

    cleaned in d3.js

[33mcommit 4a26c7545cb875a0bed7a90a6180bd8389e1b69a[m
Merge: f5f2743 c45f927
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 11:36:09 2015 +0100

    Merge branch 'issue26'
    
    # Conflicts:
    #	public/js/controllers/ReportController.js

[33mcommit c45f927ec2489d142e28a104ef96b9265cd45746[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 11:34:12 2015 +0100

    Implementering google/oauth2 libarary

[33mcommit f5f2743b410acb3d6235fb1b7e8db65fb55301ca[m
Merge: 283e63e d372ed7
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 10:57:25 2015 +0100

    Merge branch 'master' of gitlab.ida.liu.se:wilbe075/tddd272015_webproject

[33mcommit 283e63e4b36025a026486e569e0f73e6ed344bce[m
Merge: 67673b6 372bf52
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 10:52:23 2015 +0100

    Merge branch 'issue26'

[33mcommit a9e4d3493c2314b20ddc1995654ba3e4c901bc5d[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 10:50:05 2015 +0100

    Adding test user controller on serverside

[33mcommit d7853fd147e3061f122f7035e2f98c22900dc152[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Nov 10 10:46:36 2015 +0100

    Small fixes

[33mcommit 07c84aa0a3b09cdeece903b8fd46069c5bfe5539[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 20:37:57 2015 +0100

    minor changes

[33mcommit 1b3e284e2f10d125d9b3be3a6421fcbfa2fafbbb[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 16:38:45 2015 +0100

    works as supposed now

[33mcommit cabf56bc47fc7670449e095049059a802c129121[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 15:47:14 2015 +0100

    new logic so that the graph allways displays and hopefully does not follow to other views

[33mcommit d75cf6df1dd5983b0081868d248126539875cd98[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sun Nov 8 14:30:35 2015 +0100

    Removed some redundant code and changed glyphicons

[33mcommit 326437327233802a2184855a166a86ec51121a11[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 14:01:14 2015 +0100

    a

[33mcommit 4ff9db18a243d53d7da61a7f18150a66d3e20b0a[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sun Nov 8 14:00:14 2015 +0100

    Implemented add event function

[33mcommit 3cf7300a36fbc6db1382cdc131255f46a3474988[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 13:50:47 2015 +0100

    nothing agian

[33mcommit a6de12a287b09cf06e480c96f900f5eb06411a1d[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sun Nov 8 13:40:59 2015 +0100

    Implemented add button for events

[33mcommit 9d3874514324e01681053b0bd25694e13962dac4[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 13:40:47 2015 +0100

    nothing

[33mcommit 80d3b2e186a85a7b915071d03f51e4228205a4ef[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sun Nov 8 13:09:42 2015 +0100

    Added number of events field in form and reformatted output of events list

[33mcommit a6bcdff99dce1b851da912aec67053f1964927ad[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sun Nov 8 12:21:22 2015 +0100

    Changed list calendar events request so that fetching works

[33mcommit 1b97937dcc50135a0ae9216a08230fce63788e84[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 12:12:10 2015 +0100

    communication wokring again d3.js and reportcontroller

[33mcommit 19e029e8357586255b4bfb7855f434d1a339bb6e[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Sun Nov 8 10:24:04 2015 +0100

    l

[33mcommit 3f90255f33f786dc31307ab111d576ee059a57fc[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 6 16:37:16 2015 +0100

    slow progress on d3.js

[33mcommit b84a88514b556c6c0895408fd1e756b2089fe330[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 6 14:55:06 2015 +0100

    foo

[33mcommit 81c493714b2a8bca58cc34161b614b565d2a76d8[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 6 13:13:35 2015 +0100

     updated index file with new d3.js

[33mcommit 6ddfba06940ce9d28744c34efd19d0bb3684e03e[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 6 13:09:39 2015 +0100

    oo

[33mcommit 8169ed1b07fc96961127a9077c64ab6d2159a743[m
Author: raskl508 <raskl508@student.liu.se>
Date:   Fri Nov 6 11:21:35 2015 +0100

    new file d3.js

[33mcommit d372ed7268ce25462f5ad412bf5e5c49bce4ef3d[m
Merge: a4022b8 67673b6
Author: raskl508 <raskl508@student.liu.se>
Date:   Tue Nov 3 23:08:48 2015 +0100

    Merge branch 'master' of gitlab.ida.liu.se:wilbe075/tddd272015_webproject
    
    Conflicts:
    	config/routes.rb
    	public/index.html
    	public/js/app.js

[33mcommit 15dfb194c43a070e2ec7a3d77ab84fa7e9a51666[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Mon Nov 2 21:31:02 2015 +0100

    Added calendarfetch functionality from previous calandar module to import modal

[33mcommit 47c336428c66595cdc2bbe90567a205e691c1eae[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Mon Nov 2 21:29:38 2015 +0100

    Added angular ui-bootstrap in order to use datepicker

[33mcommit 538f89a88e6080c2d53a9c7aa575d64858f90682[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 31 18:08:44 2015 +0100

    Added display of burndown chart for specific project

[33mcommit d8aa63d135fe5bc46f60e5c884eeb7729db4af6c[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 31 14:24:43 2015 +0100

    Added links from projects page to individual projects

[33mcommit 4713b587d537f784e7bfd84a3efc74ddb72b075d[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 31 14:06:31 2015 +0100

    Changed buttons to glyphicons

[33mcommit 3dc7f7c253bbbafd0b395b7533362a351f4dc388[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Tue Oct 27 20:39:55 2015 +0100

    Implemented loadProject

[33mcommit 8de7fc5dec839ae5fd1bb32384210acd75517414[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Tue Oct 27 20:08:50 2015 +0100

    Added project controller

[33mcommit 44c002c8fda581a1bb8fb9cdebdd1c7fc3cfa67a[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Tue Oct 27 18:46:58 2015 +0100

    Added project state

[33mcommit bf2edf13bb6f48c3544637619e3404c9f64f9604[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 18:08:10 2015 +0200

    Implemented add functionality for project service

[33mcommit 3b51e4e78600661e56139e9b95f0f0e1f5b418bd[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 16:56:02 2015 +0200

    Added update project functionality for service

[33mcommit c69ed41e8eb09b154f4862d406342ce7ef66530c[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 16:41:27 2015 +0200

    Added delete project functionality for service

[33mcommit a089f676f0a0864e8bd391c09377f980f5a6c209[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 16:29:03 2015 +0200

    implemented load projects with service

[33mcommit d14a7854e9ecaccbac7ed0e0f9c92192fa2feba8[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 16:23:43 2015 +0200

    Added Project service

[33mcommit f5389942947eb5517b77f0ad41fb5a43abfa0d06[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 11:12:01 2015 +0200

    Remove ui-bootstrap and Event service

[33mcommit 6ab9f1f35f61328d9efbbe8fea52bc687a350f03[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 11:06:54 2015 +0200

    Added angular resource to project

[33mcommit 372bf520373d9950d629345b71979a522710c66f[m
Author: William Bengtsson <wilbe075@student.liu.se>
Date:   Sat Oct 10 10:32:20 2015 +0200

    Added d3 and angular with bower

[33mcommit b013f5f5672429eb059b84f2da338d078c094e0d[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Oct 6 20:12:41 2015 +0200

    Implementering google/oauth2 libarary

[33mcommit a48933ff8a563735f5f4372f5e6b701807f81de0[m
Author: Teddy <tedwa306@student.liu.se>
Date:   Tue Oct 6 17:34:22 2015 +0200

    Master and Services has been merged.
