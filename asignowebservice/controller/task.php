<?php
require_once("../config/config.php");
require_once("../models/Tasks.php");
$tasks = new Tasks();

$body = json_decode(file_get_contents("php://input"), true);

switch ($_GET["option"]) {

    case "login":
        $datos = $tasks->login($body['email'], $body['pass']);
        echo json_encode($datos);
        break;

    case "getAll":
        $datos = $tasks->getAll();
        echo json_encode($datos);
        break;

    case "getAllowed":
        $datos = $tasks->getAllowed($body['id']);
        echo json_encode($datos);
        break;

    case "getUsers":
        $datos = $tasks->getUsers($body['id']);
        echo json_encode($datos);
        break;

    case "getAllUsers":
        $datos = $tasks->getAllUsers();
        echo json_encode($datos);
        break;

    case "getOne":
        $datos = $tasks->getOne($body["id"]);
        echo json_encode($datos);
        break;

    case "insert":
        $datos = $tasks->insert($body["title"], $body["start"], $body["end"], $body["asignment"], $body["notes"]);
        echo json_encode($datos);
        break;

    case "update":
        $datos = $tasks->update($body["title"], $body["start"], $body["end"], $body["status"], $body["asignment"], $body["notes"], $body['id']);
        echo json_encode($datos);
        break;

    case "delete":
        $datos = $tasks->delete($body["id"]);
        echo json_encode($datos);
        break;

    case "searchDate":
        $datos = $tasks->searchDate($body["start"], $body["end"]);
        echo json_encode($datos);
        break;

    case "insertUser":
        $datos = $tasks->insertUser($body['name'], $body['email'], $body['pass'], $body['color'], $body['admin']);
        echo json_encode($datos);
        break;

    case "deleteUser":
        $datos = $tasks->deleteUser($body['id']);
        echo json_encode($datos);
        break;

    case "editUser":
        $datos = $tasks->editUser($body['name'], $body['email'], $body['pass'], $body['color'], $body['admin'], $body['id']);
        echo json_encode($datos);
        break;
}
