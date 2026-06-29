<?php

use Kirby\Query\Runners\DefaultRunner;

return [

    'debug' => env('KIRBY_DEBUG', false),

    'yaml' => [
        'handler' => 'symfony'
    ],

    'query' => [
        'runner' => DefaultRunner::class
    ],

    'date' => [
        'handler' => 'intl'
    ],

    'locale' => 'de_DE.utf-8',

    'panel' => [
        'install' => env('KIRBY_PANEL_INSTALL', false),
        'slug' => env('KIRBY_PANEL_SLUG', 'panel'),
        'language' => 'de',
        'vue' => [
            'compiler' => false
        ]
    ],

    'cache' => [
        'pages' => [
            'active' => env('KIRBY_CACHE', false),
            'ignore' => fn(\Kirby\Cms\Page $page) => $page->kirby()->user() !== null
        ]
    ],

    'thumbs' => [
        'format' => 'webp',
        'quality' => 85,
        'srcsets' => [
            'default' => [
                390, // iPhone 12/13/14
                430, // iPhone 15 Pro Max
                780, // iPhone 12/13/14 @2x
                860, // iPhone 15 Pro Max @2x
                1170, // iPhone 12/13/14 @3x
                1366, // Common laptop resolution
                1440, // MacBook, many modern laptops
                1920, // Full HD
                2580, // iPhone 15 Pro Max @3x
                2880, // MacBook @2x
            ]
        ]
    ],

    'johannschopplich.helpers' => [
        'meta' => [
            'defaults' => require __DIR__ . '/meta.php'
        ],
        'robots' => [
            'enabled' => true
        ],
        'sitemap' => [
            'enabled' => true
        ]
    ]

];
