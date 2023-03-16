export default ngModule => {
  ngModule.config(addWrappers);

  require('dynamic-bind-html');

  function addWrappers(formlyConfigProvider) {
    formlyConfigProvider.setWrapper([
      {
        name: 'bootstrapLabel',
        template: require('./label.html'),
        apiCheck: check => ({
          templateOptions: {
            label: check.string.optional,
            required: check.bool.optional,
            labelSrOnly: check.bool.optional,
          }
        })
      },
      {name: 'bootstrapHasError', template: require('./has-error.html')}
    ]);
  }
};
