/* Popup Menu Script © Alec Hole 2018 */

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
        }
    });

    $(".menuButton").click(function(){
        var tMainMenu = $(this).parent(".mainMenu");
        var tMenuItems = $(this).next(".menuItems");

        var transitionDuration = 300;

        if (tMainMenu.hasClass("menuOpen")){
            var afterCloseFunc = (function(){
                $(this).removeClass("upArrow");
                tMainMenu.removeClass("menuOpen");
            }).bind(this);
            tMenuItems.transitionShrinkHeightToZero(transitionDuration, afterCloseFunc);
        }else{ 
            tMainMenu.addClass("menuOpen");

            var afterOpenFunc = (function(){
                $(this).addClass("upArrow");
            }).bind(this);
            tMenuItems.transitionGrowHeightFromZero(transitionDuration, afterOpenFunc);
        }
    });
});