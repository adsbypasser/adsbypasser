import {
  AdsBypasserError,
  every,
} from 'util/core';
import {
  register,
} from 'util/dispatcher';
import {
  usw,
  GMAPI,
} from 'util/platform';


const MANIFEST = [
  {
    key: 'version',
    default_: 0,
    verify (v) {
      return typeof v === 'number' && v >= 0;
    },
    normalize: toNumber,
  },
  {
    key: 'align_center',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    key: 'change_background',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    key: 'redirect_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    key: 'scale_image',
    default_: true,
    verify: isBoolean,
    normalize: toBoolean,
  },
  {
    key: 'log_level',
    default_: 1,
    verify (v) {
      return typeof v === 'number' && v >= 0 && v <= 2;
    },
    normalize: toNumber,
  },
];


const PATCHES = [
  async () => {
    const alignCenter = await GMAPI.getValue('align_center');
    const changeBackground = await GMAPI.getValue('change_background');
    const scaleImage = await GMAPI.getValue('scale_image');
    const redirectImage = await GMAPI.getValue('redirect_image');

    const ac = typeof alignCenter === 'boolean';
    if (typeof changeBackground !== 'boolean') {
      await GMAPI.setValue('change_background', ac ? alignCenter : true);
    }
    if (typeof scaleImage !== 'boolean') {
      await GMAPI.setValue('scale_image', ac ? alignCenter : true);
    }
    if (!ac) {
      await GMAPI.setValue('align_center', true);
    }
    if (typeof redirectImage !== 'boolean') {
      await GMAPI.setValue('redirect_image', true);
    }
  },
  async () => {
    const externalServerSupport = await GMAPI.getValue('external_server_support');
    if (typeof externalServerSupport !== 'boolean') {
      await GMAPI.setValue('external_server_support', false);
    }
  },
  async () => {
    const logLevel = await GMAPI.getValue('log_level');
    if (typeof logLevel !== 'number') {
      await GMAPI.setValue('log_level', 1);
    }
  },
  async () => {
    await GMAPI.deleteValue('external_server_support');
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


async function senityCheck () {
  let verifyResults = MANIFEST.map(async (descriptor) => {
    const rv = await GMAPI.getValue(descriptor.key);
    return descriptor.verify(rv);
  });
  verifyResults = await Promise.all(verifyResults);
  const ok = every(verifyResults, v => v);
  if (!ok) {
    await GMAPI.setValue('version', 0);
  }
}


async function migrate () {
  let currentVersion = await GMAPI.getValue('version');
  if (currentVersion !== 0 && !currentVersion) {
    // null, undefined or NaN
    throw new AdsBypasserError('invalid version');
  }
  while (currentVersion < PATCHES.length) {
    PATCHES[currentVersion]();
    ++currentVersion;
  }
  await GMAPI.setValue('version', currentVersion);
}


async function loadConfig () {
  await senityCheck();
  await migrate();

  register({
    rule: {
      host: /^adsbypasser\.github\.io$/,
      path: /^\/configure\.html$/,
    },
    async ready () {
      // HACK: wait until the page finished
      await waitForPage();

      usw.commit = async (data) => {
        for (const [k, v] of Object.entries(data)) {
          await GMAPI.setValue(k, v);
        }
      };

      // TODO: i18n
      usw.render({
        version: await GMAPI.getValue('version'),
        options: {
          align_center: {
            type: 'checkbox',
            value: await GMAPI.getValue('align_center'),
            label: 'Align Center',
            help: 'Align image to the center if possible. (default: enabled)',
          },
          change_background: {
            type: 'checkbox',
            value: await GMAPI.getValue('change_background'),
            label: 'Change Background',
            help: 'Use Firefox-like image background if possible. (default: enabled)',
          },
          redirect_image: {
            type: 'checkbox',
            value: await GMAPI.getValue('redirect_image'),
            label: 'Redirect Image',
            help: [
              'Directly open image link if possible. (default: enabled)',
              'If disabled, redirection will only works on link shortener sites.',
            ].join('<br/>\n'),
          },
          scale_image: {
            type: 'checkbox',
            value: await GMAPI.getValue('scale_image'),
            label: 'Scale Image',
            help: 'When image loaded, scale it to fit window if possible. (default: enabled)',
          },
          log_level: {
            type: 'select',
            value: await GMAPI.getValue('log_level'),
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


function waitForPage () {
  return new Promise((resolve) => {
    const i = setInterval(() => {
      if (usw.render) {
        clearInterval(i);
        resolve();
      }
    }, 50);
  });
}


async function dumpConfig () {
  let rv = MANIFEST.map(async (descriptor) => {
    return [descriptor.key, await GMAPI.getValue(descriptor.key)];
  });
  rv = await Promise.all(rv);
  const o = {};
  for (const [k, v] of rv) {
    o[k] = v;
  }
  return o;
}


export {
  dumpConfig,
  loadConfig,
};
