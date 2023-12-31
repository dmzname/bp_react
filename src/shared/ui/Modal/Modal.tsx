import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import React, { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { Portal } from "shared/ui/Portal/Portal";

const ANIMATION_DELAY = 300;

interface ModalProps {
    children?: ReactNode
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const [ isClosing, setIsClosing ] = useState(false);
    const [ isMounted, setIsMounted ] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy
    } = props;

    const mods: Record<string, boolean> = {
        [cls['is-open']]: isOpen,
        [cls['is-close']]: isClosing
    };

    const onCloseHandler = useCallback(() => {
        setIsClosing(true);
        if (onClose) {
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [ onClose ]); 

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCloseHandler();
        }
    }, [ onCloseHandler ]);

    useEffect(() => {
        if(isOpen) {
            setIsMounted(true);
        }
    }, [ isOpen ]);

    useEffect(() => {
        if(isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            clearTimeout(timerRef.current);
        };
    }, [ isOpen, onKeyDown ]);

    if(lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div onClick={ onCloseHandler } className={ classNames(cls.root, mods, [ className, cls.overlay, 'modal' ]) }>
                <div className={ cls.content } onClick={ (e: React.MouseEvent) => e.stopPropagation() }>
                    {children}
                </div>
            </div>
        </Portal>
    );
};