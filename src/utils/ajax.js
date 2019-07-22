import axios from 'axios';
export default {
  $ajax: function() {
    var one = true;
    var p = new Promise((resove, reject) => {
      if (one) {
        resove('success');
      } else {
        resove('fail');
      }
    });
    return p;
  }
};
