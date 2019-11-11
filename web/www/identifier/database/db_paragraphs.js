/*
0 - Verb and Non-verb phrase must be intercalated -> NonVerb - Verb - NonVerb - Verb -...
1 - this systems only works if a verb is not repeated throughout the sentences, otherwise, indexing is needing
2 - First word must not be a verb
3 - Last character must be a "."
*/
var paragraphs = [
   {
      paragraph: "La semaine dernière je suis allé au restaurant avec mes amis. Il y avait beaucoup de monde mais j'étais contente d'être avec mes amis. Nous avons regardé le menu et nous avons commandé une paëlla.",
      verbs: [
         {
            verb: "suis allé",
            temp: "passe compose"
         },
         {
            verb: "avait",
            temp: "imparfait"
         },
         {
            verb: "étais",
            temp: "imparfait"
         },
         {
            verb: "avons regardé",
            temp: "passe compose"
         },
         {
            verb: "avons commandé",
            temp: "passe compose"
         }
      ]
   },
   //------------
   {
      paragraph: "Quand j’étais lycéen, je voulais être politicien. J’étudiais tous les jours parce que je devais, pour cela, être accepté dans une grande école. Je lisais les journaux régulièrement, et, un soir, quand j’ai parlé de l’actualité pendant un dîner, j’ai impressionné tout le monde.",
      verbs: [
         {
            verb: "étais",
            temp: "imparfait"
         },
         {
            verb: "voulais",
            temp: "imparfait"
         },
         {
            verb: "étudiais",
            temp: "imparfait"
         },
         {
            verb: "devais",
            temp: "imparfait"
         },
         {
            verb: "être accepté",
            temp: "present"
         },
         {
            verb: "lisais",
            temp: "imparfait"
         },
         {
            verb: "ai parlé",
            temp: "passe compose"
         },
         {
            verb: "ai impressionné",
            temp: "passe compose"
         },
      ]
   },
   //------------
   {
      paragraph: "Je pense que je vais aller a la Bibliothèque. Là, je verrai s'il y a de la place.",
      verbs: [
         {
            verb: "pense",
            temp: "present"
         },
         {
            verb: "vais aller",
            temp: "futur proche"
         },
         {
            verb: "verrai",
            temp: "futur simple"
         },
      ]
   },
   //------------
   {
      paragraph: "La nourriture était bonne et il y avait une bonne odeur de chorizo. Nous avons mangé, discuté et puis nous sommes rentrés vers 23h parce que nous étions fatigués.",
      verbs: [
         {
            verb: "était",
            temp: "imparfait"
         },
         {
            verb: "avait",
            temp: "imparfait"
         },
         {
            verb: "avons mangé",
            temp: "passe compose"
         },
         {
            verb: "discuté",
            temp: "passe compose"
         },
         {
            verb: "sommes rentré",
            temp: "passe compose"
         },
         {
            verb: "étions",
            temp: "imparfait"
         },
      ]
   },
   //------------
   {
      paragraph: "Nous venons de déménager. Nous sommes très contents de notre nouvel appartement. C'est beaucoup plus lumineux et spacieux que notre première maison, qui était trop sombre! Vous devez venir le visiter. On va organiser la pendaison de crémaillère le 5 juillet et on espère tous vous voir !",
      verbs: [
         {
            verb: "venons",
            temp: "present"
         },
         {
            verb: "sommes",
            temp: "present"
         },
         {
            verb: "est",
            temp: "present"
         },
         {
            verb: "était",
            temp: "imparfait"
         },
         {
            verb: "devez",
            temp: "present"
         },
         {
            verb: "va organiser",
            temp: "passe compose"
         },
      ]
   },
   //------------
   {
      paragraph: "Samedi prochain, la place Masséna sera en fête à l’occasion de la journée de clôture de la 23e opération Pièces jaunes. L’an dernier, 1.2 tonne de pièces ont été récoltées à Nice. Cette action, qui contribue à améliorer la qualité de vie des enfants et des adolescents hospitalisés, est parrainée par l’ex-footballeur Christian Karembeu et par la chanteuse Lorie. Tous deux seront présents samedi, aux côtés de la présidente de la fondation. Maurice Alberti, ambassadeur de l’opération, fait le point pour Direct Matin édition Côte d’Azur sur cette action de solidarité.",
      verbs: [
         {
            verb: "sera",
            temp: "futur simple"
         },
         {
            verb: "ont été",
            temp: "passe compose"
         },
         {
            verb: "contribue",
            temp: "present"
         },
         {
            verb: "est parrainé",
            temp: "present"
         },
         {
            verb: "seront",
            temp: "futur simple"
         },
         {
            verb: "fait",
            temp: "present"
         },
      ]
   },
      //------------
      {
         paragraph: "Jeanne se demande ce qu’elle va faire maintenant qu’elle est rentrée à la maison. Elle cherche une occupation pour son esprit, et un travail pour ses mains. Elle s’aperçoit qu’elle n’a plus rien à faire, qu’elle n’aura plus jamais rien à faire.",
         verbs: [
            {
               verb: "se demande",
               temp: "present"
            },
            {
               verb: "va faire",
               temp: "futur proche"
            },
            {
               verb: "est rentrée",
               temp: "passe compose"
            },
            {
               verb: "cherche",
               temp: "present"
            },
            {
               verb: "s’aperçoit",
               temp: "present"
            },
            {
               verb: "n’a plus",
               temp: "present"
            },
            {
               verb: "n’aura plus",
               temp: "futur simple"
            },
         ]
      },
           //------------
           {
            paragraph: "Je me sentais malade l’autre nuit, alors je suis allée chercher Julien dans sa chambre. Rosalie était couchée avec lui. Je ne savais plus ce que je faisais et je me suis sauvée dans la neige pour me jeter du haut de la falaise.",
            verbs: [
               {
                  verb: "me sentais",
                  temp: "imparfait"
               },
               {
                  verb: "suis allée",
                  temp: "passe compose"
               },
               {
                  verb: "était",
                  temp: "imparfait"
               },
               {
                  verb: "ne savais plus",
                  temp: "imparfait"
               },
               {
                  verb: "faisais",
                  temp: "imparfait"
               },
               {
                  verb: "me suis sauvée",
                  temp: "passe compose"
               },
            ]
         },
]




