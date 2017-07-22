'use strict';
const expect = require('chai').expect;
const photoListerApp = require('../js/photo-lister-to-html');

describe('PHOTO LISTER', ()=>{
    it('Shouls exist', ()=>{
        expect(photoListerApp).not.to.be.undefined;
    })
});

describe('PHOTO TO LIST ITEM', ()=>{
    it('Should take a photo object and return a list item string', ()=>{
        let input = {
                title: 'This is a test',
                url: 'http://loremflickr.com/960/593'
            },
            expected = '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
                     + '<figcaption>This is a test</figcaption></figure></li>';
        expect(photoListerApp.photoListItem(input)).to.equal(expected);

        input = {
            title: 'This is another test',
            url:   'http://loremflickr.com/960/593/puppy'
        }
        expected = '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
                 + '<figcaption>This is another test</figcaption></figure></li>';
        expect(photoListerApp.photoListItem(input)).to.equal(expected);
    });
});

describe('PHOTO LIST TO HTML', ()=>{
    it('should take an array of photo objects and convert them to an HTML list', function() {
        const input = [{
                title: 'This is a test',
                url:   'http://loremflickr.com/960/593'
            }, {
                title: 'This is another test',
                url:   'http://loremflickr.com/960/593/puppy'
            }],
            expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
                     + '<figcaption>This is a test</figcaption></figure></li>'
                     + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
                     + '<figcaption>This is another test</figcaption></figure></li></ul>';
        expect(photoListerApp.photoListToHTML(input)).to.equal(expected);
    });
});