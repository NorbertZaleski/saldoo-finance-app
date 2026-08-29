import { cn } from '../../../utils/cn';

const sizeClasses = {
  small: {
    wrapper: 'w-[300px]',
    header: 'text-sm px-4 py-2',
    body: 'text-sm p-4',
    footer: 'text-xs px-4 py-2'
  },
  medium: {
    wrapper: 'w-[500px]',
    header: 'text-base px-5 py-3',
    body: 'text-base p-5',
    footer: 'text-sm px-5 py-3'
  },
  large: {
    wrapper: 'w-[700px]',
    header: 'text-lg px-6 py-4',
    body: 'text-lg p-6',
    footer: 'text-base px-6 py-4'
  }
};

const Widget = ({ 
  children,
  size = 'medium',
  className = '',
  variant = 'default',
  ...props 
}) => {
  const sizeStyle = sizeClasses[size] || sizeClasses.medium;
  
  const variantClasses = {
    default: 'bg-white/10 backdrop-blur-sm border-white/20',
    glass: 'bg-white/5 backdrop-blur-md border-white/10',
    solid: 'bg-gray-800 border-gray-700',
    outline: 'bg-transparent border-white/30'
  };

  return (
    <div 
      className={cn(
        'rounded-xl border shadow-lg/25 flex-shrink-0',
        sizeStyle.wrapper,
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const WidgetHeader = ({ children, className = '', size = 'medium' }) => {
  const sizeStyle = sizeClasses[size] || sizeClasses.medium;
  return (
    <div className={cn(
      'border-b border-white/10',
      sizeStyle.header,
      className
    )}>
      {children}
    </div>
  );
};

const WidgetBody = ({ children, className = '', size = 'medium' }) => {
  const sizeStyle = sizeClasses[size] || sizeClasses.medium;
  return (
    <div className={cn(
      'flex-1',
      sizeStyle.body,
      className
    )}>
      {children}
    </div>
  );
};

const WidgetFooter = ({ children, className = '', size = 'medium' }) => {
  const sizeStyle = sizeClasses[size] || sizeClasses.medium;
  return (
    <div className={cn(
      'border-t border-white/10',
      sizeStyle.footer,
      className
    )}>
      {children}
    </div>
  );
};

Widget.Header = WidgetHeader;
Widget.Body = WidgetBody;
Widget.Footer = WidgetFooter;

export default Widget;