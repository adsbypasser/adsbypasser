export {
  Promise_,
};

import {
  usw,
} from 'util/platform';


const Promise_ = getPromiseConstructor();


function getPromiseConstructor () {
  if (usw.Future) {
    // HACK: for Gecko 24, so far only Pale Moon
    // need dom.future.enabled = true
    return (fn) => {
      return usw.Future.call(this, (fr) => {
        fn(fr.resolve.bind(fr), fr.reject.bind(fr));
      });
    };
  }

  /* global PromiseResolver: false */
  if (PromiseResolver) {
    // HACK: for Gecko 25, so far only Pale Moon
    // need dom.promise.enabled = true
    return (fn) => {
      return new Promise((pr) => {
        fn(pr.resolve.bind(pr), pr.reject.bind(pr));
      });
    };
  }

  return Promise;
}
