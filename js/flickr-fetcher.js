//obtener data de Flickr
//Transformar la data

'use strict';

const FlickrFetcher = {
    photoObjToURL: (photoObject)=>{
        return ['https://farm', photoObject.farm,
                '.staticflickr.com/', photoObject.server,
                '/', photoObject.id,
                '_', photoObject.secret, '_b.jpg'
                ].join('');
    },

    transformPhotoObj: (photoObject)=>{
        return {
            title: photoObject.title,
            url:   FlickrFetcher.photoObjToURL(photoObject)    
        };
    },

    fetchFlickrData: (apiKey, fetch)=>{
        const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&text=pugs&format=json&nojsoncallback=1'
        return fetch(url);
    },

    fetchPhotos: (apiKey, fetch)=>{
    return FlickrFetcher.fetchFlickrData(apiKey, fetch).then((data)=>{
        return data.photos.photo.map(FlickrFetcher.transformPhotoObj);
    });
}
};

module.exports = FlickrFetcher;