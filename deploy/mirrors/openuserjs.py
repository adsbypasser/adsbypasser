import mechanize
import requests
import urllib

from summary import make_summary


def exec_(config, edition, another_edition, script):
    USERNAME = config['USERNAME']
    SCRIPTNAME = config[edition]['SCRIPTNAME']
    GITHUB_USERNAME = config['GITHUB_USERNAME']
    GITHUB_PASSWORD = config['GITHUB_PASSWORD']

    HOME_URL = 'https://openuserjs.org'
    LOGIN_URL = '{0}/register'.format(HOME_URL)
    SCRIPT_URL = '{0}/user/add/scripts/new'.format(HOME_URL)
    ABOUT_URL = '{0}/script/{1}/edit'.format(HOME_URL, SCRIPTNAME)
    URL_PARAM = '/scripts/{0}/{1}/source'.format(USERNAME, SCRIPTNAME)

    summary = make_summary()
    another_edition = config[another_edition]
    another_edition = 'https://openuserjs.org/scripts/{0}/{1}'.format(USERNAME, another_edition['SCRIPTNAME'])
    summary = summary.getResult(edition, another_edition)

    b = mechanize.Browser()
    b.set_handle_robots(False)

    # home page
    b.open(LOGIN_URL)
    b.select_form(nr=0)
    b['username'] = USERNAME
    b.submit()

    # github login
    b.select_form(nr=1)
    b['login'] = GITHUB_USERNAME
    b['password'] = GITHUB_PASSWORD
    b.submit()

    # edit source
    # can not simply use mechanize because the form is generate by javascript
    jar = b._ua_handlers['_cookies'].cookiejar
    cookies = {c.name: c.value for c in jar}
    cookies = {
        'connect.sid': urllib.unquote(cookies['connect.sid']),
    }
    # somehow the SSL verification will fail
    r = requests.post(SCRIPT_URL, cookies=cookies, verify=False, data={
        'source': script.encode('utf-8'),
        'url': URL_PARAM,
    })

    # edit metadata
    b.open(ABOUT_URL)
    b.select_form(nr=0)
    b.find_control('groups').readonly = False
    b['about'] = summary.encode('utf-8')
    b['groups'] = 'ads'
    b.submit()


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
