import {
  AdsBypasserError,
  every,
  forEach,
  template,
} from 'util/core';
import {
  register,
} from 'util/dispatcher';
import {
  uswProxy,
  GM,
} from 'util/platform';


const MANIFEST = [
  {
    name: 'version',
    key: 'version',
    default_: 0,
    verify (v) {
      return typeof v === 'number' && v >= 0;
    },
    normalize: toNumber,
  },
  {
    name: 'alignCenter',
    key: 'align_center',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    name: 'changeBackground',
    key: 'change_background',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    name: 'redirectImage',
    key: 'redirect_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    name: 'scaleImage',
    key: 'scale_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    name: 'logLevel',
    key: 'log_level',
    default_: 1,
    verify (v) {
      return typeof v === 'number' && v >= 0 && v <= 2;
    },
    normalize: toNumber,
  },
];


const PATCHES = [
  (c) => {
    const ac = typeof c.alignCenter === 'boolean';
    if (typeof c.changeBackground !== 'boolean') {
      c.changeBackground = ac ? c.alignCenter : true;
    }
    if (typeof c.scaleImage !== 'boolean') {
      c.scaleImage = ac ? c.alignCenter : true;
    }
    if (!ac) {
      c.alignCenter = true;
    }
    if (typeof c.redirectImage !== 'boolean') {
      c.redirectImage = true;
    }
  },
  (c) => {
    if (typeof c.externalServerSupport !== 'boolean') {
      c.externalServerSupport = false;
    }
  },
  (c) => {
    if (typeof c.logLevel !== 'number') {
      c.logLevel = 1;
    }
  },
  () => {
    GM.deleteValue('external_server_support');
  },
];


function isBoolean (v) {
  return typeof v === 'boolean';
}


function toBoolean (v) {
  return !!v;
}


function toNumber (v) {
  return parseInt(v, 10);
}


function createConfig () {
  const c = {};
  forEach(MANIFEST, (m) => {
    Object.defineProperty(c, m.name, {
      configurable: true,
      enumerable: true,
      get: () => {
        return GM.getValue(m.key, m.default_);
      },
      set: (v) => {
        GM.setValue(m.key, v);

        const nv = GM.getValue(m.key, m.default_);
        if (nv !== v) {
          const s = template('failed to write config, key: {0}, value: {1}, new: {2}');
          throw new AdsBypasserError(s(s.key, nv, v));
        }
      },
    });
  });
  return c;
}


function senityCheck (c) {
  const ok = every(MANIFEST, (m) => {
    return m.verify(c[m.name]);
  });
  if (!ok) {
    c.version = 0;
  }
  return c;
}

function migrate (c) {
  if (typeof c.version !== 'number' || c.version < 0) {
    throw new AdsBypasserError('wrong config version: ' + c.version);
  }
  for (let i = 0; c.version < PATCHES.length; ++i) {
    PATCHES[c.version](c);
    ++c.version;

    if (i >= PATCHES.length) {
      throw new AdsBypasserError('invalid config state', i, c);
    }
  }
  return c;
}


let config = null;


function loadConfig () {
  config = createConfig();
  config = senityCheck(config);
  config = migrate(config);

  register({
    rule: {
      host: /^adsbypasser\.github\.io$/,
      path: /^\/configure\.html$/,
    },
    async ready () {
      uswProxy.commit = (data) => {
        data.version = config.version;
        forEach(data, (v, k) => {
          config[k] = v;
        });
      };

      // TODO: i18n
      uswProxy.render({
        version: config.version,
        options: {
          alignCenter: {
            type: 'checkbox',
            value: config.alignCenter,
            label: 'Align Center',
            help: 'Align image to the center if possible. (default: enabled)',
          },
          changeBackground: {
            type: 'checkbox',
            value: config.changeBackground,
            label: 'Change Background',
            help: 'Use Firefox-like image background if possible. (default: enabled)',
          },
          redirectImage: {
            type: 'checkbox',
            value: config.redirectImage,
            label: 'Redirect Image',
            help: [
              'Directly open image link if possible. (default: enabled)',
              'If disabled, redirection will only works on link shortener sites.',
            ].join('<br/>\n'),
          },
          scaleImage: {
            type: 'checkbox',
            value: config.scaleImage,
            label: 'Scale Image',
            help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
          },
          logLevel: {
            type: 'select',
            value: config.logLevel,
            menu: [
              [0, '0 (quiet)'],
              [1, '1 (default)'],
              [2, '2 (verbose)'],
            ],
            label: 'Log Level',
            help: [
              'Log level in developer console. (default: 1)',
              '0 will not print anything in console.',
              '1 will only print logs on affected sites.',
              '2 will print on any sites.',
            ].join('<br/>\n'),
          },
        },
      });

    },
  });
}


export {
  loadConfig,
  config,
};
