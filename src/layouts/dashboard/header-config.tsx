import { useEffect } from 'react';
import { clearConfig, setBackUrl, setTitle } from 'src/store/features/configSlice';
import { useAppDispatch } from 'src/store/hooks';

type HeaderConfigProps = {
    backUrl?: string;
    title?: string;
};

export default function HeaderConfig({ backUrl, title }: HeaderConfigProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setBackUrl(backUrl || ''));
        return () => {
            dispatch(clearConfig());
        };
    }, [dispatch, backUrl]);

    useEffect(() => {
        dispatch(setTitle(title || ''));
        return () => {
            dispatch(clearConfig());
        };
    }, [dispatch, title]);
    return null;
}
