var path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/.netlify': {
                target: 'http://localhost:9000',
                pathRewrite: { '^/.netlify/functions': '' },
            },
        },
    },
    lintOnSave: true,
    configureWebpack: {
        resolve: {
            alias: {
                '@content': path.resolve(__dirname, 'content'),
                '@styles': path.resolve(__dirname, 'src/assets/styles'),
                '@axios': path.resolve(__dirname, 'src/axios.js'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@helpers': path.resolve(__dirname, 'src/helpers')
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('yaml')
            .test(/\.yaml$/)
            .use('js-yaml-loader')
            .loader('js-yaml-loader')
            .end()
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
    }
};