'use strict';

const PhotoLister = {
    photoListItem: (photo)=>{
        return `<li><figure><img src="${photo.url}" alt=""/><figcaption>${photo.title}</figcaption></figure></li>`
    },

    photoListToHTML: (photos)=>{
        return '<ul>' + photos.map(PhotoLister.photoListItem).join('') + '</ul>';
    }
}

module.exports = PhotoLister;