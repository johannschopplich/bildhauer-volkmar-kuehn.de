<?php

use Kirby\Cms\App;
use Kirby\Cms\Page;
use Kirby\Cms\Site;

return function (App $kirby, Site $site, Page $page): array {
    $personId = $site->url() . '#person';

    $website = [
        'name' => $site->title()->value(),
        'url' => $site->url(),
        'author' => ['@id' => $personId]
    ];

    if ($site->description()->isNotEmpty()) {
        $website['description'] = $site->description()->value();
    }

    $jsonld = [
        'Person' => [
            '@id' => $personId,
            'name' => 'Volkmar Kühn',
            'jobTitle' => 'Bildhauer',
            'birthDate' => '1942-07-27',
            'url' => $site->url(),
            'sameAs' => [
                'https://de.wikipedia.org/wiki/Volkmar_K%C3%BChn',
                'https://en.wikipedia.org/wiki/Volkmar_K%C3%BChn',
                'https://www.wikidata.org/wiki/Q19689721',
                'https://d-nb.info/gnd/119495430'
            ]
        ],
        'WebSite' => $website
    ];

    $ancestors = $page->parents()->flip();
    if ($ancestors->count() > 0) {
        $items = [[
            '@type' => 'ListItem',
            'position' => 1,
            'name' => $site->title()->value(),
            'item' => $site->url()
        ]];

        foreach ($ancestors as $ancestor) {
            $items[] = [
                '@type' => 'ListItem',
                'position' => count($items) + 1,
                'name' => $ancestor->title()->value(),
                'item' => $ancestor->url()
            ];
        }

        $items[] = [
            '@type' => 'ListItem',
            'position' => count($items) + 1,
            'name' => $page->title()->value(),
            'item' => $page->url()
        ];

        $jsonld['BreadcrumbList'] = ['itemListElement' => $items];
    }

    return ['jsonld' => $jsonld];
};
