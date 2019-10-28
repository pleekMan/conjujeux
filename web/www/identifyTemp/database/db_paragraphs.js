/*
0 - Verb and Non-verb phrase must be intercalated -> NonVerb - Verb - NonVerb - Verb -...
1 - this systems only works if a verb is not repeated throughout the sentences, otherwise, indexing is needing
2 - First word must not be a verb
3 - Las character must be a "."
*/
var paragraphs = [
   {
      paragraph: "La semaine dernière je suis allé au restaurant avec mes amis. Il avait beaucoup de monde mais j'étais contente de être avec mes amis. Nous avons regardé le menu et nous avons commandé une paëlla.",
      verbs: [
         {
            verb:"suis allé",
            temp: "passe compose"
         },
         {
            verb:"avait",
            temp: "imparfait"
         },
         {
            verb:"étais",
            temp: "imparfait"
         },
         {
            verb:"avons regardé",
            temp: "passe compose"
         },
         {
            verb:"avons commandé",
            temp: "passe compose"
         }
      ]
   },
   //------------
   {
      paragraph: " 2 --- La semaine dernière je suis allé au restaurant avec mes amis. Il avait beaucoup de monde mais j'étais contente de être avec mes amis. Nous avons regardé le menu et nous avons commandé une paëlla.",
      verbs: [
         {
            verb:"suis allé",
            temp: "passe compose"
         },
         {
            verb:"avait",
            temp: "imparfait"
         },
         {
            verb:"étais",
            temp: "imparfait"
         },
         {
            verb:"avons regardé",
            temp: "passe compose"
         },
         {
            verb:"avons commandé",
            temp: "passe compose"
         }
      ]
   },
]




