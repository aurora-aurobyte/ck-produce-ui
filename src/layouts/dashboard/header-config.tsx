import { useEffect } from 'react';
import { setBackUrl, setTitle } from 'src/store/features/configSlice';
import { useAppDispatch } from 'src/store/hooks';

type HeaderConfigProps = {
    backUrl?: string;
    title?: string;
};

export default function HeaderConfig({ backUrl, title }: HeaderConfigProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (backUrl) {
            dispatch(setBackUrl(backUrl));
        }
    }, [dispatch, backUrl]);

    useEffect(() => {
        if (title) {
            dispatch(setTitle(title));
        }
    }, [dispatch, title]);
    return null;
}
