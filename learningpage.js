
    const lessons = [
      {img: 'images/img1.png', title: 'Left Hand Practice', text: 'These are the base position for your fingers. Learn to rest on A, S, D, F and space;', link: 'lesson1'},
      {img: 'images/img2.png', title: 'Right Hand Practice', text: 'These are the base position for your fingers. Learn to rest on J,K,L and space;', link: 'lesson2'},
      {img: 'images/img3.png', title: 'Both Hands Practice', text: 'Position for your fingers. ( A,S,D,F) (SPACE) (J,K,L,;).', link: 'lesson3'},
      {img: 'images/img4.png', title: 'G and H Keys', text: 'left index finger for G , H and right index finger for H , J .', link: 'lesson4'},
      {img: 'images/img5.png', title: 'Apostrophe Key', text: 'Right pinky finger for pressing the semicolon(;) and the apostrophe ', link: 'lesson5'},
      {img: 'images/img6.png', title: 'Shift Keys Practice', text: 'pinky fingers are pressing SHIFT KEYS ,right pinky fingers are pressing the colon (:), quotation mark(")', link: 'lesson6'},
      {img: 'images/img7.png', title: 'Left Hand Top Row', text: 'pinky finger:Q and A  <br> Ring finger:W and S <br>Middle finger:E and D  <br> Index Finger:R,T,F and G', link: 'lesson7'},
      {img: 'images/img8.png', title: 'Right Hand Top Row', text: 'Index Finger:Y and U <br> Middle Finger:I <br> Ring finger:O key <br> Pinky finger: P key.', link: 'lesson8'},
      {img: 'images/img9.png', title: 'Left Hand Bottom Row', text: 'Pinky Finger: Z key <br> Ring Finger: X key<br> Middle Finger: C key <br> Index Finger: V and B keys.', link: 'lesson9'},
      {img: 'images/img10.png', title: 'Right Hand Bottom Row', text: 'Index Finger:N and M keys  <br> Middle Finger: comma(,) and <br> Ring Finger:Period (.) and Question mark(?) key.', link: 'lesson10'},
      {img: 'images/img11.png', title: 'Numbers Row Left Hand', text: 'Pinky Finger:"1" key  <br> Ring Finger: "2" key <br> Middle Finger: "3"key  <br> Index Finger:"4" and "5" keys.', link: 'lesson11'},
      {img: 'images/img12.png', title: 'Number Row Right Hand', text: 'Index Finger:"6" and "7" keys <br> Middle Finger:"8" key <br>Ring finger:"9" key  <br> Pinky Finger:"0" key.', link: 'lesson12'},
      {img: 'images/img13.png', title: 'Numbers Row Symbols L', text: 'LH pinky finger:! <br>ring Finger:@  <br>Middle finger:#  <br> index finger:$ and %', link: 'lesson13'},
      {img: 'images/img13.png', title: 'Numbers Row Symbols R', text: 'RH Index finger:^ and &  <br> Middle finger:*  <br> Ring finger:(  <br> Pinky finger: )', link: 'lesson14'},
      {img: 'images/img14.png', title: 'Symbols in Letter Rows', text: 'RH Middle finger: <  <br> Ring finger: > <br> RH Pinky finger:/ ,[,],{.} keys.', link: 'lesson15'}
    ];

    const container = document.getElementById('lessons-container');
    lessons.forEach(({img, title, text, link}) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${img}" alt="${title}" width="100" height="100">
        <div class="card-content">
          <h3>${title}</h3>
          <p>${text}</p>
          <a class="lesson-btn" href="lessonpage.html?lesson=${link}">Lesson ${link.replace('lesson', '')}</a>
        </div>`;
      container.appendChild(card);
    });
