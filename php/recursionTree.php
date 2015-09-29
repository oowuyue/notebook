<?php

/*
https://en.wikipedia.org/wiki/Nested_set_model
https://ruby-china.org/topics/2533
http://docs.mongodb.org/manual/tutorial/model-tree-structures/

https://app.yinxiang.com/shard/s21/res/19546815-d42c-4976-84b4-930c904c3af2/QQ%E6%88%AA%E5%9B%BE20150929103654.png?resizeSmall&width=1600
*/

$comments = [
    '0' => [
        'content' => '0 content',
        'chlids' => [
            '0-1' => ['content' => "0-1 content", 'chlids' => ''],
            '0-2' => [
                'content' => "0-2 content",
                'chlids' => [
                    '0-2-1' => ['content' => "0-2-1 content", 'chlids' => ''],
                    '0-2-2' => ['content' => "0-2-2 content", 'chlids' => ''],
                ],
            ]
        ]
    ],
    '1' => [
        'content' => '1 content',
        'chlids' => [
            '1-1' => ['content' => "1-1 content", 'chlids' => ''],
            '1-2' => [
                'content' => "1-2 content",
                'chlids' => [
                    '1-2-1' => [
                        'content' => "0-2-1 content",
                        'chlids' => [
                            '1-2-1-1' => ['content' => "1-2-1-1 content", 'chlids' => ''],
                            '1-2-1-2' => ['content' => "1-2-1-2 content", 'chlids' => ''],
                        ],
                    ],
                ],
            ]
        ]
    ]
];

function recursionTree($arr)
{
    foreach ($arr as $key => $value) {
        if (array_key_exists('chlids', $value) && !empty($value['chlids'])) {
            echo "<span> {$value['content']} </span>";
            echo "<ul>";
            recursionTree($value['chlids']); //递归调用
            echo "</ul>";
        }
        else {
            echo "<li> {$value['content']} </li>";
            return;
        }
    }
    return;
}

recursionTree($comments);

exit('');
