export default (ngModule) => {
  ngModule.config(addWrappers);
  ngModule.filter("trustHtml", function ($sce) {
    return $sce.trustAsHtml;
  });
  ngModule.directive("bootstrapTooltip", function ($timeout) {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        // Wait for Angular to process attributes, then initialize tooltip
        $timeout(function () {
          element.tooltip();
        });
        
        // Watch for changes to the title attribute
        attrs.$observe('title', function(value) {
          if (value) {
            element.attr('data-original-title', value);
            if (element.data('bs.tooltip')) {
              element.tooltip('fixTitle');
            }
          }
        });
        
        // Clean up on scope destroy
        scope.$on("$destroy", function () {
          element.tooltip("destroy");
        });
      }
    };
  });

  function addWrappers(formlyConfigProvider) {
    formlyConfigProvider.setWrapper([
      {
        name: "bootstrapLabel",
        template: require("./label.html"),
        apiCheck: (check) => ({
          templateOptions: {
            label: check.string.optional,
            required: check.bool.optional,
            labelSrOnly: check.bool.optional,
            tooltip: check.string.optional,
          },
        }),
      },
      { name: "bootstrapHasError", template: require("./has-error.html") },
    ]);
  }
};
