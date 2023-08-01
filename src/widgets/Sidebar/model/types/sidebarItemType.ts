import React from 'react';

export interface SidebarItemType {
  path: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  text: string
  authOnly?: boolean;
}
