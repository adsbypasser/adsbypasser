import mechanize


def exec_(config, summary, script):
    USERNAME = config['USERNAME']
    NAMESPACE = config['NAMESPACE']
    SCRIPTNAME = config['SCRIPTNAME']
    GITHUB_USERNAME = config['GITHUB_USERNAME']
    GITHUB_PASSWORD = config['GITHUB_USERNAME']

    HOME_URL = 'https://openuserjs.org'
    LOGIN_URL = '{0}/register'.format(HOME_URL)
    SCRIPT_URL = '{0}/scripts/{1}/{2}/{3}/source'.format(HOME_URL, USERNAME, NAMESPACE, SCRIPTNAME)
    ABOUT_URL = '{0}/script/{1}/{2}/edit'.format(HOME_URL, NAMESPACE, SCRIPTNAME)

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
    b.open(SCRIPT_URL)
    b.select_form(nr=0)
    b.find_control('source').readonly = False
    b['source'] = script.encode('utf-8')
    b.submit()

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
