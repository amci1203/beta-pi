<?php

$config = array(
    'displayErrorDetails'    => true,
    'addContentLengthHeader' => false,
    
    'db' => array(
        'dbname' => 'betapi',
        'host'   => 'localhost',
        'user'   => 'user',
        'pass'   => 'password'
    )
)

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app       = new \Slim\App(["settings" => $config]);
$container = $app -> getContainer();

$container['logger'] = function($c) {
    $logger  = new \Monolog\Logger('my_logger');
    $handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    
    $logger -> pushHandler($handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db  = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pass']);
    
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    return $pdo;
};

$app -> get('/hello/{name}', function (Request $req, Response $res) {
    $name = $req -> getAttribute('name');
    $res -> getBody() -> write("Hello, $name");

    return $res;
});
$app -> run();

?>