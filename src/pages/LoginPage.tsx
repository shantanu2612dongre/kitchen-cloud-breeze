
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "../hooks/use-toast";
import { authService } from '../services/api';
import { AtSign, Lock } from 'lucide-react';

interface LocationState {
  from?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = (location.state as LocationState)?.from || '/';

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Admin login shortcut for demo
      if (email === 'admin@example.com' && password === 'admin123') {
        await authService.login(email, 'Admin');
        toast({
          title: "Welcome, Admin",
          description: "You have successfully logged in as admin."
        });
        navigate('/admin');
        return;
      }
      
      await authService.login(email, password);
      
      toast({
        title: "Login successful",
        description: "Welcome back to CloudKitchen!"
      });
      
      navigate(from);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/" className="text-culinary-600 font-bold text-3xl">CloudKitchen</Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-culinary-600 hover:text-culinary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-culinary-500 focus:border-culinary-500`}
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-culinary-500 focus:border-culinary-500`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-culinary-600 hover:text-culinary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Demo credentials:</p>
            <p>Email: user@example.com | Password: password123</p>
            <p>Admin: admin@example.com | Password: admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
