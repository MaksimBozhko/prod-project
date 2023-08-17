import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import ListIcon from 'shared/assets/icons/list.svg'
import TiledIcon from 'shared/assets/icons/tiled.svg'
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from 'entities/Article/model/consts/articleConsts';
import cls from './ArticleViewSelector.module.scss'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick: (viewType: ArticleView) => void
}

const viewsTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const {
    className,
    view,
    onViewClick,
  } = props
  const { t } = useTranslation()

  const onClick = (newView: ArticleView) => () => {
    onViewClick(newView)
  }

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewsTypes.map((viewType) => (
        <Button
          key={viewType.view}
          theme={ThemeButton.CLEAR}
          onClick={onClick(viewType.view)}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', { [cls.selected]: viewType.view === view }, [])}
          />
        </Button>
      ))}
    </div>
  )
})
