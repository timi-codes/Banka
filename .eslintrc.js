module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true,
        mocha: true,
        jest: true,
    },
    globals: {
        document: true,
        window: true,
    },
    "plugins": [
        "jsdoc"
    ]
};