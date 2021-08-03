let el = el => document.querySelector(el);
let all = el => document.querySelectorAll(el);
let i = 0;
let arryimg = ['01.jpg', '02.jpg', '03.jpg', '04.jpg'];
let change = true;
let playChange;

console.log()
// //////////////////////////////// localStorage ///////////////////// start
// ----save color in localStorage ---
if (localStorage.getItem('main-color') !== null) {
  document.documentElement.style.setProperty('--light-1', localStorage.getItem('main-color'))

  // ---- save  Active Class on color button in localStorage ---
  for (elm of all('div.option span')) {
    elm.classList.remove('active')

    // if(elm.dataset.color === localStorage.getItem('main-color')){  سطر كود اخر
    if (getComputedStyle(elm).backgroundColor === localStorage.getItem('main-color')) {
      elm.classList.add('active');
    }
  }
};

// ----save play or stop background in localStorage ---
if (localStorage.getItem('changeBackground') !== null) {

  // ---- save Active Class on button  in localStorage ---
  for (one of all('div.random-img span')) one.classList.remove('active')


  if (localStorage.getItem('changeBackground') === 'true') {
    change = true;
    el('div.random-img span.yes').classList.add('active')
    el('div.random-img span.no').classList.remove('active')
  }
  else {
    change = false;
    el('div.random-img span.yes').classList.remove('active')
    el('div.random-img span.no').classList.add('active')

    // ---- save the Background in localStorage ---
    if (localStorage.getItem('imgIndx') !== null) {
      el('div.background h1').style.backgroundImage = `url(../images/${arryimg[localStorage.getItem('imgIndx')]})`;
    };
  }
  // console.log(change)

};


if (localStorage.getItem('showBullets') !== null) {

  if (localStorage.getItem('showBullets') === 'true') {
    el('div.show-bullets span.yes').classList.add('active')
    el('div.show-bullets span.no').classList.remove('active')
    el('div.bullets').style.display = 'flex';
  } else {
    el('div.show-bullets span.no').classList.add('active')
    el('div.show-bullets span.yes').classList.remove('active')
    el('div.bullets').style.display = 'none';
  }

};
// //////////////////// localStorage //////////////////////// End


// /////////////////////////////  menu (Nav bar) ///////////////////// start
el('.toggle-menu').addEventListener('click' , () => {

if (el('.toggle-menu').classList.contains('close')) {
  el('section nav').classList.add('open')
} else {
  el('section nav').classList.remove('open')
}

})

// /////////////////////////////  menu (Nav bar) ///////////////////// End

// /////////////////////////////  Setting Bar (Aside) ///////////////////// start

// ----------------------- open & close Setting ------------>
el('div.icon i').addEventListener('click', function () {
  el('aside').classList.toggle('open');
  this.classList.toggle('rotate');
  if (el('aside').classList.contains('open')) {
    el('div.layer').classList.add('blur');
  } else {
    el('div.layer').classList.remove('blur');
  }
});
el('div.layer').addEventListener('click', function () {
  this.classList.remove('blur');
  el('aside').classList.remove('open');
  el('div.icon i').classList.remove('rotate');
});

// ---- choose color  ------------------------------------->
all('div.option span').forEach((span) => {

  span.addEventListener('click', function () {

    // console.log(getComputedStyle(this).backgroundColor);

    document.documentElement.style.setProperty('--light-1', getComputedStyle(this).backgroundColor);

    localStorage.setItem('main-color', getComputedStyle(this).backgroundColor)

    // ---- add Active class -----------------
    for (one of all('div.option span')) {
      one.classList.remove('active');
    }
    this.classList.add('active')
  })

});


// ---- choose color  --------------- html  كود اخر ولكن يحتاج الى اضافت الوان لل عناصر فى 
// all('div.option span').forEach((span) => {

//   span.addEventListener('click', function(e) {

//     console.log(e.target.dataset.color);

//     document.documentElement.style.setProperty('--light-1', e.target.dataset.color);

//     localStorage.setItem('main-color', e.target.dataset.color);

//     // ---- add Active class -----------------
//     e.target.parentElement.querySelectorAll('.active').forEach((el) => {
//       el.classList.remove('active');
//     })
//     e.target.classList.add('active');
//   })

// });
// ---- choose (yes - no) Random Background  ---------------------->

// ---- add Active class -----------------
addClass('div.random-img span', 'active');

all('div.random-img span').forEach((el) => {

  el.addEventListener('click', function (e) {

    // ---- choose (yes - no)
    if (this.classList.contains('yes')) {
      change = true;
      changeImg()
      localStorage.setItem('changeBackground', true)
    } else {
      change = false;
      clearInterval(playChange)
      localStorage.setItem('changeBackground', false)
    }
  })
});
// ---------choose (yes - no) Show Bullets-------------------->


// ---- add Active class Show Bullets  ------------------
addClass('div.show-bullets span', 'active');

// ---- Save in localStorage & Show Bullets -------------
all('div.show-bullets span').forEach((span) => {

  span.addEventListener('click', (e) => {

    if (e.target.classList.contains('yes')) {
      el('div.bullets').style.display = 'flex';
      localStorage.setItem('showBullets', true)
    } else {
      el('div.bullets').style.display = 'none';
      localStorage.setItem('showBullets', false)
    }
  })
})


el(' aside .reset-options').addEventListener('click', () => {
  itemsLocalStorage = ['main-color', 'showBullets', 'changeBackground']
  // localStorage.clear();
  itemsLocalStorage.forEach(item => {
    console.log(item)
    localStorage.removeItem(item)
    localStorage.removeItem(item)
    localStorage.removeItem(item)
  })

  window.location.reload()
})

// ///////////////////////// Setting Bar (Aside) /////////////////////// End



// /////////////////////////  slider ///////////////////////////////// start

function next() {
  all('ul.slider li')[i].classList.remove('active');
  // console.log(i);
  i = (i + 1) % all('ul.slider li').length;

  all('ul.slider li')[i].classList.add('active');
  // console.log(i);
}

function previous() {
  all('ul.slider li')[i].classList.remove('active');
  i = (i - 1 + all('ul.slider li').length) % all('ul.slider li').length;
  all('ul.slider li')[i].classList.add('active');
}
// console.log(-1 + 4)
// --------------------------slider -------------------------------- End


// -------------------------- change Background --------------------- start
function changeImg() {
  if (change === true) {
    playChange = setInterval(() => {
      // random Number
      numImg = Math.floor(Math.random() * arryimg.length);
      // console.log(numImg)
      el('div.background h1').style.backgroundImage = `url(../images/${arryimg[numImg]})`
      next();
      localStorage.setItem('imgIndx', numImg)
    }, 3000)
  }
}
changeImg()
// //////////////////////////// change Background ////////////////////////// End



// /////////////////////////////// Skills progress  ////////////////////// Start

// ---------------------------------------- window scroll
window.addEventListener('scroll', () => {
  all('.skillsBox .progress').forEach((span) => {

    if ((span.offsetTop - window.innerHeight) <= window.scrollY) {

      // span.style.width = `${span.getAttribute('data-progress')}`;
      span.style.width = span.dataset.progress;
      span.textContent = span.dataset.progress;
    } else {
      span.style.width = `0`;
    }
  })
  if (window.scrollY >= parseInt(getComputedStyle(el('section nav')).height)) {
    el('section nav').classList.add('fixed')

  } else {
    el('section nav').classList.remove('fixed')
  }
})
// ////////////////////////// Skills progress  //////////////////////// End

console.log(parseInt(getComputedStyle(el('section nav')).height))


// /////////////////////////////// Gallery //////////////////////////// Start

all('section.gallery div.photos-box img').forEach((img) => {

  img.addEventListener('click', (e) => {
    el('div.pop-up-container').style.display = 'flex'
    el('div.pop-up-box img').src = img.src;
    el('div.pop-up-box img').classList.add('active')
    el('div.pop-up-box button.close').style.display = 'block'
    el('div.pop-up-box button.close').textContent = 'X'

    if (img.alt !== null) {
      el('div.pop-up-container h2').textContent = e.target.alt
    }

  })

})

el('div.pop-up-box button').onclick = function () {
  this.style.display = 'none'
  el('div.pop-up-container').style.display = 'none'
  el('div.pop-up-box img').src = '';
  el('div.pop-up-box img').classList.remove('active')
  el('div.pop-up-container h2').textContent = ''

}
// //////////////////////////// Gallery ////////////////////////////// End



// //////////////////////////// bullets ////////////////////////////// Start

all('div.bullets .bullet').forEach((blt) => {

  blt.addEventListener('click', (e) => {
    e.preventDefault()

    window.scrollTo({
      top: el(`section${e.target.dataset.section}`).offsetTop,
      left: 0,
      behavior: 'smooth'
    })
    // console.log(el(`section${e.target.dataset.section}`).offsetTop);

    addClass('.bullet', 'active')
  })

})
// ---------------------- Nav Bar
all('section.main nav ul li a').forEach(link => {

  link.addEventListener(`click`, ev => {
    ev.preventDefault();

    window.scrollTo({
      top: el(`section${ev.target.dataset.section}`).offsetTop ,
      left: '0',
      behavior: 'smooth'
    })
  })
})

// function moveToElm(allLinks , elmName , dataName ){  //--------------------------------------------Dynamic function----------------

//   document.querySelectorAll(allLinks).forEach((link) => {

//     link.addEventListener('click', (e) => {
//       e.preventDefault()

//       topElm = document.querySelector(`${elmName}${e.target.getAttribute(`data-`+`${dataName}`)}`);

//       window.scrollTo({
//         top: topElm.offsetTop,
//         left: 0,
//         behavior: 'smooth'
//       })

//       addActive( e , '.bullet' , 'active')
//     })
//   })
// }
// moveToElm('div.bullets .bullet' , 'section' , 'section')

// //////////////////////////////// bullets ///////////////////////////// End



// -------------------------- add & remove Class --------------------- Start

function addClass(links, clss) { //---------------------------------------------------------Dynamic function-------------
  links = document.querySelectorAll(links)
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      for (one of links) one.classList.remove(clss);
      event.target.classList.add(clss);
      this.classList.add(clss);
    })
  })
}
// -------------------------- add & remove Class --------------------- End












