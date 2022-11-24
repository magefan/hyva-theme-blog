module.exports = {
    purge: {
        content: [
            '../templates/**/*.phtml',
        ]
    },
    theme: {
        extend: {
            colors: {
                fav: '#222222',
                blue: {
                    400: '#60A5FA',
                    DEFAULT: '#3B82F6',
                    600: '#2563EB',
                }
            },
            spacing: {
                per70: '70%',
            }
        }
    }
}


