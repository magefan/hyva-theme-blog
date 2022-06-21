<?php
/**
 * Copyright © Magefan (support@magefan.com). All rights reserved.
 * Please visit Magefan.com for license details (https://magefan.com/end-user-license-agreement).
 */

declare(strict_types=1);

namespace Hyva\MagefanBlog\Plugin\Frontend\Hyva\Theme\Service;

class Navigation
{
    /**
     * @var \Magefan\Blog\Helper\Menu
     */
    private $menuHelper;

    /**
     * @param \Magefan\Blog\Helper\Menu $menuHelper
     */
    public function __construct(
        \Magefan\Blog\Helper\Menu $menuHelper
    ) {
        $this->menuHelper = $menuHelper;
    }

    /**
     * @param \Hyva\Theme\Service\Navigation $subject
     * @param $result
     * @return mixed
     */
    public function afterGetMenuTree(
        \Hyva\Theme\Service\Navigation $subject,
        $result,
        $maxLevel
    ) {
        $menu = $result;
        $blogNode = $this->menuHelper->getBlogNode($menu, $menu->getTree());
        if ($blogNode) {
            $menu->addChild($blogNode);
        }

        return $menu;
    }
}

