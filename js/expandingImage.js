/* Expanding Image Script by Alec Hole 2018 */

$(document).ready(function(){
    jQuery.fn.extend({
        transitionGrowHeightFromZero: function (inpDelay, funcAfterEffect){
           return $(this).transitionHeightToOrFromZero(true, inpDelay, funcAfterEffect);
        },
        transitionShrinkHeightToZero: function (inpDelay, funcAfterEffect){
            return $(this).transitionHeightToOrFromZero(false, inpDelay, funcAfterEffect);
        },
        transitionHeightToOrFromZero: function (growItem, inpDelay, funcAfterEffect) {
            var tDelay = inpDelay;
            var tSecsDelay = inpDelay / 1000;
            var transitionData = "height " + tSecsDelay +"s ease-in-out";

            var menuItems = $(this);
            menuItems.css({"height" : "auto"});
            var menuCssHeight = menuItems.height();

            var startHeight = (growItem === true) ? 0 : (menuCssHeight + "px");
            var endHeight = (growItem === true) ? (menuCssHeight + "px") : 0;

            menuItems.css({"height" : startHeight});
            menuItems.cssAfterDelay({"height" : endHeight, "transition" : transitionData}, 15);
            menuItems.removeAttrAfterDelay("style", (tDelay + 15 + 20), funcAfterEffect);
            return this;
        },
        cssAfterDelay: function (inpStyles, inpDelay){
            this.customStyles = inpStyles;
            this.itemToModify = $(this);
            var cssAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.customStyles !== undefined){
                    (this.itemToModify).css(this.customStyles);
                }
            }).bind(this);

            setTimeout(cssAfterDelayFunction, inpDelay);

           return this;
        },
        addClassAfterDelay: function (inpClass, inpDelay){
            this.customClass = inpClass;
            this.itemToModify = $(this);

            var addClassAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.customClass !== undefined){
                    (this.itemToModify).addClass(this.customClass);
                }
            }).bind(this);

            setTimeout(addClassAfterDelayFunction, inpDelay);

            return this;
        },
        removeClassAfterDelay: function (inpClass, inpDelay){
            this.customClass = inpClass;
            this.itemToModify = $(this);

            var removeClassAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.customClass !== undefined){
                    (this.itemToModify).removeClass(this.customClass);
                }
            }).bind(this);

            setTimeout(removeClassAfterDelayFunction, inpDelay);

           return this;
        },
        removeAttrAfterDelay: function (inpAttr, inpDelay, inpFunctionAfter){
            this.attributeToRemove = inpAttr;
            this.itemToModify = $(this);
            if (inpFunctionAfter !== undefined){
                this.functionAfter = inpFunctionAfter;
            }
            var removeAttrAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.attributeToRemove !== undefined){
                    (this.itemToModify).removeAttr(this.attributeToRemove);
                }
                if (this.functionAfter !== undefined){
                    this.functionAfter();
                }
            }).bind(this);

            setTimeout(removeAttrAfterDelayFunction, inpDelay);
            return this;
        },
        attrAfterDelay: function (inpAttr, inpAttrVal, inpDelay, inpFunctionAfter){
            this.attributeToAlter = inpAttr;
            this.attributeNewValue = inpAttrVal;
            this.itemToModify = $(this);
            if (inpFunctionAfter !== undefined){
                this.functionAfter = inpFunctionAfter;
            }
            var attrAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.attributeToAlter !== undefined && this.attributeNewValue !== undefined){
                    (this.itemToModify).attr(this.attributeToAlter, this.attributeNewValue);
                }
                if (this.functionAfter !== undefined){
                    this.functionAfter();
                }
            }).bind(this);

            setTimeout(attrAfterDelayFunction, inpDelay);
            return this;
        },
        htmlAfterDelay: function (inpHtml, inpDelay, inpFunctionAfter){
            this.newHtml = inpHtml;
            this.itemToModify = $(this);
            if (inpFunctionAfter !== undefined){
                this.functionAfter = inpFunctionAfter;
            }
            var htmlAfterDelayFunction = (function () {        
                if (this.itemToModify !== undefined && this.newHtml !== undefined){
                    (this.itemToModify).html(this.newHtml);
                }
                if (this.functionAfter !== undefined){
                    this.functionAfter();
                }
            }).bind(this);

            setTimeout(htmlAfterDelayFunction, inpDelay);
            return this;
        },
        centredImageMargin: function(xOffset, yOffset, moveImageIntoViewport){
            var imageWidth = $(this).width() - xOffset;
            var imageHeight = $(this).height() - yOffset;

            var marginLeft = (Math.round((imageWidth + xOffset) / 2) + 1) * -1;
            var marginTop = (Math.round((imageHeight + yOffset) / 2) + 1) * -1;

            $(this).css({"margin-left" : (marginLeft + "px"), "margin-top" : (marginTop + "px")});
     
            if (moveImageIntoViewport === true){
                var viewPortWidth = $(window).width() - 2;
                var viewPortHeight = $(window).height() - 31;
                var currentPos = $(this).position();
                
                if (marginLeft + currentPos.left < 0){
                    $(this).css({"left" : (marginLeft * -1)});
                }else if (marginLeft + currentPos.left + imageWidth > viewPortWidth){
                    $(this).css({"left" : (viewPortWidth - imageWidth + (marginLeft * -1))});
                }
                if (marginTop + currentPos.top < 0){
                    $(this).css({"top" : (marginTop * -1)});
                }else if (marginTop + currentPos.top + imageHeight > viewPortHeight){
                    $(this).css({"top" : (viewPortHeight - imageHeight + (marginTop * -1))});
                }
            }
            return this;
        },
        checkExpandedImageRect: function(imageWidth, imageHeight){
            if (!(this.hasClass("hidden"))){
                var viewPortWidth = $(window).width() - 2;
                var viewPortHeight = $(window).height() - 31;

                if (imageHeight > viewPortHeight || imageWidth > viewPortWidth){
                    if (imageHeight > viewPortHeight && imageWidth > viewPortWidth){
                        if (viewPortHeight < viewPortWidth){
                            $("#expandedImage").css({"width" : "auto", "height" : viewPortHeight + "px"});
                        }else{
                            $("#expandedImage").css({"width" : viewPortWidth + "px", "height" : "auto"});
                        }
                        $(this).css({"left" : "50%", "top" : "50%"});
                    }else if (imageHeight > viewPortHeight){
                        $("#expandedImage").css({"width" : "auto", "height" : viewPortHeight + "px"});
                        $(this).css({"top" : "50%"});
                    }else{
                        $("#expandedImage").css({"width" : viewPortWidth + "px", "height" : "auto"});
                        $(this).css({"left" : "50%"});
                    }
                    $(this).centredImageMargin(2,  31, false);
                }else{
                    $("#expandedImage").css({"width" : "auto", "height" : "auto"});
                    $(this).centredImageMargin(2,  31, true);
                }
            }
            return this;
        },
        dragExpandedImage: function(event, tabletMode){
            var dragItem = $(this);

            var width = dragItem.outerWidth();
            var height = dragItem.outerHeight();

            var startOffsetX = dragItem.offset().left;
            var startOffsetY = dragItem.offset().top;

            var mouseX = (tabletMode === true) ? event.originalEvent.touches[0].pageX : event.pageX;
            var mouseY = (tabletMode === true) ? event.originalEvent.touches[0].pageY : event.pageY;

            var xPos = startOffsetX + width - mouseX;
            var yPos = startOffsetY + height - mouseY;

            if (!(mouseX - startOffsetX < 30 && mouseY - startOffsetY < 30)){ // Don't allow drag on close button
                event.preventDefault();
                dragItem.addClass("beingDragged");
                if (tabletMode === true){
                    $(document.body).on("touchmove", duringTouchMove = function(event){
                        var objX = event.originalEvent.touches[0].pageX;
                        var objY = event.originalEvent.touches[0].pageY;

                        if (objX !== undefined && objY !== undefined){
                            objX += (xPos - width);
                            objY += (yPos - height);
                            dragItem.offset({left: objX, top: objY});
                        }
                    }).on("touchend", afterTouchMove = function(event){
                        dragItem.removeClass("beingDragged");
                        $(document.body).off("touchmove", duringTouchMove);
                        $(document.body).off("touchend", afterTouchMove);
                    });
                }else{
                    $(document.body).on("mousemove", duringMouseMove = function(event){
                        var objX = event.pageX;
                        var objY = event.pageY;

                        if (objX !== undefined && objY !== undefined){
                            objX += (xPos - width);
                            objY += (yPos - height);
                            dragItem.offset({left: objX, top: objY});
                        }                      
                    }).on("mouseup", afterMouseMove = function(event){
                        dragItem.removeClass("beingDragged");
                        $(document.body).off("mousemove", duringMouseMove);
                        $(document.body).off("mouseup", afterMouseMove);
                    });
                }
            }
        }
    });

    var gImageWidth = 100;
    var gImageHeight = 100;

    function capitaliseFirstLetter(inputString){
        return inputString.charAt(0).toUpperCase() + this.substr(1);
    }

    function capitaliseEachWord(inputString){
        return inputString.replace(/(^\w|\s\w)/g, function (chr) {
            return chr.toUpperCase();
        });
    }

    // Image link clicked -- display the Image Viewer

    $(".expandingImage").click(function(event){
        event.preventDefault();
        var imageSource = $(this).attr("href");
        var imageTitle = $(this).attr("title");

        imageTitle = capitaliseEachWord(imageTitle);

        $("#expandedImageLoading").removeClass("hidden");
        $("#expandedImageWrap").removeClass("hidden");
        $("#expandedImage").attr("src", imageSource);
        $("#expandedImageWrap").children(".titleBar").children(".title").html(imageTitle);
    });

    // New Image Loaded in Image Viewer

    $("#expandedImage").on("load", function(){
        var expandedImageWrap = $("#expandedImageWrap");
        if (!(expandedImageWrap.hasClass("hidden"))){
            gImageWidth = expandedImageWrap.width();
            gImageHeight = expandedImageWrap.height();
            expandedImageWrap.css({"left" : "50%", "top" : "50%"});
            expandedImageWrap.checkExpandedImageRect(gImageWidth, gImageHeight);
            expandedImageWrap.addClass("loaded");
            $("#expandedImageLoading").addClassAfterDelay("hidden", 550);
        }
    });

    // Move Image Viewer

    $("#expandedImageWrap").on("mousedown", function(event){
        $(this).dragExpandedImage(event, false);
    });

    $("#expandedImageWrap").on("touchstart", function(event){                
        $(this).dragExpandedImage(event, true);
    });

    // Close Image Viewer

    $("#expandedImageCloseBox").click(function(event){
        event.preventDefault();
        $("#expandedImageWrap").removeClass("loaded").addClassAfterDelay("hidden", 600).removeAttrAfterDelay("style", 650);
        $("#expandedImage").attrAfterDelay("src", "Resources/blank.gif", 650).removeAttrAfterDelay("style", 650);
        $("#expandedImageWrap").children(".titleBar").children(".title").htmlAfterDelay("Image", 650);
    });

    // Browser Window Resized

    $(window).resize(function() {
       $("#expandedImageWrap").checkExpandedImageRect(gImageWidth, gImageHeight);
    });

    $(document).on("touchend", function(event){ 
        var itemID =  event.target;
        console.log(itemID);              
        if ($("#expandedImageWrap").hasClass("loaded") === true){
            $("#expandedImageWrap").css({"z-index" : "1000"});
        }

        
    });
});

// Prepare Image Loading Clock

$(window).on("load", function(event){
    $("#expandedImageLoading").addClass("ready hidden");
});