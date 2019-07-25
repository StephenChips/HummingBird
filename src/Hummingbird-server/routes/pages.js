var express = require('express');
var router = express.Router();

router.get(['/', '/home'], function (request, response) {
  response.render('home', {
    title: request.params['sectionId'],
    header: {
      sectionsInNavBar: [
        {
          title: 'Home',
          href: '/sections/home/articles'
        },
        {
          title: 'News',
          href: '/sections/news/articles'
        }
      ],
      sectionsInDropdownMenu: [
        {
          title: 'Extra',
          href: '/sections/extra/articles'
        },
        {
          title: 'Foo',
          href: '/sections/foo/articles'
        },
        {
          title: 'Bar',
          href: '/sections/bar/articles'
        }
      ],
      currentActiveSection: {
        title: request.params['sectionId'],
        href: '/sections/' + request.params['sectionId'] + '/articles'
      }
    },
    articleInfoList: [
      {
        category: { href: '/sections/example/articles/?categoryId=As-Far-As-You-Can', title: 'As far As You Can' },
        href: '/articles/As_Far_as_You_Can_(1)',
        title: 'As Far as You Can (1)',
        publishDate: '2018/4/4'
      },
      {
        category: { href: '/sections/example/articles/?categoryId=As-Far-As-You-Can', title: 'As far As You Can' },
        href: '/articles/As_Far_as_You_Can_(2)',
        title: 'As Far as You Can (2)',
        publishDate: '2018/9/4'
      },
      {
        category: { href: '/sections/example/articles/?categoryId=As-Far-As-You-Can', title: 'As far As You Can' },
        href: '/articles/As_Far_as_You_Can_(3)',
        title: 'As Far as You Can (3)',
        publishDate: '2018/9/23'
      },
      {
        categroy: null,
        href: '/articles/Nothing_and_Anything',
        title: 'Nothing and Anything',
        publishDate: '2018/10/1'
      }
    ],
    paginator: {
      items: [
        { pageNumber: 1, href: `/sections/${request.params['sectionId']}/articles/?start=0&end=15`, active: true  },
        { pageNumber: 2, href: `/sections/${request.params['sectionId']}/articles/?start=15&end=30`  },
        { pageNumber: 3, href: `/sections/${request.params['sectionId']}/articles/?start=30&end=45`  },
        { pageNumber: 4, href: `/sections/${request.params['sectionId']}/articles/?start=45&end=60`  },
        { pageNumber: 5, href: `/sections/${request.params['sectionId']}/articles/?start=60&end=75`  }
      ],
      previousHref: null,
      nextHref: `/section/${request.params['sectionId']}/?start=15&end=30`,

      previousSizeClass: 'paginator-lg'
    },

  });
});

router.get('/sections/about', function (request, response) {
  response.render('about', {
    title: 'About',

    header: {
      sectionsInNavBar: [
        {
          title: 'Home',
          href: '/sections/home/articles'
        },
        {
          title: 'News',
          href: '/sections/news/articles'
        }
      ],
      sectionsInDropdownMenu: [
        {
          title: 'Extra',
          href: '/sections/extra/articles'
        },
        {
          title: 'Foo',
          href: '/sections/foo/articles'
        },
        {
          title: 'Bar',
          href: '/sections/bar/articles'
        }
      ],
      currentActiveSection: {
        title: 'about',
        href: '/sections/about'
      }
    },

    content: `<h1>Helleo</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus nisi, gravida a turpis in, hendrerit sodales orci. Suspendisse non lorem nec ipsum porta efficitur. Cras tristique pellentesque condimentum. Integer venenatis, risus id pulvinar bibendum, nibh risus suscipit nibh, sed ornare nibh tortor a nisi. Suspendisse eleifend porttitor dolor, ut suscipit velit pretium nec. Donec quis leo diam. Donec nibh velit, malesuada quis rutrum rhoncus, semper quis quam.
    Donec est eros, convallis ut sem ac, imperdiet lacinia urna. Aenean ut massa sed risus fermentum semper at interdum turpis. Suspendisse porttitor ultricies massa, vitae ullamcorper eros pellentesque eget. Phasellus dictum suscipit eros, at fringilla ligula imperdiet at. Duis quis sagittis ante, non semper sem. Ut venenatis dictum odio. Fusce quis lorem semper, tempor lectus a, iaculis ex. Aliquam porttitor euismod ex, vitae volutpat magna sodales sit amet. In nec purus eget nulla pharetra scelerisque at ut eros.
    Curabitur malesuada diam mi, placerat consequat arcu tincidunt ac. Ut elementum pretium eros, eu aliquet erat accumsan quis. Praesent tempor urna vitae quam facilisis, non pellentesque arcu imperdiet. Nunc pharetra iaculis eros, eget suscipit elit posuere sed. Aenean interdum massa tristique, dapibus dolor eget, euismod tortor. In rutrum dignissim aliquet. Suspendisse cursus posuere enim, sed semper metus egestas vel. In commodo, leo ac mattis accumsan, sapien tellus cursus dui, ac vestibulum augue libero a purus. Vestibulum ac est tincidunt, bibendum libero et, auctor turpis. Sed non dictum orci, sed faucibus lorem. In ut lobortis purus. Aenean dignissim mi urna, ut aliquam metus luctus eu. Ut venenatis maximus aliquam. Curabitur tempus non augue sit amet consectetur. Vestibulum consectetur eros sit amet diam gravida, quis vulputate nulla mattis. Mauris eu dolor id sapien efficitur accumsan sed et nisi.
    In vulputate egestas ante sit amet luctus. Duis semper sollicitudin laoreet. Etiam at ipsum a eros ultricies mollis et sit amet ipsum. Aliquam condimentum nunc in ullamcorper tempus. Sed a convallis metus, ut laoreet urna. Aliquam cursus tortor at sapien rutrum malesuada. Sed in feugiat justo, a sodales diam. Quisque convallis erat metus, egestas vestibulum diam rutrum sit amet. In pharetra, neque eget fringilla pulvinar, elit felis fringilla sapien, eu dictum ligula tellus at magna. Sed nec quam ornare, imperdiet massa et, posuere erat.
    Suspendisse sodales, sem ac hendrerit scelerisque, metus lacus gravida odio, in euismod dui nibh eu lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam lectus risus, elementum in quam eget, vehicula venenatis felis. Quisque at mauris maximus orci ullamcorper consequat. Vivamus egestas orci id nunc condimentum ornare. Pellentesque pulvinar, erat at bibendum vulputate, neque nibh consequat erat, sed porttitor risus ipsum non turpis. Quisque ultrices rhoncus lectus vel bibendum. Donec quis ultrices sem, in dapibus quam. Nulla facilisi. Aliquam volutpat, elit ut blandit ultrices, ipsum ligula feugiat enim, in semper felis tellus feugiat sapien.</p>`
  });
});

router.get('/sections/:sectionId/articles', function (request, response) {
  if (request.query['categoryId']) {
    response.render('article-category',  {
      title: request.params['sectionId'],
      categoryName: request.query['categoryId'],
      header: {
        sectionsInNavBar: [
          {
            title: 'Home',
            href: '/sections/home/articles'
          },
          {
            title: 'News',
            href: '/sections/news/articles'
          }
        ],
        sectionsInDropdownMenu: [
          {
            title: 'Extra',
            href: '/sections/extra/articles'
          },
          {
            title: 'Foo',
            href: '/sections/foo/articles'
          },
          {
            title: 'Bar',
            href: '/sections/bar/articles'
          }
        ],
        currentActiveSection: {
          title: request.params['sectionId'],
          href: '/sections/' + request.params['sectionId'] + '/articles'
        }
      },
      articleInfoList: [
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(1)',
          title: 'As Far as You Can (1)',
          publishDate: '2018/4/4'
        },
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(2)',
          title: 'As Far as You Can (2)',
          publishDate: '2018/9/4'
        },
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(3)',
          title: 'As Far as You Can (3)',
          publishDate: '2018/9/23'
        },
        {
          href: '/articles/Nothing_and_Anything',
          title: 'Nothing and Anything',
          publishDate: '2018/10/1'
        }
      ],
      paginator: {
        items: [
          { pageNumber: 1, href: `/sections/${request.params['sectionId']}/articles/?start=0&end=15`, active: true  },
          { pageNumber: 2, href: `/sections/${request.params['sectionId']}/articles/?start=15&end=30`  },
          { pageNumber: 3, href: `/sections/${request.params['sectionId']}/articles/?start=30&end=45`  },
          { pageNumber: 4, href: `/sections/${request.params['sectionId']}/articles/?start=45&end=60`  },
          { pageNumber: 5, href: `/sections/${request.params['sectionId']}/articles/?start=60&end=75`  }
        ],
        previousHref: null,
        nextHref: `/section/${request.params['sectionId']}/?start=15&end=30`,
  
        previousSizeClass: 'paginator-lg'
      }
    });
  } else {
    response.render('sections', {
      title: request.params['sectionId'],
      header: {
        sectionsInNavBar: [
          {
            title: 'Home',
            href: '/sections/home/articles'
          },
          {
            title: 'News',
            href: '/sections/news/articles'
          }
        ],
        sectionsInDropdownMenu: [
          {
            title: 'Extra',
            href: '/sections/extra/articles'
          },
          {
            title: 'Foo',
            href: '/sections/foo/articles'
          },
          {
            title: 'Bar',
            href: '/sections/bar/articles'
          }
        ],
        currentActiveSection: {
          title: request.params['sectionId'],
          href: '/sections/' + request.params['sectionId'] + '/articles'
        }
      },
      contentHeader: {
        showArticle: true,
        showCategory: false,
        articleListPageUrl: `/sections/${request.params['sectionId']}/articles`,
        categoryListPageUrl: `/sections/${request.params['sectionId']}/categories`
      },
      articleInfoList: [
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(1)',
          title: 'As Far as You Can (1)',
          publishDate: '2018/4/4'
        },
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(2)',
          title: 'As Far as You Can (2)',
          publishDate: '2018/9/4'
        },
        {
          category: { href: '/category/As-Far-As-You-Can', title: 'As far As You Can' },
          href: '/articles/As_Far_as_You_Can_(3)',
          title: 'As Far as You Can (3)',
          publishDate: '2018/9/23'
        },
        {
          href: '/articles/Nothing_and_Anything',
          title: 'Nothing and Anything',
          publishDate: '2018/10/1'
        }
      ],
      paginator: {
        items: [
          { pageNumber: 1, href: `/sections/${request.params['sectionId']}/articles/?start=0&end=15`, active: true  },
          { pageNumber: 2, href: `/sections/${request.params['sectionId']}/articles/?start=15&end=30`  },
          { pageNumber: 3, href: `/sections/${request.params['sectionId']}/articles/?start=30&end=45`  },
          { pageNumber: 4, href: `/sections/${request.params['sectionId']}/articles/?start=45&end=60`  },
          { pageNumber: 5, href: `/sections/${request.params['sectionId']}/articles/?start=60&end=75`  }
        ],
        previousHref: null,
        nextHref: `/section/${request.params['sectionId']}/?start=15&end=30`,
  
        previousSizeClass: 'paginator-lg'
      }
    });
  }
});

router.get('/sections/:sectionId/categories', function (request, response) {
  response.render('categories', {
    title: request.params['sectionId'],
    header: {
      sectionsInNavBar: [
        {
          title: 'Home',
          href: '/sections/home/articles'
        },
        {
          title: 'News',
          href: '/sections/news/articles'
        }
      ],
      sectionsInDropdownMenu: [
        {
          title: 'Extra',
          href: '/sections/extra/articles'
        },
        {
          title: 'Foo',
          href: '/sections/foo/articles'
        },
        {
          title: 'Bar',
          href: '/sections/bar/articles'
        }
      ],
      currentActiveSection: {
        title: request.params['sectionId'],
        href: '/sections/' + request.params['sectionId'] + '/articles'
      }
    },
    contentHeader: {
      showArticle: false,
      showCategory: true,
      articleListPageUrl: `/sections/${request.params['sectionId']}/articles`,
      categoryListPageUrl: `/sections/${request.params['sectionId']}/categories`
    },
    categoryInfoList: [
      { href: `/sections/${request.params['sectionId']}/articles/?categoryId=As-Far-As-You-Can`, title: 'As far As You Can' },
      { href: `/sections/${request.params['sectionId']}/articles/?categoryId=As-Far-As-I-Can`, title: 'As far As I Can' },
      { href: `/sections/${request.params['sectionId']}/articles/?categoryId=As-Far-As-He-Can`, title: 'As far As He Can' },
      { href: `/sections/${request.params['sectionId']}/articles/?categoryId=As-Far-As-She-Can`, title: 'As far As She Can' },
      { href: `/sections/${request.params['sectionId']}/articles/?categoryId=As-Far-As-It-Can`, title: 'As far As It Can' },
    ],
    paginator: {
      items: [
        { pageNumber: 1, href: `/sections/${request.params['sectionId']}/articles/?start=0&end=15`, active: true },
        { pageNumber: 2, href: `/sections/${request.params['sectionId']}/articles/?start=15&end=30` },
        { pageNumber: 3, href: `/sections/${request.params['sectionId']}/articles/?start=30&end=45` },
        { pageNumber: 4, href: `/sections/${request.params['sectionId']}/articles/?start=45&end=60` },
        { pageNumber: 5, href: `/sections/${request.params['sectionId']}/articles/?start=60&end=75` }
      ],
      previousHref: null,
      nextHref: `/section/${request.params['sectionId']}/?start=15&end=30`,
      previousSizeClass: 'paginator-lg'
    },
  });
});

router.get('/articles/:articleId', function (request, response) {
  response.render('article', {
    category: { href: '/sections/example/articles/?categoryId=example-category', title: 'Example Category' },
    title: 'Sometimes you want to use the collapse plugin to trigger hidden',
    publishDate: '2018/4/9',
    content: `
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel massa ac orci vulputate viverra. Aliquam semper euismod mi id pharetra. Integer tempus ullamcorper pharetra. Sed et odio in nulla porttitor malesuada ut in eros. Donec convallis eget ipsum in hendrerit. Pellentesque dictum pellentesque nisl ac pellentesque. Phasellus feugiat in diam ac porta. Quisque lectus ligula, commodo ac hendrerit vel, gravida sed erat. Nulla faucibus, enim et blandit fermentum, nulla arcu ultrices metus, a auctor augue libero suscipit ligula. Duis neque augue, malesuada non sodales ac, luctus a dolor.
  </p>
  <p>
  Sed eget lorem hendrerit, hendrerit ligula ac, porta ante. Donec in convallis augue, quis malesuada nisi. Sed sollicitudin porttitor semper. Etiam sed mollis nulla. In ornare augue vel tellus sagittis laoreet. Maecenas vulputate elit id ligula scelerisque varius. Nullam vel ante consequat, pellentesque justo vitae, posuere sem. In volutpat, quam vitae mollis hendrerit, leo augue suscipit metus, quis ultrices magna lorem in dolor. Etiam nulla nulla, porttitor ac eros ut, pretium vestibulum leo.
  </p>
  <p>
  Nam sollicitudin facilisis sem, id sollicitudin metus congue sit amet. Maecenas sollicitudin nulla ex, rhoncus varius metus interdum nec. Cras laoreet placerat lacus sed sollicitudin. Etiam sed blandit lacus, sed aliquet felis. Integer nec ex ac nisl sollicitudin pharetra vitae ut massa. Aliquam condimentum justo nec ligula convallis, eu ornare mauris vulputate. Pellentesque eget pulvinar nisl. Donec tincidunt urna at sapien condimentum mollis. Curabitur consectetur quis tellus a ornare.
  </p>
  <p>
  In vestibulum eros a imperdiet scelerisque. Ut at risus est. Aenean ac dignissim tortor, nec sodales diam. Cras id sodales sem. In ullamcorper nulla ut malesuada fermentum. Etiam ut lobortis diam, vel congue augue. Fusce suscipit imperdiet lacus, sed aliquam libero lacinia in. Nulla facilisis luctus erat in aliquam. Ut ac molestie magna. Fusce accumsan a mi ut iaculis. Donec id dictum sapien, et pharetra sapien. Duis pretium, nibh non pharetra varius, justo dui fermentum lorem, at pharetra massa augue eget nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mollis nisl et eros aliquet eleifend.
  </p>
  <p>
  Morbi lobortis mauris arcu, sed auctor purus molestie ut. Sed sed quam eu ante cursus semper. In ultrices, dui ultrices accumsan lacinia, dolor arcu ultrices nunc, at efficitur massa urna sit amet ipsum. Duis pellentesque ornare laoreet. Integer dignissim ut ante vel finibus. Aenean varius eros vitae libero dapibus, in malesuada nulla faucibus. Praesent sed feugiat odio, at pulvinar erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sed orci ipsum. Curabitur tempus tellus at velit porta varius. Pellentesque accumsan mauris tortor, at pellentesque libero accumsan sed. Vestibulum congue condimentum mauris, eget vestibulum tortor facilisis at. Fusce iaculis mattis ante semper malesuada. Sed in interdum dolor. In nec dapibus tellus, et semper orci. Aliquam ante purus, bibendum nec scelerisque a, iaculis sit amet lectus.
  </p>
    `
  })
});

router.get('/login', function (req, res) {
  res.render('login');
});

module.exports = router;
