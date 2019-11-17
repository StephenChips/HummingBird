var mockRouter = require('./mock-router')

var MOCK = [
    {
        articleId: 0,
        title: 'Bigger than Bigger',
        firstPublishTime: 1463513956478,
        lastUpdateTime: 1483511324447 ,
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan risus eu purus convallis fringilla. Vivamus est sem, aliquam non feugiat at, sagittis eget purus. Mauris sed purus malesuada, tempus sapien eget, egestas diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi vitae dapibus nulla. Praesent vulputate sed libero id vehicula. Cras pharetra mi sit amet quam dapibus maximus. Vestibulum semper lectus erat, vel faucibus urna auctor sed. Vestibulum vitae ipsum sed tortor efficitur malesuada aliquet et nisl. In non interdum sapien, vitae iaculis sapien. Phasellus ac cursus enim. Etiam ac condimentum odio. Curabitur arcu eros, finibus in tempus bibendum, mollis sed arcu. Suspendisse eu lobortis diam, sed vestibulum ipsum.

        Vestibulum efficitur sed eros nec finibus. Donec hendrerit dapibus ante blandit fermentum. Suspendisse varius erat quis lacinia pretium. Aliquam dignissim sapien eu pulvinar imperdiet. In sodales dictum ornare. Nulla facilisi. Phasellus sit amet turpis quis quam ullamcorper convallis. In pretium convallis lectus quis sagittis. Etiam vulputate finibus augue, id sodales urna laoreet ut. Nulla facilisi. Ut lorem leo, euismod eu laoreet sed, commodo sed elit. Etiam rutrum odio quis augue posuere congue. Duis in tristique lectus. Aenean aliquet leo tortor.`,
        categoryId: 3,
        sectionId: 1,
        state: 'published',
        refImages: []
    },
    {
        articleId: 1,
        title: 'Has yyou dcemisash eadiiop mir dcoop dsleppo?',
        firstPublishTime: 1485533344474,
        lastUpdateTime: 1496533434315,
        content: `Fusce in ultrices sem. Aliquam auctor lectus non fermentum faucibus. Morbi id congue lorem, vel mollis tellus. Sed tincidunt viverra pharetra. Suspendisse dapibus vestibulum urna, venenatis pharetra leo hendrerit vitae. Quisque faucibus pharetra tincidunt. Vivamus et tellus finibus nibh pulvinar accumsan. Integer sed elementum nisl. Pellentesque viverra vehicula lorem venenatis pellentesque. Nam convallis vehicula gravida. In hac habitasse platea dictumst. Vivamus sollicitudin lobortis volutpat. Sed a nunc urna. Integer tempus sem et aliquam luctus. Duis condimentum metus ligula, nec porttitor mauris tincidunt at. Suspendisse sit amet purus nec ex aliquam cursus et vitae ex.`,
        categoryId: 1,
        sectionId: 0,
        state: 'drafted',
        refImages: [
            '/img/3.img'
        ]
    },
    {
        articleId: 2,
        title: 'Eitukoochiviitrep yyfee minsk ckop mir eppo',
        firstPublishTime: 1585533344474,
        lastUpdateTime: 1599933434315,
        content: `Fusce in ultrices sem. Aliquam auctor lectus non fermentum faucibus. Morbi id congue lorem, vel mollis tellus. Sed tincidunt viverra pharetra. Suspendisse dapibus vestibulum urna, venenatis pharetra leo hendrerit vitae. Quisque faucibus pharetra tincidunt. Vivamus et tellus finibus nibh pulvinar accumsan. Integer sed elementum nisl. Pellentesque viverra vehicula lorem venenatis pellentesque. Nam convallis vehicula gravida. In hac habitasse platea dictumst. Vivamus sollicitudin lobortis volutpat. Sed a nunc urna. Integer tempus sem et aliquam luctus. Duis condimentum metus ligula, nec porttitor mauris tincidunt at. Suspendisse sit amet purus nec ex aliquam cursus et vitae ex.`,
        categoryId: 1,
        sectionId: 0,
        state: 'drafted',
        refImages: [
            '/img/3.img'
        ]
    }
];

module.exports = mockRouter('article', MOCK);
