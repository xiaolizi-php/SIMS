<?php

return [
    'autoload' => false,
    'hooks' => [
        'admin_login_init' => [
            'loginbg',
        ],
        'response_send' => [
            'loginbgindex',
            'loginvideo',
        ],
        'index_login_init' => [
            'loginbgindex',
        ],
        'config_init' => [
            'third',
        ],
    ],
    'route' => [
        '/third$' => 'third/index/index',
        '/third/connect/[:platform]' => 'third/index/connect',
        '/third/callback/[:platform]' => 'third/index/callback',
        '/third/bind/[:platform]' => 'third/index/bind',
        '/third/unbind/[:platform]' => 'third/index/unbind',
    ],
    'priority' => [],
];
