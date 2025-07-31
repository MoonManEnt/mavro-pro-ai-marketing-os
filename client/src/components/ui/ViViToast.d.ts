export interface ViViToastProps {
  toast: {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info' | 'trend';
    duration?: number;
    actionText?: string;
    onAction?: () => void;
  };
  onClose?: (id: string) => void;
  onAction?: (toast: any) => void;
}

export declare const ViViToast: React.FC<ViViToastProps>;

export interface UseViViToastReturn {
  toasts: Array<ViViToastProps['toast']>;
  showToast: (toast: Omit<ViViToastProps['toast'], 'id'>) => void;
  hideToast: (id: string) => void;
  handleToastAction: (toast: ViViToastProps['toast']) => void;
}

export declare const useViViToast: () => UseViViToastReturn;

export interface ToastManagerProps {
  toasts: Array<ViViToastProps['toast']>;
  onToastClose: (id: string) => void;
  onToastAction: (toast: ViViToastProps['toast']) => void;
}

export declare const ToastManager: React.FC<ToastManagerProps>;