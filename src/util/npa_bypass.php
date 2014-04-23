<?php
define('DBNAME', '', true);
define('TABLENAME', 'npa_bypass', true);
define('LOGIN', '', true);
define('PASSWORD', '', true);

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