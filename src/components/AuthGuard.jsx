// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Shield, AlertCircle } from 'lucide-react';

export const AuthGuard = props => {
  const {
    children,
    requiredPermissions = [],
    fallback = null,
    $w
  } = props;

  // 获取当前用户信息
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  const currentUser = getCurrentUser();

  // 检查用户是否已登录
  if (!currentUser) {
    if (fallback) {
      return fallback;
    }

    // 默认的未登录提示
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-8">
          <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">需要登录</h2>
          <p className="text-gray-300 mb-8">
            请先登录以访问此功能
          </p>
          <button onClick={() => $w.utils.navigateTo({
          pageId: 'login',
          params: {}
        })} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-lg">
            立即登录
          </button>
        </div>
      </div>;
  }

  // 检查用户权限
  if (requiredPermissions.length > 0) {
    const userPermissions = currentUser.permissions || [];
    const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));
    if (!hasPermission) {
      if (fallback) {
        return fallback;
      }

      // 默认的权限不足提示
      return <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">权限不足</h2>
            <p className="text-gray-300 mb-8">
              您没有权限访问此功能，请联系管理员
            </p>
            <button onClick={() => $w.utils.navigateTo({
            pageId: 'home',
            params: {}
          })} className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg">
              返回首页
            </button>
          </div>
        </div>;
    }
  }

  // 用户已登录且有权限，渲染子组件
  return typeof children === 'function' ? children(currentUser) : children;
};

// 权限检查Hook
export const useAuth = () => {
  const getCurrentUser = () => {
    const storedUser = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  };
  const hasPermission = permission => {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    const userPermissions = currentUser.permissions || [];
    return userPermissions.includes(permission);
  };
  const hasAnyPermission = permissions => {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    const userPermissions = currentUser.permissions || [];
    return permissions.some(p => userPermissions.includes(p));
  };
  const hasAllPermissions = permissions => {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    const userPermissions = currentUser.permissions || [];
    return permissions.every(p => userPermissions.includes(p));
  };
  const isAdmin = () => {
    const currentUser = getCurrentUser();
    return currentUser?.type === 'admin';
  };
  const isPartner = () => {
    const currentUser = getCurrentUser();
    return currentUser?.type === 'partner';
  };
  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
    window.location.href = '/login';
  };
  return {
    user: getCurrentUser(),
    isAuthenticated: !!getCurrentUser(),
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    isPartner,
    logout
  };
};

// 高阶组件：包装需要权限的页面
export const withAuth = (requiredPermissions = []) => {
  return WrappedComponent => {
    return props => <AuthGuard requiredPermissions={requiredPermissions} $w={props.$w}>
        <WrappedComponent {...props} />
      </AuthGuard>;
  };
};