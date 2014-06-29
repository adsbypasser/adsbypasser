from mechanize import Browser


def exec_(config, summary, script):
    USERNAME = config['USERNAME']
    PASSWORD = config['PASSWORD']
    SCRIPT_ID = config['SCRIPT_ID']

    LOGIN_URL = 'https://greasyfork.org/users/sign_in'
    EDIT_URL = 'https://greasyfork.org/scripts/{0}/versions/new'.format(SCRIPT_ID)

    b = Browser()

    # login
    b.open(LOGIN_URL)
    b.select_form(nr=2)
    b['user[email]'] = USERNAME
    b['user[password]'] = PASSWORD
    b.submit()

    # edit source
    b.open(EDIT_URL)
    b.select_form(nr=2)
    b['script_version[additional_info]'] = summary.encode('utf-8')
    b['script_version[code]'] = script.encode('utf-8')
    b.submit(name='commit')


# ex: ts=4 sts=4 sw=4 et
# sublime: tab_size 4; translate_tabs_to_spaces true; detect_indentation false; use_tab_stops true;
# kate: space-indent on; indent-width 4;
