

const lessons= {
    lesson1: {
        easy: ["a s d f a s d f a s d f"],
        medium: ["s d s a f a s f" ,"s a s d f d d a a d s s f d"],
        hard: ["a s d f", "a s a d f f", "a s d f space", "s f d a s d f d f d"]
    },

    lesson2: {
  easy: ["j k l j k l j k l"],
  medium: [
    "k j l k j l", 
    "j l j k k l l j j k"
  ],
  hard: [
    "j k l space", 
    "j j k l space k k l j", 
    "k l j space l j k j l", 
    "j k space l j k space l"
  ]
},

lesson3: {
  easy: ["a s d f j k l ; a s d f j k l ; "],
  medium: [
    "a s j k d f l ;", 
    "a j s k d l f ; j k a s f d ; l", 
    "s a j k ; l d f space s f j l ;"
  ],
  hard: [
    "a s d f space j k l ; space d f j k a s ; l", 
    "s d j k l ; f space a s d j k ; l f a space", 
    "j l ; f s d a k space j f ; a l k d s space", 
    "a j s f ; k l space d s j a k f ; l d a"
  ]
},

lesson4: {
  easy: ["g h j g h j g h j"],
  medium: [
    "g j h g h j", 
    "g h h j h g j h g"
  ],
  hard: [
    "g h j g h j", 
    "g h j h j g h j g h", 
    "h g j h g j h g j", 
    "g j g j h h g j g h"
  ]
},

lesson5: {
  easy: ["; ' ; ' ; ' ; '"],
  medium: [
    "' ; ' ; ; '", 
    "; ; ' ' ; ' ;"
  ],
  hard: [
    "' ; ; ' ; ' ; ;", 
    "' ' ; ; ; ' ' ;", 
    "; ' ; ' ; ; ' ' ;", 
    "' ; ' ; ; ' ; ' ;"
  ]
},

lesson6: {
  easy: ["; ; ; ; ; ; ; ; ; ;"],
  medium: [
    "; ; : ; ; : ; ;",
    "; : ; : ; ; : ; ; :"
  ],
  hard: [
    ": ; : ; : ; : ; : ;",
    "; : ; : : ; : ; : ; :",
    ": : ; ; : ; : ; : : ;",
    "; : ; : ; : ; : ; :"
  ]
},
lesson7: {
  easy: ["a s d f g a s d f g a s d f g"],
  medium: [
    "q a w s e d r f t g", 
    "a s d f q w e r t g", 
    "q w e r a s d f t g"
  ],
  hard: [
    "q a w s e d r f t g", 
    "a q s w d e f r g t", 
    "q w e r t g f d s a", 
    "g f d s a q w e r t", 
    "t r e w q a s d f g"
  ]
},
lesson8: {
  easy: ["y u i o p y u i o p y u i o p"],
  medium: [
    "y u i y o p u i", 
    "p o i u y y u i o p"
  ],
  hard: [
    "y u i o p u i o p y", 
    "u y o i p y i u o y p", 
    "y y u u i i o o p p", 
    "p o i u y p o i y u"
  ]
},
lesson9: {
  easy: ["z x c v b z x c v b z x c v b"],
  medium: [
    "z x z c v b x c", 
    "z v x b c z x v b c", 
    "z x c v z x b c v"
  ],
  hard: [
    "z x c v b x z v c b", 
    "v c x z b c v x z b", 
    "b v c x z z x c v b", 
    "z x v b c v z x c b"
  ]
},
lesson10: {
  easy: ["n m , . n m , . n m , ."],
  medium: [
    "n m , . n , m .", 
    "m , . n n , m .", 
    "n n m m , , . ."
  ],
  hard: [
    "n m , . ? . , m n", 
    "m , n . ? n , . m", 
    "n m , . n m , . ?", 
    ", . ? n m , . ? n m"
  ]
},

lesson11: {
  easy: ["1 2 3 4 5 1 2 3 4 5"],
  medium: [
    "1 2 1 3 4 5", 
    "5 4 3 2 1 2 3 4 5"
  ],
hard: [
    "1 2 3 4 5 5 4 3 2 1", 
    "1 3 2 4 1 5 3 2 4 5", 
    "5 3 1 2 4 1 2 3 4 5", 
    "1 2 3 4 5 4 3 2 1 5"
  ]
},
lesson12: {
  easy: ["6 7 8 9 0 6 7 8 9 0"],
  medium: [
    "6 7 6 8 9 0", 
    "0 9 8 7 6 7 8 9 0"
  ],
  hard: [
    "6 7 8 9 0 0 9 8 7 6", 
    "6 8 7 9 6 0 8 7 9 0", 
    "0 8 6 7 9 6 7 8 9 0", 
    "6 7 8 9 0 9 8 7 6 0"
  ]
},
lesson13: {
  easy: ["! @ # $ % ! @ # $ %"],
  medium: [
    "! @ ! # $ %", 
    "% $ # @ ! @ # $"
  ],
  hard: [
    "! @ # $ % % $ # @ !", 
    "! # @ $ % # @ ! $ %", 
    "% ! $ # @ ! @ # $ %", 
    "! ! @ @ # # $ $ % %"
  ]
},
lesson14: {
  easy: ["^ & * ( ) ^ & * ( )"],
  medium: [
    "^ & ^ * ( )", 
    ") ( * & ^ & * ("
  ],
  hard: [
    "^ & * ( ) ) ( * & ^", 
    "* ^ & ( ) ^ * & ( )", 
    "^ * ) ( & * ^ ) & (", 
    "^ ^ & & * * ( ( ) )"
  ]
},
lesson15: {
  easy: ["< > / [ ] { } < > / [ ]"],
  medium: [
    "< > < / [ ]", 
    "{ } [ ] < > /", 
    "/ < > [ { } ]"
  ],
  hard: [
    "< > / [ ] { } } { ] [ / > <", 
    "{ [ < > ] } / / < > [ ]", 
    "/ { < } [ > ] < / [ ]", 
    "< < > > / / [ [ ] ] { { } }"
  ]
}

};

