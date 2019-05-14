Component({
    externalClasses: ['i-class'],

    properties: {
        status: {
            type: String,
            value: 'live'
        },
        teams: {
            type: Array,
        },
        extra: {
            type: String,
            value: ''
        }
    }
});
