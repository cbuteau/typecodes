
var defaultProps = {
  PI: Math.PI,
  AVOGADRO: 6.022e23,
  display: 'The quick brown fox jumped over the lazy dog.'
};

var defaultOptions = {
  inlineAMDS: [
    'path/to/module',
    'path/to/utilty',
    'path/to/singleton'
  ],
  layout: {
    visibleProps: [
      'display',
      'index',
      'tags'
    ],
    tagManager: 'standard'
  },
  performance: {
    usePooling: false,
    useDocumentFragment: true
  }
};

var mergedOptions = {
  inlineAMDS: [
    'path/to/module',
    'path/to/utilty',
    'path/to/singleton'
  ],
  layout: {
    visibleProps: [
      'display',
      'index',
      'tags'
    ],
    tagManager: 'dynamic'
  },
  performance: {
    usePooling: false,
    useDocumentFragment: true
  }
};

describe('Deep Assign tests', function() {

  describe('Some Basic tests', function() {

    it('Merge', function() {
      var result = tc.deepAssign({}, defaultProps);
      expect(result).toEqual(defaultProps);
    });

    it('With Defaults', function() {
      var defaultSetting = {
        showDialogs: true,
        loglevel: 4
      };
      var result = tc.deepAssign(defaultSetting, {
        loglevel: 1
      });
      expect(result).toEqual({
        showDialogs: true,
        loglevel: 1
      });
    });

  });

  describe('Some Tests that use some object depth', function() {

    it('Component', function() {
      var result = tc.deepAssign(defaultOptions, {
        layout: {
          tagManager: 'dynamic'
        }
      });
      expect(result).toEqual(mergedOptions);
    });

  });




});
