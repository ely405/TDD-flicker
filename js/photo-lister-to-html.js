'use strict';

const PhotoLister = {
    photoListItem: (photo)=>{
        return `<li><figure><img src="${photo.url}" alt=""/><figcaption>${photo.title}</figcaption></figure></li>`
    },

    photoListToHTML: (photos)=>{
        return '<ul>' + photos.map(PhotoLister.photoListItem).join('') + '</ul>';
    },

    addPhotosToElement: ($, selector, list)=>{
        return $(selector).append(list);
    }
}

if((typeof module !== 'udefined') && (typeof module.exports !== 'undefined')){
    module.exports = PhotoLister;
}