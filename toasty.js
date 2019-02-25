(function($) {
  var singleToasty;

  function Toasty(elem, options) {
    this.options = options;
  }

  Toasty.prototype = {
    init: function() {
      $("body").append(
        '<div id="toasty-guy"><img src="' +
          this.options.image +
          '" alt="toasty"></div>'
      );
      $("#toasty-guy").css("position", "fixed");
      $("#toasty-guy").css("right", "-170px");
      $("#toasty-guy").css("bottom", "0px");
      if (this.options.sound) {
        $("body").append(
          '<audio id="toasty-audio"><source src="' +
            this.options.sound +
            '" type="audio/mpeg"></source></audio>'
        );
      }
    },

    pop: function() {
      var audio = document.getElementById("toasty-audio");
      setTimeout(function() {
        // Chrome 18+ blocked sound before user interact with the page
        var playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(_ => {
            }).catch(error => {
              // deu ruim
              console.log(
                `Som bloqueado pelo navegador acesse chrome://flags/#autoplay-policy e altera a configuração`
              );
            });
        }
        $("#toasty-guy").addClass("show-guy");
        setTimeout(function() {
          $("#toasty-guy").removeClass("show-guy");
        }, 1000);
      }, 5000); // <-- Time to show dan
    }
  };

  $.fn.toasty = function(options) {
    this.each(function() {
      // Check if we should operate with some method
      if (/^(pop)$/i.test(options)) {
        // Normalize method's name
        options = options.toLowerCase();
        switch (options) {
          case "pop":
            singleToasty.pop();
            break;
        }
      } else if (typeof options == "object" || !options) {
        options = $.extend({}, $.fn.toasty.defaults, options);
        if (!singleToasty) {
          singleToasty = new Toasty($(this), options);
          singleToasty.init();
        }
      }
    });
  };

  $.fn.toasty.defaults = {
    sound: true,
    image: chrome.runtime.getURL("static/toasty.png"),
    sound: chrome.runtime.getURL("static/toasty.mp3")
  };
})(jQuery);
$(document).ready(function() {
  $("body").toasty();
  $("body").toasty("pop");
});
