import axios from 'axios';
export default {
  $ajax: function() {
    var p = new Promise((resove, reject) => {
      var one = true;
      if (one) {
        resove('success');
      } else {
        resove('fail');
      }
    });
    return p;
  }
};
