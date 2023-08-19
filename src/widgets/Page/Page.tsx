import {
  memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollPositionByPath, scrollSaveActions } from '@/features/scrollSave';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  const dispatch = useAppDispatch()
  const { pathname: path } = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, path))

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })

  const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(scrollSaveActions.setScrollPosition({ path, position: e.currentTarget.scrollTop }))
  }, 500)

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  })
  return (
    <main
      ref={wrapperRef}
      onScroll={onScrollHandler}
      className={classNames(cls.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </main>
  )
})
