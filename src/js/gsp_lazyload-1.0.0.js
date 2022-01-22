/*!
 * gsp_lazyload (Modified by Piyush Jain)
 * @copyright (c) 2013 Kuneri Ltd.
 * @copyright (c) 2016 Piyush Jain
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/ressio/lazy-load-xt/master/LICENSE-MIT
 * @version   0.1.0
 */

(function ($, window, document, undefined) {
    'use strict';

    // options
    var gsp_lazyload = 'gsp_lazyload',
        //dataLazied = 'lazied',
        //load_error = 'load error',
        //classLazyHidden = 'lazy-hidden',
        docElement = document.documentElement || document.body,
    //  force load all images in Opera Mini and some mobile browsers without scroll event or getBoundingClientRect()
        forceLoad = (window.onscroll === undefined || !!window.operamini || !docElement.getBoundingClientRect),
        serveWebP = void 0,
        options = {
            //autoInit: true, // auto initialize in $.ready
            selector: 'img[data-gsll-src],video[data-gsll-src],iframe[data-gsll-src],[data-gsll-widget]', // selector for lazyloading elements
            //blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            throttle: 99, // interval (ms) for changes check
            forceLoad: forceLoad, // force auto load all images

            //loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
            updateEvent: 'load orientationchange resize scroll mousemove touchmove focus gse_lazyload', // page-modified events
            //forceEvent: 'lazyloadall' // force loading of all elements
            lazyloadEvent: 'gse_lazyload',

            //onstart: null,
            //oninit: {removeClass: 'lazy'}, // init handler
            //onshow: {addClass: classLazyHidden}, // start loading handler
            //onload: {removeClass: classLazyHidden, addClass: 'lazy-loaded'}, // load success handler
            //onerror: {removeClass: classLazyHidden}, // error handler
            //oncomplete: null, // complete handler

            //scrollContainer: undefined,
            //checkDuplicates: true
        },
        elementOptions = {
            srcAttr: 'data-gsll-src',
            webpAttr : 'data-gsd-webp',
            hThreshold: 10,
            vThreshold: 10,
            visibleOnly: true,
            effect: 'fadeIn'//'show'
            //forceLoad: false
        },
        reWidget = /<!--([\s\S]*)-->/,
        $window = $(window),
        $document = $(document),
        //$isFunction = $.isFunction,
        $extend = $.extend,
        $data = $.data || function (el, name) {
            return $(el).data(name);
        },
        elements = [],
        topLazy = 0,
    /*
     waitingMode=0 : no setTimeout
     waitingMode=1 : setTimeout, no deferred events
     waitingMode=2 : setTimeout, deferred events
     */
        waitingMode = 0;

    //$.gsp_detect && $.gsp_detect.isWebpSupport(function(supports){serveWebP = supports;});
    $[gsp_lazyload] = $extend(options, elementOptions, $[gsp_lazyload]);
    /**
     * Return options.prop if obj.prop is undefined, otherwise return obj.prop
     * @param {*} obj
     * @param {*} prop
     * @returns *
     */
    function getOrDef(obj, prop) {
        return obj[prop] === undefined ? options[prop] : obj[prop];
    }

    /**
     * @returns {number}
     */
    function scrollTop() {
        var scroll = window.pageYOffset;
        return (scroll === undefined) ? docElement.scrollTop : scroll;
    }

    /**
     * Add new elements to lazy-load list:
     * $(elements).gsp_lazyload() or $(window).gsp_lazyload()
     *
     * @param {object} [overrides] override global options
     */
    $.fn[gsp_lazyload] = function (overrides) {
        overrides = overrides || {};

        var //blankImage = getOrDef(overrides, 'blankImage'),
            //checkDuplicates = getOrDef(overrides, 'checkDuplicates'),
            scrollContainer = getOrDef(overrides, 'scrollContainer'),
            //forceShow = getOrDef(overrides, 'show'),
            elementOptionsOverrides = {},
            prop;

        // empty overrides.scrollContainer is supported by jQuery
        $(scrollContainer).on('scroll', queueCheckLazyElements);

        for (prop in elementOptions) {
            elementOptionsOverrides[prop] = getOrDef(overrides, prop);
        }
        
        var result = this.each(function (index, el) {
            if (el === window) {
                $(options.selector).gsp_lazyload(overrides);
            } else {
            	$el = $(el);
            	//Recursively check inner components and apply lazyloading.
            	$el.find(options.selector).gsp_lazyload(overrides);
            	
                var //duplicate = checkDuplicates && $data(el, dataLazied),
                    $el = $el.filter(options.selector);/*.data(dataLazied, 1)*/

                //Proceed only when there exists something to lazyload.
            	if(typeof $el !== 'undefined' && $el.length) {
            		// clone elementOptionsOverrides object
                    var objData = $el[gsp_lazyload] = $extend({}, elementOptionsOverrides);
                    
                    //Consider webp image if supported. Replace gsll_src with gsd-web
                    if (serveWebP) {
                    	var webpsrc = el.getAttribute(objData.webpAttr);
                    	if(webpsrc) {
                    		$el.attr(objData.srcAttr, webpsrc).removeAttr(objData.webpAttr);
                    	}
                    }
                    
                    //Event for lazyloading. Other components should leverage this event.
            		$el.one(options.lazyloadEvent, function () {
            			var src = $el.attr(objData.srcAttr)
            			
            			//Load images with show/fadeIn effect
            			if(src) {
	            			if ($el.is("img")) {
		            			$("<img />")
		                        .one("load", function() {
		                        	//Duplicate images may still be hidden, hence no effect on them.
		                        	if(!$el.is(':hidden')) {
			                            $el.hide().attr("src", src).removeAttr(objData.srcAttr);
			                            $el[objData.effect]();
		                        	} else {
		                        		$el.attr("src", src).removeAttr(objData.srcAttr);
		                        	}
		                            //Find and load duplicates if any
		                            $(this.tagName+'['+objData.srcAttr+'="'+src+'"]').trigger(options.lazyloadEvent);
		                        }).attr("src", src);
	                        } else if($el.is("iframe,video")){
	                        	//Load iframes/videos
	                        	$el.attr("src", src);
	                        }
            			} else if($el.is('[data-gsll-widget]')) {
            				//Load Widgets
	                        var match = reWidget.exec($el.html());
	                        if (match) {
	                        	$el.html('');//Remove the script
	                        	$el.parent().append($.trim(match[1]));//Attach script to the parent
	                        }
		                }
            		});
            		
                    // prevent duplicates
                    /*if (duplicate) {
                        queueCheckLazyElements();
                        return;
                    }*/

                    /*if (blankImage && el.tagName === 'IMG' && !el.src) {
                        el.src = blankImage;
                    }*/

                    //triggerEvent('init', $el);
                    elements.push($el);
            	}
            }
        });
        queueCheckLazyElements();
        
        return result;
    };

    /**
     * Process function/object event handler
     * @param {string} event suffix
     * @param {jQuery} $el
     */
    /*function triggerEvent(event, $el) {
        var handler = options['on' + event];
        if (handler) {
            if ($isFunction(handler)) {
                handler.call($el[0]);
            } else {
                if (handler.addClass) {
                    $el.addClass(handler.addClass);
                }
                if (handler.removeClass) {
                    $el.removeClass(handler.removeClass);
                }
            }
        }

        $el.trigger('lazy' + event, [$el]);

        // queue next check as images may be resized after loading of actual file
        queueCheckLazyElements();
    }*/

    /**
     * Trigger onload/onerror handler
     * @param {Event} e
     */
    /*function triggerLoadOrError(e) {
        triggerEvent(e.type, $(this).off(load_error, triggerLoadOrError));
    }*/

    /**
     * Load visible elements
     * @param {bool} [force] loading of all elements
     */
    function checkLazyElements(force) {
        if (!elements.length) {
            return;
        }

        force = force || options.forceLoad;
        topLazy = Infinity;

        var viewportTop = scrollTop(),
            viewportHeight = window.innerHeight || docElement.clientHeight,
            viewportWidth = window.innerWidth || docElement.clientWidth,
            i,
            length;

        for (i = 0, length = elements.length; i < length; i++) {
            var $el = elements[i],
                el = $el[0],
                objData = $el[gsp_lazyload],
                removeNode = false,
                visible = force || /*objData.forceLoad || */$data(el, objData.srcAttr) || false,
                topEdge;

            // remove items that are not in DOM
            if (!$.contains(docElement, el)) {
                removeNode = true;
            } else if (force || !objData.visibleOnly || el.offsetWidth || el.offsetHeight) {
                if (!visible) {
                    var elPos = el.getBoundingClientRect(),
                        hThreshold = objData.hThreshold,
                        vThreshold = objData.vThreshold;

                    topEdge = (elPos.top + viewportTop - vThreshold) - viewportHeight;

                    visible = (topEdge <= viewportTop && elPos.bottom > -vThreshold &&
                        elPos.left <= viewportWidth + hThreshold && elPos.right > -hThreshold);
                }

                if (visible) {
                    //$el.on(load_error, triggerLoadOrError);

                    //triggerEvent('show', $el);

                    /*var srcAttr = objData.srcAttr,
                        src = $isFunction(srcAttr) ? srcAttr($el) : el.getAttribute(srcAttr);

                    if (src) {
                    	$el.css({'opacity' : 0});
                        el.src = src;
                    }*/
                	$el.trigger(options.lazyloadEvent);
                    removeNode = true;
                } else {
                    if (topEdge < topLazy) {
                        topLazy = topEdge;
                    }
                }
            }

            if (removeNode) {
           		//Remove attribute when loading completes to avoid carousel clone issue.
                //$el.removeAttr(objData.srcAttr);
                //$data(el, dataLazied, 0);
                elements.splice(i--, 1);
                length--;
            }
        }

        /*if (!length) {
            triggerEvent('complete', $(docElement));
        }*/
    }

    /**
     * Run check of lazy elements after timeout
     */
    function timeoutLazyElements() {
        if (waitingMode > 1) {
            waitingMode = 1;
            checkLazyElements();
            setTimeout(timeoutLazyElements, options.throttle);
        } else {
            waitingMode = 0;
        }
    }

    /**
     * Queue check of lazy elements because of event e
     * @param {Event} [e]
     */
    function queueCheckLazyElements(e) {
        if (!elements.length) {
            return;
        }

        // fast check for scroll event without new visible elements
        if (e && e.type === 'scroll' && e.currentTarget === window) {
            if (topLazy >= scrollTop()) {
                return;
            }
        }

        if (!waitingMode) {
            setTimeout(timeoutLazyElements, 0);
        }
        waitingMode = 2;
    }

    /**
     * Initialize list of hidden elements
     */
    function initLazyElements() {
        //$window.gsp_lazyload();
    	if($.gsp_detect) {
    		$.gsp_detect.isWebpSupport(function(supports){
    			serveWebP = supports;
    			$(options.selector).gsp_lazyload();
    		});
    	} else {
    		$(options.selector).gsp_lazyload();
    	}    	
    }

    /**
     * Loading of all elements
     */
    /*function forceLoadAll() {
        checkLazyElements(true);
    }*/
    /*$.fn.lazyload = function(scrollContainer) {
        $(scrollContainer).find(options.selector).gsp_lazyload(scrollContainer);
    }*/

    /**
     * Initialization
     */
    $(function () {
       // triggerEvent('start', $window);

        $window.on(options.updateEvent, queueCheckLazyElements);
            //.on(options.forceEvent, forceLoadAll);

        $document.on(options.updateEvent, queueCheckLazyElements);

        //if (options.autoInit) {
            //$window.on(options.loadEvent, initLazyElements);
            initLazyElements(); // standard initialization
        //}
    });

})(jQuery, window, document);