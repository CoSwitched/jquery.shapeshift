// Generated by CoffeeScript 1.4.0
(function() {

  $(function() {
    var $containers, child_count, filter_options, getRandomColor, renderChildren, renderPlaceholders;
    $containers = $(".ss-container");
    child_count = 30;
    (renderChildren = function() {
      var weighted_colspans;
      weighted_colspans = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3];
      return $containers.each(function(container_i) {
        var colspan, elements, height, i, _i;
        elements = [];
        for (i = _i = 0; 0 <= child_count ? _i < child_count : _i > child_count; i = 0 <= child_count ? ++_i : --_i) {
          if (container_i === 0) {
            colspan = weighted_colspans[Math.floor(Math.random() * weighted_colspans.length)];
            height = colspan * 80 + ((colspan - 1) * 12);
          } else {
            height = Math.random() * 100 + 100;
            colspan = 1;
          }
          elements.push("<li data-ss-colspan=" + colspan + " style='height: " + height + "'><div class='position'></div></li>");
        }
        return $(this).append(elements.join(""));
      });
    })();
    getRandomColor = function() {
      var color, i, letters, _i, _ref;
      letters = 'ABCDEF'.split('');
      color = '';
      for (i = _i = 0, _ref = letters.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        color += letters[Math.round(Math.random() * 5)];
      }
      return color;
    };
    (renderPlaceholders = function(type) {
      return $containers.each(function() {
        var $child, $children, background, height, i, width, _i, _results;
        $children = $(this).children().not(".credits");
        child_count = $children.length;
        if (type === "index") {
          return $(this).find(".position").show();
        } else {
          _results = [];
          for (i = _i = 0; 0 <= child_count ? _i < child_count : _i > child_count; i = 0 <= child_count ? ++_i : --_i) {
            $child = $($children[i]);
            height = $child.height();
            width = $child.width();
            switch (type) {
              case "fpoimg":
                background = 'url("http://fpoimg.com/' + width + 'x' + height + '?bg_color=' + getRandomColor() + '&text_color=444444")';
                break;
              case "placekittens":
                background = 'url("http://www.placekitten.com/' + width + '/' + height + '")';
            }
            _results.push($child.css({
              backgroundImage: background,
              height: height
            }));
          }
          return _results;
        }
      });
    })("fpoimg");
    filter_options = {
      minColumns: 3
    };
    $containers.shapeshift(filter_options);
    $(".options ul.animation li").on("click", function() {
      switch ($(this).data("option")) {
        case "enable":
          filter_options.animated = true;
          break;
        default:
          filter_options.animated = false;
      }
      return $containers.shapeshift(filter_options);
    });
    $(".options ul.dragndrop li").on("click", function() {
      console.log("!");
      switch ($(this).data("option")) {
        case "enable":
          filter_options.enableDrag = true;
          filter_options.enableDrop = true;
          break;
        default:
          filter_options.enableDrag = false;
          filter_options.enableDrop = false;
      }
      $containers.trigger('ss-destroy');
      return $containers.shapeshift(filter_options);
    });
    $(".options ul.filtering li").on("click", function() {
      switch ($(this).data("option")) {
        case "hide":
          $containers.children(":visible").sort(function() {
            return Math.round(Math.random()) - 0.5;
          }).first().hide();
          break;
        default:
          $containers.children(":hidden").sort(function() {
            return Math.round(Math.random()) - 0.5;
          }).first().show();
      }
      return $containers.trigger("ss-rearrange");
    });
    $(".options ul.placeholders li").on("click", function() {
      renderPlaceholders($(this).data("option"));
      return $containers.shapeshift(filter_options);
    });
    $containers.on("ss-rearranged", function(e, selected) {
      console.log("----------------------------------------");
      console.log("This container:");
      console.log($(this));
      console.log("Has rearranged this item:");
      console.log($(selected));
      return console.log("Into this position:", $(selected).index());
    });
    $containers.on("ss-removed", function(e, selected) {
      console.log("----------------------------------------");
      console.log("This item:");
      console.log($(selected));
      console.log("Has been removed from this container:");
      return console.log($(this));
    });
    $containers.on("ss-added", function(e, selected) {
      console.log("----------------------------------------");
      console.log("This item:");
      console.log($(selected));
      console.log("Has been added to this container:");
      return console.log($(this));
    });
    $containers.on("ss-trashed", function(e, selected) {
      console.log("----------------------------------------");
      console.log("This item:");
      console.log($(selected));
      return console.log("Has been removed from the DOM");
    });
    return $containers.on("ss-drop-finished", function(e) {
      console.log("----------------------------------------");
      console.log("This container:");
      console.log($(this));
      return console.log("Has finished rearrangement after a drop.");
    });
  });

}).call(this);
