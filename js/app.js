/* ======= Model ======= */


var _id = function _id(x) {
    return document.getElementById(x);
};

var model = {
    currentImage: null,
    images: [{
        clickCount: 0,
        name: 'Green Leaves',
        imgSrc: './img/bananaLeaves.jpg'
    }, {
        clickCount: 0,
        name: 'Cave in California',
        imgSrc: '/img/caveImage.jpg'
    }, {
        clickCount: 0,
        name: 'Fishing in PA',
        imgSrc: './img/fishingImage.jpg'

    }, {
        clickCount: 0,
        name: 'Green Tree',
        imgSrc: './img/greenTree.jpg'
    }, {
        clickCount: 0,
        name: 'Stand Alone Tree',
        imgSrc: './img/treeImage.jpg'
    }]
};


/* ======= Controller ======= */

var controller = {

    init: function init() {
        // find todal numbe of Images
        var modelImagesLength = model.images.length;
        // set our current cat to the first one in the list
        model.currentImage = model.images[modelImagesLength - 1];

        // tell our views to initialize
        imageListView.init();
        imageView.init();
    },

    getcurrentImage: function getcurrentImage() {
        return model.currentImage;
    },

    getimages: function getimages() {
        return model.images;
    },

    // set the currently-selected cat to the object passed in
    setcurrentImage: function setcurrentImage(image) {
        model.currentImage = image;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function incrementCounter() {
        model.currentImage.clickCount++;
        imageView.render();
    }
};


/* ======= View ======= */

var imageView = {

    init: function init() {
        // store pointers to our DOM elements for easy access later
        this.imageElem = _id('image');
        this.imageNameElem = _id('image-name');
        this.imageSrcElem = _id('imgage-src');
        this.countElem = _id('click-count');

        // while on click, increment the current image's counter
        this.imageSrcElem.addEventListener('click', function() {
            controller.incrementCounter();
        }, false);

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function render() {
        // update the DOM elements with values from the current image
        var currentImage = controller.getcurrentImage();
        this.countElem.textContent = currentImage.clickCount + ' Click Counts...';
        this.imageNameElem.textContent = currentImage.name;
        this.imageSrcElem.src = currentImage.imgSrc;
    }
};

var imageListView = {

    init: function init() {
        // store the DOM element for easy access later
        this.imageListElem = document.getElementById('image-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function render() {
        var image, elem, i;
        // get the images we'll be rendering from the controller
        var images = controller.getimages();
        var imagesLength = images.length;

        // empty the image list
        this.imageListElem.innerHTML = '';

        // loop over the images
        for (i = 0; i < imagesLength; i++) {
            // this is the image we're currently looping over
            image = images[i];

            // make a new image list item and set its text
            elem = document.createElement('li');
            elem.textContent = image.name;

            // on click, setcurrentImage and render the imageView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the image variable to the click event function)
            elem.addEventListener('click', (function(img) {
                return function() {
                    controller.setcurrentImage(img);
                    imageView.render();
                };
            })(image));

            // finally, add the element to the list
            this.imageListElem.appendChild(elem);
        }
    }
};

// To initialize the project, 
controller.init();
