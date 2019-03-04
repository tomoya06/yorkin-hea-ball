Component({
    externalClasses: ['c-news-class'],

    options: {
        multipleSlots: true
    },

    properties: {
        thumb: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: ''
        }
    }
});
