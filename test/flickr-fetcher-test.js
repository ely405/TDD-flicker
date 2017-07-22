//Nota que he usado expect(actual).to.eql(expected); en lugar de expect(actual).to.equal(expected);. 
//Esto le dice a Chai que verifique cada value dentro de expected. 
//La regla aquí es, usa equal cuando comparas numbers, strings o booleans, 
//y usa eql cuando comparan arreglos u objetos.

'use strict';
const expect = require('chai').expect;
const FlickrFetcherApp = require('../js/flickr-fetcher.js');

describe('flickr fetcher', ()=>{
    it('Should exist', ()=>{
        const flickrFetcher = require('../js/flickr-fetcher.js');
        expect(flickrFetcher).to.not.be.undefined
    });
});

describe('Photo object to URL', ()=>{
    it('Should take a photo from Flickr and return a string', ()=>{
        let input = {
            id: '24770505034',
            owner: '97248275@N030',
            secret: '31a9986429',
            server: '1577',
            farm: 2,
            title: '20160229090898',
            isPublic: 1,
            isFriend: 0,
            isFamily: 0
        }
        let expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
        let actual = FlickrFetcherApp.photoObjToURL(input);
        expect(actual).to.eql(expected);

        input = {
            id:       '24770504484',
            owner:    '97248275@N03',
            secret:   '69dd90d5dd',
            server:   '1451',
            farm:     2,
            title:    '20160229090903',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        expected = 'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg';
        actual = FlickrFetcherApp.photoObjToURL(input);
        expect(actual).to.eql(expected);
    });

    // tomar la lista de objetos photo que Flickr nos da y transformarlo en una lista de objetos en los que tengamos solo la información que quiero
    it('should take a photo object and return an object with just title and URL', ()=>{
        let input = {
                id:       '25373736106',
                owner:    '99117316@N03',
                secret:   '146731fcb7',
                server:   '1669',
                farm:     2,
                title:    'Dog goes to desperate measure to avoid walking on a leash',
                ispublic: 1,
                isfriend: 0,
                isfamily: 0
            },
        expected = {
                title: 'Dog goes to desperate measure to avoid walking on a leash',
                url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            },
        actual = FlickrFetcherApp.transformPhotoObj(input);
            expect(actual).to.eql(expected);
        
        input = {
            id:       '24765033584',
            owner:    '27294864@N02',
            secret:   '3c190c104e',
            server:   '1514',
            farm:     2,
            title:    'the other cate',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        }
        expected = {
            title: 'the other cate',
            url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
        }
        actual = FlickrFetcherApp.transformPhotoObj(input);
        expect(actual).to.eql(expected);
    });
});

describe('FETCH FLICKR DATA', ()=>{
    it('Should take an API key and fetcher function argument and return a promise for JSON data', (done)=>{
        let apiKey = 'does not matter much what this is right now',
            fakeData = {
                'photos': {
                    'page': 1,
                    'pages': 2872,
                    'perpage': 100,
                    'total': '287170',
                    'photo': [{
                        'id': '247705005034',
                        'owner':    '97248275@N03',
                        'secret':   '31a9986429',
                        'server':   '1577',
                        'farm':     2,
                        'title':    '20160229090898',
                        'ispublic': 1,
                        'isfriend': 0,
                        'isfamily': 0
                    }, {
                        'id':       '24770504484',
                        'owner':    '97248275@N03',
                        'secret':   '69dd90d5dd',
                        'server':   '1451',
                        'farm':     2,
                        'title':    '20160229090903',
                        'ispublic': 1,
                        'isfriend': 0,
                        'isfamily': 0
                    }]
                }
            },
            //fakeDataFetcher() para reemplazar el $.getJSON() es conocido como STUB. 
            //STUB es una pieza de código que tiene el mismo API y comportamiento como el código ‘real’, pero con una funcionalidad mucho más reducida. Usualmente esto significa retornar data estática en lugar de interactuar con algunos recursos externos.
            //Stubs es una herramienta importante en TDD. Nos ayudan a mantener los test corriendo rápidamente así nuestro flujo de trabajo no se hace más lento.
            //nos permite tener test consistentes para cosas que por herencia puede ser variables (como las llamadas a red).
            fakeDataFetcher = (url)=>{
                const expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&text=pugs&format=json&nojsoncallback=1'
                expect(url).to.equal(expectedURL);
                return Promise.resolve(fakeData);
            };
        FlickrFetcherApp.fetchFlickrData(apiKey, fakeDataFetcher).then((actual)=>{
            expect(actual).to.eql(fakeData);
            //done() permite decirle a Mocha cuando los test estan completados.
           done();
        });
    });
});

describe('FETCH PHOTOS IN A CALL', ()=>{
    it('Should take an API key and fetcher function, and return a promise for transformed photos', ()=>{
        let apiKey = 'does not matter what this right now',
            expected = [{
                title: 'Dog goes to desperate measure to avoid walking on a leash',
                url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            }, {
                title: 'the other cate',
                url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
            }],
            fakeData = {
                'photos': {
                    'page':    1,
                    'pages':   2872,
                    'perpage': 100,
                    'total':   '287170',
                    'photo':   [{
                        id:       '25373736106',
                        owner:    '99117316@N03',
                        secret:   '146731fcb7',
                        server:   '1669',
                        farm:     2,
                        title:    'Dog goes to desperate measure to avoid walking on a leash',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    }, {
                        id:       '24765033584',
                        owner:    '27294864@N02',
                        secret:   '3c190c104e',
                        server:   '1514',
                        farm:     2,
                        title:    'the other cate',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    }]
                }
            },
            fakeDataFetcher = (url)=>{
                let expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='
                            + apiKey + '&text=pugs&format=json&nojsoncallback=1'
                expect(url).to.equal(expectedURL)
                return Promise.resolve(fakeData);
            };
        return FlickrFetcherApp.fetchPhotos(apiKey, fakeDataFetcher).then(function(actual) {
            expect(actual).to.eql(expected);
        });
    });
});