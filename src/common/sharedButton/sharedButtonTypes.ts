import React from 'react';

export type SharedButtonProps = {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    active?: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
};