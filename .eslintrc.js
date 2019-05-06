module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true,
        mocha: true,
        jest: true,
    },
    "plugins": [
        "jsdoc"
    ],
    globals: {
        sessionStorage: true,
        fetch: true,
        document: true,
        window: true
        location: true;

      },
};