import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { ISidebarItem } from '../../model/items';
import { useSelector } from "react-redux";
import { getUserAuthData } from "_entities/User";

interface ISidebarItemProps {
    item: ISidebarItem;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: ISidebarItemProps) => {
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            theme={ AppLinkTheme.SECONDARY }
            to={ item.path }
            className={ classNames(cls.item, { [cls.collapsed]: collapsed }) }
            title={ t(item.text) }
        >
            <item.Icon className={ cls.icon }/>
            <span className={ cls.link }>
                {t(item.text)}
            </span>
        </AppLink>
    );
});