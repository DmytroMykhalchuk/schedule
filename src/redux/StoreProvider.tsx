'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

type StoreProviderType = {
    children: React.ReactNode
};

export const StoreProvider: React.FC<StoreProviderType> = ({ children }) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
