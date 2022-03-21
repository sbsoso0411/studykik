/**
 * jQuery.labelify - Display in-textbox hints
 * Stuart Langridge, http://www.kryogenix.org/
 * Released into the public domain
 * Date: 25th June 2008
 * @author Stuart Langridge
 * @version 1.3
 *
 *
 * Basic calling syntax: $("input").labelify();
 * Defaults to taking the in-field label from the field's title attribute
 *
 * You can also pass an options object with the following keys:
 *   text
 *     "title" to get the in-field label from the field's title attribute
 *      (this is the default)
 *     "label" to get the in-field label from the inner text of the field's label
 *      (note that the label must be attached to the field with for="fieldid")
 *     a function which takes one parameter, the input field, and returns
 *      whatever text it likes
 *
 *   labelledClass
 *     a class that will be applied to the input field when it contains the
 *      label and removed when it contains user input. Defaults to blank.
 *
 */
(function ($) {
  jQuery.fn.labelify = function(settings) {
    settings = jQuery.extend({
      text: "title",
      labelledClass: ""
    }, settings);
    var lookups = {
      title: function(input) {
        return $(input).attr("title");
      },
      label: function(input) {
        return $("label[for=" + input.id +"]").text();
      }
    };
    var lookup;

    var isPassword = $(this).attr("type") == "password";

    if (isPassword) {
      var pwdInput = $(this);
      var pwdDummy = $(this)
        .clone()
        .val('')
        .attr('type','text')
        .attr('id', $(this).attr("id") + "-text");
    }

    var jQuery_labellified_elements = $(this);

    return $(this).each(function() {
      if (typeof settings.text === "string") {
        lookup = lookups[settings.text]; // what if not there?
      } else {
        lookup = settings.text; // what if not a fn?
      };
      // bail if lookup isn't a function or if it returns undefined
      if (typeof lookup !== "function") { return; }
      var lookupval = lookup(this);
      if (!lookupval) { return; }

      // need to strip newlines because the browser strips them
      // if you set textbox.value to a string containing them
      $(this).data("label", lookup(this).replace(/\n/g,''));

      if (isPassword) {
        // Add dummy input to show label.
        $(this).after(pwdDummy);

        $(pwdDummy)
          .val($(this).data("label"))
          .addClass(settings.labelledClass)
          .focus(function() {
            $(this).hide();
            $(pwdInput).show().focus();
          });

        // If value exist - leave field.
        (pwdInput.val() == '') ? $(pwdInput).hide() : $(pwdDummy).hide();
      }

      $(this).focus(function() {
        if (!isPassword && this.value === $(this).data("label")) {
          this.value = this.defaultValue;
          $(this).removeClass(settings.labelledClass);
        }
      }).blur(function() {
        if (isPassword && $(this).val() == "") {
          $(this).hide();
          pwdDummy.show();
        }
        else {
          if (this.value === this.defaultValue) {
            this.value = $(this).data("label");
            $(this).addClass(settings.labelledClass);
          }
        }
      });

      var removeValuesOnExit = function() {
        jQuery_labellified_elements.each(function() {
          if (!isPassword && this.value === $(this).data("label")) {
            this.value = this.defaultValue;
            $(this).removeClass(settings.labelledClass);
          }
        });
      };

      $(this).parents("form").submit(removeValuesOnExit);
      $(window).unload(removeValuesOnExit);

      // user already started typing; don't overwrite their work!
      if (this.value !== this.defaultValue) { return; }

      // actually set the value
      if (!isPassword) {
        $(this)
          .val($(this)
          .data("label"))
          .addClass(settings.labelledClass);
      }
    });
  };
})(jQuery);
