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
        // if ((!fetch) && (typeof jQuery !== 'undefined')) {
        //     fetch = jQuery.getJSON.bind(jQuery);
        // }
        const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey.toString()+'&text=pugs&format=json&nojsoncallback=1';
        return fetch(url);
    },

    fetchPhotos: (apiKey, fetch)=>{
    return FlickrFetcher.fetchFlickrData(apiKey, fetch).then((data)=>{
        return data.photos.photo.map(FlickrFetcher.transformPhotoObj);
    });
}
};

if((typeof module !== 'udefined') && (typeof module.exports !== 'undefined')){
    module.exports = FlickrFetcher;
}

FlickrFetcher.fetchPhotos('8060d4cdac3ceb86af470aae29af3a56')
    .then(PhotoLister.photoListToHTML)
    .then((photosHTML)=>{
        PhotoLister.addPhotosToElement($, '#mydiv', photosHTML);
    });