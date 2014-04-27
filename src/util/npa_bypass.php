<?php
define('DBNAME', '', true);
define('TABLENAME', 'npa_bypass', true);
define('LOGIN', '', true);
define('PASSWORD', '', true);

// Used to validate the URL
define('URL_FORMAT', 
'/^((https?):\/\/)?(?!:)'.                                 // protocol, or no protocol (javascript:, and others things forbidden)
'(([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+'.         // username
'(:([a-z0-9$_\.\+!\*\'\(\),;\?&=-]|%[0-9a-f]{2})+)?'.      // password
'@)?(?#'.                                                  // auth requires @
')((([a-z0-9]\.|[a-z0-9][a-z0-9-]*[a-z0-9]\.)*'.           // domain segments AND
'[a-z][a-z0-9-]*[a-z0-9]'.                                 // top level domain  OR
'|((\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\.){3}'.
'(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])'.                 // IP address
')(:\d+)?'.                                                // port
')(((\/+([a-z0-9$_\.\+!\*\'\(\),;:@&=-~]|%[0-9a-f]{2})*)*'.// path
'(\?([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)'.      // query string
'?)?)?'.                                                   // path and query string optional
'(#([a-z0-9$_\.\+!\*\'\(\),;:@&=-]|%[0-9a-f]{2})*)?'.      // fragment
'$/i');

switch ($_REQUEST['action']) {
	case 'bypass':
		try {
			if (empty($_REQUEST['host'])) {
				throw new Exception("Missing host parameter");
			}

			// Remove www. from host
			if (substr($_REQUEST['host'], 0, 4) === 'www.') {
				$host = substr($_REQUEST['host'], 4);
			} else {
				$host = $_REQUEST['host'];
			}
			
			// Remove / from beginning of identifier
			if (substr($_REQUEST['identifier'], 0, 1) === '/') {
				$identifier = substr($_REQUEST['identifier'], 1);
			} else {
				$identifier = $_REQUEST['identifier'];
			}
			
			// Remove / from end of identifier
			if (substr($identifier, -1, 1) === '/') {
				$identifier = substr($identifier, 0, -1);
			} else {
				$identifier = $identifier;
			}
			
			$bypassDB = new PDO('mysql:host=localhost;dbname=' . DBNAME, LOGIN, PASSWORD);

			$preparedReq = $bypassDB->prepare('SELECT `direct` FROM `' . TABLENAME . '` WHERE host = :host AND identifier = :identifier LIMIT 1');
			$preparedReq->execute(array('host' => $host, 'identifier' => $identifier));

			$result = $preparedReq->fetch();
			if (empty($result) || empty($result['direct'])) {
			 throw new Exception("Couldn't find the direct link");
			}

			$answer = array("direct" => $result['direct'], "error" => 0);
			echo json_encode($answer);
		} catch (Exception $e) {
			$error = array("error" => "Error " . $e->getCode() . ": " . $e->getMessage());
			echo json_encode($error);
		}
		exit();
		break;

	case 'add':
		try {
			if (empty($_REQUEST['host'])) {
				throw new Exception("Missing host parameter");
			}

			// Remove www. from host
			if (substr($_REQUEST['host'], 0, 4) === 'www.') {
				$host = substr($_REQUEST['host'], 4);
			} else {
				$host = $_REQUEST['host'];
			}

			// Remove / from beginning of identifier
			if (substr($_REQUEST['identifier'], 0, 1) === '/') {
				$identifier = substr($_REQUEST['identifier'], 1);
			} else {
				$identifier = $_REQUEST['identifier'];
			}

			// Remove / from end of identifier
			if (substr($identifier, -1, 1) === '/') {
				$identifier = substr($identifier, 0, -1);
			} else {
				$identifier = $identifier;
			}

			if (empty($_REQUEST['direct'])) {
				throw new Exception("Missing direct parameter");
			}

			if (!preg_match(URL_FORMAT, $_REQUEST['direct'])) {
				throw new Exception("Error invalid direct URL");
			}

			$direct = $_REQUEST['direct'];			

			// TODO: use UPDATE if exists, INSERT if it doesn't exist because two instances can possibly do the INSERT of the same link at the same time (duplicated entry)
			$bypassDB = new PDO('mysql:host=localhost;dbname=' . DBNAME, LOGIN, PASSWORD);
			$preparedReq = $bypassDB->prepare('DELETE FROM `' . TABLENAME . '` WHERE host = :host AND identifier = :identifier');
			$preparedReq->execute(array('host' => $host, 'identifier' => $identifier));

			$preparedReq = $bypassDB->prepare('INSERT INTO `' . TABLENAME . '` (host, identifier, direct) VALUES(:host, :identifier, :direct)');
			$preparedReq->execute(array('host' => $host, 'identifier' => $identifier, 'direct' => $direct));

			$answer = array("error" => 0);
			echo json_encode($answer);
		} catch (Exception $e) {
			$error = array("error" => "Error " . $e->getCode() . ": " . $e->getMessage());
			echo json_encode($error);
		}
		exit();
		break;

	default:
		$error = array("error" => "Error: " . $_REQUEST['action'] . " is an invalid action parameter");
		echo json_encode($error);		
		exit();
		break;
}
?>