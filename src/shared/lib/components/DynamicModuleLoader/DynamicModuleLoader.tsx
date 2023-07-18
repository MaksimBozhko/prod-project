import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
  [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
  children: ReactNode
  reducers: ReducerList
  removeAfterUnmount?: boolean
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const {
    children,
    reducers,
    removeAfterUnmount,
  } = props
  const dispatch = useDispatch()

  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer)
      dispatch({ type: `@INIT ${name} reducer` });
    })

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey)
          dispatch({ type: `@DESTROY ${name} reducer` });
        })
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {children}
    </>
  )
}
