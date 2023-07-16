import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={ classNames(cls.root, {}, [ className ]) }>
            <LangSwitcher className={ cls['lang-switcher'] }/>
            <ThemeSwitcher className={ cls['theme-switcher'] } />
        </div>
    );
};
