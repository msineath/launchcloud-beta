import classNames from 'classnames';

export const navContainerStyle = classNames('w-full', 'flex', 'justify-evenly');

export const navClickableStyle = (color) => classNames(
  'inline-block',
  'rounded',
  `bg-${color}`,
  'px-6',
  'pb-2',
  'pt-2.5',
  'text-xs',
  'font-medium',
  'uppercase',
  'leading-normal',
  'text-white',
  'transition',
  'duration-150',
  'ease-in-out',
  `hover:bg-${color}-600`,
  `focus:bg-${color}-600`,
  'focus:outline-none',
  'focus:ring-0',
  `active:bg-${color}-700`,
  'my-5'
);
