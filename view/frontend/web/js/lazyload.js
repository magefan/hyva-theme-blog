/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */

/**
 * Posts autload
 */
(function () {
    'use strict';

    var Lazyload = function (options) {

        window.isMfPostLazyLoadIntited = true;

        var that = this;
        var _deepestScroll = 0;

        /**
         * Init options
         * @type {Object}
         */
        that.opt = Object.assign({
            expires: null,
            path: '/',
            domain: null,
            secure: false,
            lifetime: null
        }, options);


        /**
         * Load new content
         */
        function startLoading()
        {
            if (that.opt.current_page < that.opt.last_page && !that.loading) {
                that.loading = true;
                document.querySelector('.mfblog-show-onload').style.display = 'block';
                document.querySelector('.mfblog-hide-onload').style.display = 'none';

                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "GET", that.opt.page_url[that.opt.current_page+1], false ); // false for synchronous request
                xmlHttp.send( null );

                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

                    var $html = document.createElement('html');
                    $html.innerHTML = xmlHttp.responseText;

                    var ws = that.opt.list_wrapper;
                    var $nw = $html.querySelector(ws);

                    if ($nw) {
                        document.querySelector(ws).append($nw);
                        that.opt.current_page++;
                    }

                    if (window.LazyLoad) {
                        var lazyLoadConfig = {"elements_selector":"img,div","data_srcset":"originalset"};
                        new LazyLoad(lazyLoadConfig)
                    }


                    if (window.addthis) {
                        addthis.toolbox('.addthis_toolbox');
                    }

                    endLoading();
                } else {
                    console.log('Error: ' + xmlHttp.status + ' ' + xmlHttp.statusText);
                    endLoading();
                }
            }
        }

        /**
         * On loading end
         */
        function endLoading()
        {
            that.loading = false;
            document.querySelector('.mfblog-show-onload').style.display = 'none';

            if (that.opt.current_page < that.opt.last_page) {
                document.querySelector('.mfblog-hide-onload').style.display = 'block';
            }
        }

        /* Is not loading now */
        endLoading();

        /* If auto trigger enabled */
        if (that.opt.auto_trigger) {
            document.addEventListener('scroll', function () {

                if (_deepestScroll + 50 > document.documentElement.scrollTop) {
                    return;
                }

                _deepestScroll = document.documentElement.scrollTop;

                if ((document.querySelector(that.opt.trigger_element).getBoundingClientRect().top - that.opt.padding) <= window.innerHeight) {
                    startLoading();
                }
            });
        }

        /* On trigger element click */
        if (that.opt.trigger_element) {
            document.querySelector(that.opt.trigger_element).addEventListener('click', function () {
                startLoading();
            });
        }
    };

    window.mfPostLazyLoad = function(options) {
        if (!window.isMfPostLazyLoadIntited) {
            new Lazyload(options);
        }
    };
})()



