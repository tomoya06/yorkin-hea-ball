Component({
    externalClasses: ['c-news-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        top: {
            type: Boolean,
            value: false
        },
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        },
        hasThumb: {
            type: Boolean,
            value: true
        }
    }
});
