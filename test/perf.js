
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

var mergedOptionsTwo = {
  inlineAMDS: [
    'path/to/module',
    'path/to/utilty',
    'path/to/singleton',
    'path/to/sexymodule'
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

function measure(name, workCallback) {
  var perf = window.performance;
  var startName = name + '_start';
  var endName = name + '_end';
  var measName = name + '_meas';

  perf.mark(startName);
  workCallback();
  perf.mark(endName);
  perf.measure(measName, startName, endName);
  var meass = perf.getEntriesByType('measure');
  return meass.filter(function(m) {
    return m.name === measName;
  });
}


describe('Performance tests', function() {

  describe('compare', function() {
    it ('object', function(done) {
      var results = measure('object', function() {
        var testObj = {
          one: true,
          two: 3.14,
          three: 'A dog'
        };
        var testNumber = 3;
        expect(tc.compare(testObj, testNumber)).toBe(false);

        var testObjOne = {
          one: true,
          two: 3.14,
          three: 'A dog'
        };

        var testObjTwo = {
          one: true,
          two: 3.14,
          three: 'A dog'
        };
        expect(tc.compare(testObjOne, testObjTwo)).toBe(true);
      });

      setTimeout(function() {
        expect(results[0].duration).toBeLessThan(0.500);
        done();
      }, 500);
    });
  });

  describe('assign', function() {
    it ('complex object', function(done) {
      var results = measure(';complex', function() {
        var result = tc.deepAssign(defaultOptions, {
          inlineAMDS: [
            'path/to/module',
            'path/to/utilty',
            'path/to/singleton',
            'path/to/sexymodule'
          ],
          layout: {
            tagManager: 'dynamic'
          }
        });
        expect(result).toEqual(mergedOptionsTwo);
      });

      setTimeout(function() {
        expect(results[0].duration).toBeLessThan(1.100);
        done();
      }, 500)
    })
  });

});
