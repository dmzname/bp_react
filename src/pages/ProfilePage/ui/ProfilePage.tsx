import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { fetchProfileData, ProfileCard, profileReducer } from '_entities/Profile';
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { memo, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [ dispatch ]);

    return (
        <DynamicModuleLoader reducers={ reducers } removeAfterUnmount>
            <div className={ classNames('', {}, [ className ]) }>
                <ProfileCard/>
            </div>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
