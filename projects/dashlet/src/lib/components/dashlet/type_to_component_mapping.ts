import { ChartType } from '../../types';

const TYPE_TO_COMPONENT_MAPPING = {
  [ChartType.LINE]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.BAR]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.PIE]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.AREA]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.BUBBLE]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.DOUGHNUT]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.POLAR]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.SCATTER]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.DOUGHNUT]: () => import('../chart-js/chart-js.component').then(module => module.ChartJsComponent),
  [ChartType.BIG_NUMBER]: () => import('../big-number/big-number.component').then(module => module.BigNumberComponent)
};

export default TYPE_TO_COMPONENT_MAPPING;
