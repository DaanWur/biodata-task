const {environment} = require('@rails/webpacker')

const customConfig = {
    resolve: {
        extensions: ['.js', '.jsx']

    }
};

environment.config.delete('node.dgram')
environment.config.delete('node.fs')
environment.config.delete('node.net')
environment.config.delete('node.tls')
environment.config.delete('node.child_process')

environment.config.merge(customConfig);

module.exports = environment
